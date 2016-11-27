/// <reference path="../References.d.ts"/>
import Dispatcher from '../dispatcher/Dispatcher';
import * as ItemTypes from '../types/ItemTypes';

export function sync(): Promise<void> {
	Dispatcher.dispatch({
		type: ItemTypes.LOADING,
	});

	return new Promise<void>((resolve): void => {
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

		setTimeout(() => {
			Dispatcher.dispatch({
				type: ItemTypes.LOADED,
			});
			Dispatcher.dispatch({
				type: ItemTypes.SYNC,
				data: {
					items: data,
				},
			});
			resolve();
		}, 1000);
	});
}

export function create(content: string): void {
	Dispatcher.dispatch({
		type: ItemTypes.CREATE,
		data: {
			content: content,
		},
	});
}

export function update(id: string, content: string): void {
	Dispatcher.dispatch({
		type: ItemTypes.UPDATE,
		data: {
			id: id,
			content: content,
		},
	});
}

export function remove(id: string): void {
	Dispatcher.dispatch({
		type: ItemTypes.REMOVE,
		data: {
			id: id,
		},
	});
}
