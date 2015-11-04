/// <reference path="../References.d.ts" />
import * as React from 'react';
import * as ItemType from '../types/ItemType';
import * as ItemActions from '../actions/ItemActions';
import Input from '../components/Input';

interface Props {
	key: string;
	item: ItemType.Item;
}

export default class Item extends React.Component<Props, void> {
	css = {
		input: {
			width: '250px',
		},
	};

	_onChange(value: string) {
		console.log('item.change:', value);
		ItemActions.update(this.props.item.id, value);
	}

	render() {
		return <li>
			<Input value={this.props.item.content}
					onChange={(this._onChange).bind(this)} style={this.css.input}/>
		</li>;
	}
}
