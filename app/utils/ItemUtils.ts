/// <reference path="../References.d.ts"/>
import * as ItemTypes from '../types/ItemTypes';
import * as ItemActions from '../actions/ItemActions';

export function init(): Promise<string> {
	return new Promise<string>((resolve): void => {
		let data: ItemTypes.Item[] = [
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
