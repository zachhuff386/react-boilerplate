/// <reference path="../References.d.ts"/>
import * as React from 'react';
import * as ChartJS from 'chartjs';
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
	chart: ChartJS.Chart;

	constructor(props: Props, context: any) {
		super(props, context);
		ItemUtils.init();
		this.state = getState();
	}

	componentDidMount(): void {
		ItemStore.addChangeListener(this._onChange);
		this.renderChart();
	}

	componentWillUnmount(): void {
		ItemStore.removeChangeListener(this._onChange);
	}

	renderChart(): void {
		let elem = document.getElementById('chart') as HTMLCanvasElement;
		let ctx = elem.getContext('2d');

		this.chart = new ChartJS.Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [{
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255,99,132,1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1,
				}],
			} as ChartJS.LinearChartData,
			options: {
				responsive: false,
				legend: {
					display: false,
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
						},
					}],
				},
			} as ChartJS.ChartSettings,
		});
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
			<canvas id="chart" width="280" height="200"/>
			<google-map style={css.map} latitude="37.779" longitude="-122.3892"
					min-zoom="9" max-zoom="11" language="en">
				<google-map-marker latitude="37.779" longitude="-122.3892"
					title="Marker" draggable="true" drag-events/>
			</google-map>
		</div>;
	}
}
