import json
import os
import shutil
import sys
import re
import zipfile
import tarfile
import uuid
import fnmatch
import requests
import requests.auth

CONF_PATH = 'powur.json'
GITHUB_USERNAME = os.getenv('GITHUB_USERNAME', None)
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', None)
ZIP_FILE = 'zip'
TAR_FILE = 'tar'

github_auth = None
if GITHUB_USERNAME and GITHUB_TOKEN:
    github_auth = requests.auth.HTTPBasicAuth(GITHUB_USERNAME, GITHUB_TOKEN)

vendor_path = 'vendor'
temp_path = 'vendor/powur_temp'
powur_conf = None
version_re = re.compile('^(\d+\.)?(\d+\.)?(\*|\d+)$')

class Package(object):
    def __init__(self, conf):
        self.name = conf['name']
        self.version = None
        self.version_want = conf['version']
        self.version_url = self.parse_str(conf['version_url'])
        self.include = {}
        self.temp_dir = os.path.join(temp_path, uuid.uuid4().hex)
        self.expand_path = os.path.join(self.temp_dir, 'expand')
        os.makedirs(self.temp_dir)

        self.version = self.find_version()
        if not self.version:
            raise ValueError('Failed to find matching ' +
                             'version for "%s"' % conf['name'])

        self.url = self.parse_str(conf['url'])

        for in_path, out_path in conf['include'].items():
            in_path = self.parse_str(in_path)
            out_path = self.parse_str(out_path)
            self.include[in_path] = out_path

    def get_versions(self):
        url = self.version_url
        versions = []

        if url.startswith('github://github.com/'):
            url = url.replace('github://github.com/',
                'https://api.github.com/repos/')

            resp = requests.get(url, auth=github_auth)
            if resp.status_code < 200 or resp.status_code > 299:
                raise IOError(resp.content)

            if url.endswith('/tags'):
                for tag in resp.json():
                    versions.append(tag['name'])
            elif url.endswith('/releases'):
                for tag in resp.json():
                    versions.append(tag['tag_name'])
            else:
                raise ValueError('Unknown github url "%s"' % self.version_url)
        else:
            raise ValueError('Unknown version url "%s"' % self.version_url)

        versions = [x.lstrip('v') for x in versions]
        versions = [x for x in versions if version_re.match(x)]
        versions.sort(key=lambda x: map(int, x.split('.')))
        versions.reverse()

        return versions

    def find_version(self):
        versions = self.get_versions()

        want_strip = self.version_want.lstrip('~').lstrip('^').lstrip(
            '>=').lstrip('>').lstrip('<=').lstrip('<')
        want_split = want_strip.split('.')

        if self.version_want.startswith('~'):
            for version in versions:
                split = version.split('.')
                if want_split[0] == split[0] and want_split[1] == split[1]:
                    return version
        elif self.version_want.startswith('^'):
            for version in versions:
                split = version.split('.')
                if want_split[0] == split[0]:
                    return version
        elif self.version_want.startswith('>'):
            equal = self.version_want.startswith('>=')

            for version in versions:
                if equal and version == want_strip:
                    return version

                split = version.split('.')
                x = split[0] > want_split[0]
                xx = split[0] == want_split[0]
                y = split[1] > want_split[1]
                yy = split[1] == want_split[1]
                z = split[2] > want_split[2]
                if x or (xx and y) or (xx and yy and z):
                    return version
        elif self.version_want.startswith('<'):
            equal = self.version_want.startswith('<=')

            for version in versions:
                if equal and version == want_strip:
                    return version

                split = version.split('.')
                x = split[0] < want_split[0]
                xx = split[0] == want_split[0]
                y = split[1] < want_split[1]
                yy = split[1] == want_split[1]
                z = split[2] < want_split[2]
                if x or (xx and y) or (xx and yy and z):
                    return version
        else:
            for version in versions:
                if version == want_strip:
                    return version

    def parse_str(self, string):
        return string.replace('{name}', self.name).replace(
            '{version}', self.version or '')

    def download(self):
        content_type = None
        path = os.path.join(self.temp_dir, 'download')

        if self.url.startswith('http'):
            resp = requests.get(self.url, stream=True)
            content_type = resp.headers.get('Content-Type')

            with open(path, 'w') as output_file:
                for chunk in resp.iter_content(chunk_size=1024):
                    if chunk:
                        output_file.write(chunk)

        return content_type, path

    def extract(self, archive, type):
        if type == ZIP_FILE:
            name_list = archive.namelist()
        else:
            name_list = archive.getnames()

        for inc_path, output_path in self.include.items():
            if output_path:
                output_path = os.path.join(vendor_path, output_path)
            else:
                output_path = vendor_path + '/'
            extract_paths = []

            for arc_path in name_list:
                if arc_path.endswith('/'):
                    continue

                arc_path_split = arc_path.split('/')
                if '/**/' in inc_path:
                    inc_path_h, inc_path_t = inc_path.split('/**/')
                    inc_path_h_split = inc_path_h.split('/')
                    inc_path_t_split = inc_path_t.split('/')
                    arc_path_t_split = arc_path_split[-len(inc_path_t_split):]

                    if len(arc_path_split) < len(inc_path_h_split):
                        continue

                    match = True
                    for i, segment in enumerate(inc_path_h_split):
                        if not fnmatch.fnmatch(arc_path_split[i], segment):
                            match = False
                            break
                    if not match:
                        continue

                    for i, segment in enumerate(inc_path_t_split):
                        if not fnmatch.fnmatch(arc_path_t_split[i], segment):
                            match = False
                            break
                    if not match:
                        continue

                    output_base = '/'.join(arc_path_split[len(
                        inc_path_h_split):-len(inc_path_t_split)])
                else:
                    output_base = None
                    inc_path_split = inc_path.split('/')

                    if len(arc_path_split) != len(inc_path_split):
                        continue

                    match = True
                    for i, segment in enumerate(inc_path_split):
                        if not fnmatch.fnmatch(arc_path_split[i], segment):
                            match = False
                            break
                    if not match:
                        continue

                archive.extract(arc_path, self.expand_path)
                extract_path = os.path.join(self.expand_path, arc_path)

                if not os.path.isdir(extract_path):
                    extract_paths.append((output_base, extract_path))

            if not extract_paths:
                continue

            if output_path.endswith('/'):
                output_dir = output_path
            else:
                output_dir = os.path.dirname(output_path)

            if os.path.exists(output_dir):
                if not os.path.isdir(output_dir):
                    raise IOError('Directory overwrite ' +
                                  'file error "%s"' % output_dir)
            else:
                os.makedirs(output_dir)

            for output_base, extract_path in extract_paths:
                if output_base:
                    copy_path = os.path.join(output_path, output_base)
                    if not os.path.isdir(copy_path):
                        os.makedirs(copy_path)
                else:
                    copy_path = output_path

                shutil.copy(extract_path, copy_path)

    def install(self):
        content_type, download_path = self.download()
        os.makedirs(self.expand_path)

        # TODO application/octet-stream
        if content_type == 'application/zip' or \
                content_type == 'application/octet-stream':
            with zipfile.ZipFile(download_path, 'r') as archive:
                self.extract(archive, ZIP_FILE)
        elif content_type == 'application/x-tar':
            with tarfile.open(download_path, 'r') as archive:
                self.extract(archive, TAR_FILE)
        elif content_type == 'application/x-gzip':
            with tarfile.open(download_path, 'r:gz') as archive:
                self.extract(archive, TAR_FILE)
        else:
            raise TypeError('Unknown filetype "%s" from "%s"' %(
                content_type, self.url))

def init():
    global vendor_path
    global temp_path
    global powur_conf

    with open(CONF_PATH, 'r') as conf_file:
        powur_conf = json.loads(conf_file.read())

    settings = powur_conf.pop('powur')
    if settings:
        if 'vendor_path' in settings:
            vendor_path = settings['vendor_path']
        if 'temp_path' in settings:
            temp_path = settings['temp_path']

    vendor_path = os.path.normpath(vendor_path)
    temp_path = os.path.normpath(temp_path)

    if not os.path.exists(temp_path):
        os.makedirs(temp_path)

def deinit():
    try:
        shutil.rmtree(temp_path)
    except:
        pass

def iter_packages(names=None):
    for name in powur_conf:
        if names and name not in names:
            continue
        powur_conf[name]['name'] = name
        yield Package(powur_conf[name])

if __name__ == '__main__':
    init()
    try:
        command = sys.argv[1] if len(sys.argv) > 1 else None
        if command == 'install':
            packages = set(sys.argv[2:]) or None

            for pkg in iter_packages(packages):
                print '%s=%s' % (pkg.name, pkg.version)
                pkg.install()
        else:
            raise ValueError('Unknown command')
    finally:
        deinit()
