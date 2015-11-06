/// <reference path="../References.d.ts"/>
import * as React from 'react';
import * as ItemType from '../types/ItemType';

interface Props {
	style: any;
	value: string;
	onChange?: (value: string) => void;
	onSave?: (value: string) => void;
}

interface State {
	value: string;
}

export default class Input extends React.Component<Props, State> {
	_elem: HTMLInputElement;

	constructor(props: Props, context: any) {
		super(props, context);
		this.state = {
			value: props.value || '',
		};
	}

	componentDidMount(): void {
		this._elem.addEventListener('change',
				(this._onChange).bind(this));
	}

	componentWillUnmount(): void {
		this._elem.removeEventListener('change',
				(this._onChange).bind(this));
	}

	_onKeyUp = (evt: React.KeyboardEvent): void => {
		let elem = (evt.target as HTMLInputElement);

		if (evt.keyCode === 13) {
			this._onSave();
		} else if (this.props.onChange) {
			this.props.onChange(elem.value);
		}
	};

	_onSave = (): void => {
		if (this.props.onSave) {
			this.props.onSave(this.state.value);
		}
	};

	_onChange = (evt: Event): void => {
		let elem = (evt.target as HTMLInputElement);

		this.setState({
			value: elem.value,
		});
	};

	render(): JSX.Element {
		return <paper-input
				ref={(x: any) => this._elem = x}
				value={this.state.value}
				style={this.props.style}
				onBlur={this._onSave}
				onKeyUp={this._onKeyUp}/>;
	}
}
