/// <reference path="../References.d.ts"/>
import * as React from 'react';
import * as ItemTypes from '../types/ItemTypes';
import * as ItemActions from '../actions/ItemActions';

interface Props {
	key: string;
	item: ItemTypes.Item;
}

const css = {
	item: {
		margin: '5px',
	} as React.CSSProperties,
	input: {
		width: '200px',
	} as React.CSSProperties,
};

export default class Item extends React.Component<Props, void> {
	onChange = (evt: React.FormEvent<HTMLInputElement>): void => {
		ItemActions.update(this.props.item.id, evt.currentTarget.value);
	}

	render(): JSX.Element {
		return <li style={css.item}>
			<input
				className="pt-input"
				style={css.input}
				type="text"
				value={this.props.item.content}
				onChange={this.onChange}
			/>
		</li>;
	}
}
