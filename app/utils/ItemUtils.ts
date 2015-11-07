/// <reference path="../References.d.ts"/>
import Dispatcher from '../dispatcher/Dispatcher';
import * as ItemTypes from '../types/ItemTypes';
import * as ItemActions from '../actions/ItemActions';

export function init() {
	return new Promise((resolve: PromiseResolve) => {
		let data: ItemTypes.ItemsLoad = [
			{
				id: '1001',
				content: 'Item One',
			},
			{
				id: '1002',
				content: 'Item Two',
			},
			{
				id: '1003',
				content: 'Item Three',
			},
		];

		ItemActions.loading();
		setTimeout(() => {
			ItemActions.load(data);
			resolve();
		}, 1000);
	});
}
