/// <reference path="../References.d.ts"/>
import Dispatcher from '../dispatcher/Dispatcher';
import * as ItemTypes from '../types/ItemTypes';

export function loading(): void {
	Dispatcher.dispatch({
		type: ItemTypes.LOADING,
	});
}

export function load(items: ItemTypes.Item[]): void {
	Dispatcher.dispatch({
		type: ItemTypes.LOAD,
		data: {
			items: items,
		},
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
