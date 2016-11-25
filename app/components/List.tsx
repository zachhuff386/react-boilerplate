/// <reference path="../References.d.ts"/>
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
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
	labels: {
		color: '#fff',
		marginTop: '20px',
	} as React.CSSProperties,
	list: {
		listStyle: 'none',
	} as React.CSSProperties,
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
			<AppBar title={this.props.title}/>
			<ul style={css.labels}>
				{itemsLabelDom}
			</ul>
			<ul style={css.list}>
				{itemsDom}
			</ul>
		</div>;
	}
}
