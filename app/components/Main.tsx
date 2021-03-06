/// <reference path="../References.d.ts"/>
import * as React from 'react';
import List from './List';

document.body.className = 'root pt-dark';

interface Props {
	children?: JSX.Element;
}

class ContainerFix extends React.Component<Props, void> {
	static childContextTypes = {};

	getChildContext() {
		return {};
	}

	render(): JSX.Element {
		return this.props.children;
	}
}

export default class Main extends React.Component<void, void> {
	render(): JSX.Element {
		return <ContainerFix>
			<List title="React Boilerplate"/>
		</ContainerFix>;
	}
}
