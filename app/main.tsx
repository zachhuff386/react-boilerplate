/// <reference path="references.d.ts" />
import React = require('react');
import Test = require('./components/test');

React.render(
	<Test title="React Polymer"/>,
	document.getElementById('app')
);
