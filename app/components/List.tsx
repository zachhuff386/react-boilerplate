/// <reference path="../References.d.ts"/>
import * as React from 'react';
import * as ItemActions from '../actions/ItemActions';
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
						{this.props.title}
					</div>
					<paper-icon-button icon="menu"/>
				</div>
			</paper-toolbar>
			<ul>
				{itemsLabelDom}
			</ul>
			<ul>
				{itemsDom}
			</ul>
			<google-map style={css.map} latitude="37.779" longitude="-122.3892" min-zoom="9" max-zoom="11"
				language="en">
				<google-map-marker latitude="37.779" longitude="-122.3892"
					title="Go Giants!" draggable="true" drag-events>
					<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/San_Francisco_Giants_Cap_Insignia.svg/200px-San_Francisco_Giants_Cap_Insignia.svg.png" />
				</google-map-marker>
				<google-map-poly closed fill-color="red" fill-opacity=".25" stroke-weight="1">
					<google-map-point latitude="37.779" longitude="-122.3892"/>
					<google-map-point latitude="37.804" longitude="-122.2711"/>
					<google-map-point latitude="37.386" longitude="-122.0837"/>
				</google-map-poly>
			</google-map>
		</div>;
	}
}
