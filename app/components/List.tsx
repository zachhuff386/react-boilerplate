/// <reference path="../References.d.ts" />
import * as React from 'react';
import * as ItemActions from '../actions/ItemActions';
import * as ItemType from '../types/ItemType';
import ItemStore from '../stores/ItemStore';
import Item from '../components/Item';

interface Props {
	title: string;
}

interface State {
	items: {[key: string]: ItemType.Item};
}

function getState(): State {
	return {
		items: ItemStore.items(),
	};
}

export default class List extends React.Component<Props, State> {
	css = {
		headerBox: {
			width: '100%',
		},
		header: {
			margin: '4px',
			fontSize: '24px',
		},
	};

	constructor(props: Props, context: any) {
		super(props, context);
		this.state = getState();
	}

	componentDidMount() {
		ItemStore.addChangeListener((this._onChange).bind(this));
	}

	componentWillUnmount() {
		ItemStore.removeChangeListener((this._onChange).bind(this));
	}

	_onChange() {
		this.setState(getState());
	}

	render() {
		var items = this.state.items;

		var itemsLabelDom: JSX.Element[] = [];
		for (var key in items) {
			itemsLabelDom.push(<li key={key}>{items[key].content}</li>);
		}

		var itemsDom: JSX.Element[] = [];
		for (var key in items) {
			itemsDom.push(<Item key={key} item={items[key]}/>);
		}

		return <div>
			<paper-toolbar class="title">
				<div className="layout horizontal" style={this.css.headerBox}>
					<div className="flex" style={this.css.header}>
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
		</div>;
	}
}