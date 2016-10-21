/// <reference path="../References.d.ts"/>
import * as React from 'react';
import * as ItemTypes from '../types/ItemTypes';
import ItemStore from '../stores/ItemStore';
import * as ItemUtils from '../utils/ItemUtils';
import Item from '../components/Item';

interface Props {
	title: string;
}

interface State {
	items: ItemTypes.Items;
}

function getState(): State {
	return {
		items: ItemStore.items,
	};
}

const css = {
	headerBox: {
		color: '#fff',
		width: '100%',
	},
	header: {
		margin: '4px',
		fontSize: '24px',
	},
	list: {
		listStyle: 'none',
	},
	map: {
		margin: '20px',
		width: '250px',
		height: '250px',
	},
};

export default class List extends React.Component<Props, State> {
	constructor(props: Props, context: any) {
		super(props, context);
		ItemUtils.init();
		this.state = getState();
	}

	componentDidMount(): void {
		ItemStore.addChangeListener(this._onChange);
	}

	componentWillUnmount(): void {
		ItemStore.removeChangeListener(this._onChange);
	}

	_onChange = (): void => {
		this.setState(getState());
	};

	render(): JSX.Element {
		let items = this.state.items;

		let itemsLabelDom: JSX.Element[] = [];
		for (let key in items) {
			itemsLabelDom.push(<li key={key}>{items[key].content}</li>);
		}

		let itemsDom: JSX.Element[] = [];
		for (let key in items) {
			if (key === 'loading') {
				continue;
			}
			itemsDom.push(<Item key={key} item={items[key]}/>);
		}

		return <div>
			<paper-toolbar class="title">
				<div className="layout horizontal" style={css.headerBox}>
					<div className="flex" style={css.header}>
						{this.props.title} <iron-icon icon="icons:info"/>
					</div>
					<paper-icon-button icon="menu"/>
				</div>
			</paper-toolbar>
			<ul>
				{itemsLabelDom}
			</ul>
			<ul style={css.list}>
				{itemsDom}
			</ul>
			<google-map style={css.map} latitude="37.779" longitude="-122.3892"
					min-zoom="9" max-zoom="11" language="en">
				<google-map-marker latitude="37.779" longitude="-122.3892"
					title="Marker" draggable="true" drag-events/>
			</google-map>
		</div>;
	}
}
