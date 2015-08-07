var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../typings/react/react.d.ts" />
var react = require('react');
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.call(this);
        this.state = {
            value: '',
        };
    }
    Test.prototype.onKey = function (evt) {
        var elem = evt.target;
        this.setState({
            value: elem.value,
        });
    };
    Test.prototype.render = function () {
        return react.createElement('x-test', {}, [
            react.createElement('paper-toolbar', {
                className: 'title',
            }, [
                react.createElement('div', {
                    className: 'layout horizontal',
                    style: {
                        width: '100%',
                    },
                }, [
                    react.createElement('div', {
                        className: 'flex',
                        style: {
                            fontSize: '30px',
                        },
                    }, [
                        this.props.title,
                    ]),
                    react.createElement('paper-icon-button', {
                        icon: 'menu',
                    }, []),
                ]),
            ]),
            react.createElement('div', {
                className: 'value',
                style: {
                    margin: '20px 10px 0 10px',
                    fontSize: '18px',
                },
            }, [
                'value: ' + this.state.value,
            ]),
            react.createElement('paper-input', {
                value: this.state.value,
                onKeyUp: this.onKey.bind(this),
                style: {
                    margin: '0 10px 0 10px',
                },
            }),
        ]);
    };
    return Test;
})(react.Component);
exports.Test = Test;
//# sourceMappingURL=test.js.map