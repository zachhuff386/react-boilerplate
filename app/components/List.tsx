/// <reference path="../References.d.ts"/>
import * as React from 'react';
import * as Blueprint from '@blueprintjs/core';
import ItemStore from '../stores/ItemStore';
import * as Alert from '../Alert';
import * as ItemTypes from '../types/ItemTypes';
import * as ItemActions from '../actions/ItemActions';
import Item from '../components/Item';

interface Props {
	title: string;
}

interface State {
	items: ItemTypes.Items;
	loading: boolean;
}

function getState(): State {
	return {
		items: ItemStore.items,
		loading: ItemStore.loading,
	};
}

const css = {
	labels: {
		marginTop: '20px',
	} as React.CSSProperties,
	list: {
		listStyle: 'none',
		paddingLeft: '5px',
	} as React.CSSProperties,
};

export default class List extends React.Component<Props, State> {
	constructor(props: Props, context: any) {
		super(props, context);
		ItemActions.sync();
		this.state = getState();
	}

	componentDidMount(): void {
		ItemStore.addChangeListener(this.onChange);
	}

	componentWillUnmount(): void {
		ItemStore.removeChangeListener(this.onChange);
	}

	onChange = (): void => {
		this.setState(getState());
	}

	sync = (): void => {
		Alert.info('Refeshing');
		ItemActions.sync();
	}

	render(): JSX.Element {
		let items = this.state.items;

		let itemsLabelDom: JSX.Element[] = [];
		for (let key in items) {
			if (!items.hasOwnProperty(key)) {
				continue;
			}
			itemsLabelDom.push(<li key={key}>{items[key].content}</li>);
		}

		let itemsDom: JSX.Element[] = [];
		for (let item of items) {
			itemsDom.push(<Item key={item.id} item={item}/>);
		}

		let loading: JSX.Element;
		if (this.state.loading) {
			loading = <Blueprint.Spinner
				className="pt-small"
				intent={Blueprint.Intent.PRIMARY}
			/>;
		}

		return <div>
			<nav className="pt-navbar">
				<div className="pt-navbar-group pt-align-left">
					<div className="pt-navbar-heading">{this.props.title}</div>
					{loading}
				</div>
				<div className="pt-navbar-group pt-align-right">
					<button
						className="pt-button pt-minimal pt-icon-refresh"
						onClick={this.sync}
					/>
				</div>
			</nav>
			<ul style={css.labels}>
				{itemsLabelDom}
			</ul>
			<ul style={css.list}>
				{itemsDom}
			</ul>
		</div>;
	}
}
