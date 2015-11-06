/// <reference path="../References.d.ts"/>
import Dispatcher from '../dispatcher/Dispatcher';
import * as ItemType from '../types/ItemType';

export function get(): void {
	Dispatcher.dispatch({
		type: ItemType.GET,
	})
}

export function create(content: string): void {
	Dispatcher.dispatch({
		type: ItemType.CREATE,
		data: {
			content: content,
		},
	});
}

export function update(id: string, content: string): void {
	Dispatcher.dispatch({
		type: ItemType.UPDATE,
		data: {
			id: id,
			content: content,
		},
	});
}

export function remove(id: string): void {
	Dispatcher.dispatch({
		type: ItemType.REMOVE,
		data: {
			id: id,
		},
	});
}
