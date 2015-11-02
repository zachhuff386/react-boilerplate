/// <reference path="../references.d.ts" />
import react = require('react');

interface Props {
	title: string;
}
interface State {
	value: string;
}

export class Test extends react.Component<Props, State> {
	constructor() {
		super();
		this.state = {
			value: '',
		};
	}

	onKey(evt: react.KeyboardEvent) {
		var elem = <HTMLInputElement>evt.target;

		this.setState({
			value: elem.value,
		});
	}

	render() {
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
	}
}
