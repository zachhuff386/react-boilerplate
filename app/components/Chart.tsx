/// <reference path="../References.d.ts"/>
import * as React from 'react';
import * as ChartJS from 'chartjs';

export default class Chart extends React.Component<void, void> {
	chart: ChartJS.Chart;

	componentDidMount(): void {
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
						'rgba(255, 159, 64, 0.2)',
					],
					borderColor: [
						'rgba(255,99,132,1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)',
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
	};

	render(): JSX.Element {
		return <canvas id="chart" width="280" height="200"/>;
	}
}
