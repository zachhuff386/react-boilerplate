/// <reference path="../references.d.ts" />
import * as React from 'react';
import Model from '../model';

interface Props {
	title: string;
}

interface State {
	value: string;
}

export default class Test extends React.Component<Props, State> {
	css = {
		headerBox: {
			width: '100%',
		},
		header: {
			margin: '4px',
			fontSize: '24px',
		},
		value: {
			margin: '20px 10px 0 10px',
			fontSize: '18px',
		},
		input: {
			margin: '0 10px 0 10px',
		},
	};

	constructor() {
		super();
		this.state = {
			value: '',
		};
	}

	onKey(evt: React.KeyboardEvent) {
		var elem = (evt.target as HTMLInputElement);

		this.setState({
			value: elem.value,
		});
	}

	render() {
		return <div>
			<paper-toolbar class="title">
				<div className="layout horizontal" style={this.css.headerBox}>
					<div className="flex" style={this.css.header}>
						{this.props.title}
					</div>
					<paper-icon-button icon="menu"/>
				</div>
			</paper-toolbar>
			<div className="value" style={this.css.value}>
				{this.state.value}
			</div>
			<paper-input value={this.state.value}
					onKeyUp={this.onKey.bind(this)} style={this.css.input}/>
		</div>;
	}
}
