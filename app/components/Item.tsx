/// <reference path="../References.d.ts"/>
import * as React from 'react';
import TextField from 'material-ui/TextField';
import * as ItemTypes from '../types/ItemTypes';
import * as ItemActions from '../actions/ItemActions';

interface Props {
	key: string;
	item: ItemTypes.Item;
}

const css = {
	input: {
		width: '250px',
	} as React.CSSProperties,
};

export default class Item extends React.Component<Props, void> {
	_onChange = (evt: React.FormEvent<HTMLInputElement>): void => {
		ItemActions.update(this.props.item.id, evt.currentTarget.value);
	};

	render(): JSX.Element {
		return <li>
			<TextField
				id={this.props.item.id}
				style={css.input}
				value={this.props.item.content}
				onChange={this._onChange}/>;
		</li>;
	}
}
