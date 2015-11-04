/// <reference path="../References.d.ts" />
import * as React from 'react';
import * as ItemType from '../types/ItemType';

interface Props {
	style: any;
	value: string;
	onChange: (value: string) => void;
}

interface State {
	value: string;
}

export default class Input extends React.Component<Props, State> {
	constructor(props: Props, context: any) {
		super(props, context);
		this.state = {
			value: props.value || '',
		};
	}

	_onKeyUp(evt: React.KeyboardEvent) {
		var elem = (evt.target as HTMLInputElement);

		this.setState({
			value: elem.value,
		});

		this.props.onChange(elem.value);
	}

	render() {
		return <paper-input value={this.state.value}
				style={this.props.style}
				onKeyUp={(this._onKeyUp).bind(this)}/>;
	}
}
