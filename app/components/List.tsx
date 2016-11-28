/// <reference path="../References.d.ts"/>
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Styles from '../Styles';
import ItemStore from '../stores/ItemStore';
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
		color: Styles.colors.color,
		marginTop: '20px',
	} as React.CSSProperties,
	list: {
		listStyle: 'none',
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

		return <div>
			<AppBar title={this.props.title}/>
			{this.state.loading ? <div>Loading...</div> : null}
			<ul style={css.labels}>
				{itemsLabelDom}
			</ul>
			<ul style={css.list}>
				{itemsDom}
			</ul>
		</div>;
	}
}
