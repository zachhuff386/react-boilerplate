/// <reference path="../References.d.ts"/>
import * as React from 'react';
import * as ItemTypes from '../types/ItemTypes';
import * as ItemActions from '../actions/ItemActions';
import Input from '../components/Input';

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
	_onChange = (value: string): void => {
		ItemActions.update(this.props.item.id, value);
	};

	render(): JSX.Element {
		return <li>
			<Input value={this.props.item.content}
					onSave={this._onChange} style={css.input}/>
		</li>;
	}
}
