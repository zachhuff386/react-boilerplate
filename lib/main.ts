/// <reference path="../typings/react/react.d.ts" />
import react = require('react');
import test = require('components/test');

react.render(
		react.createElement(test.Test, {
			title: 'React Boilerplate',
		}),
		document.getElementById('app')
);
