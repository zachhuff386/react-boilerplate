/// <reference path="../References.d.ts" />
import AppDispatcher from '../dispatcher/AppDispatcher';
import * as ItemType from '../types/ItemType';

export function create(content: string) {
	AppDispatcher.dispatch({
		type: ItemType.CREATE,
		data: {
			content: content,
		},
	});
}

export function update(id: string, content: string) {
	AppDispatcher.dispatch({
		type: ItemType.UPDATE,
		data: {
			id: id,
			content: content,
		},
	});
}

export function remove(id: string) {
	AppDispatcher.dispatch({
		type: ItemType.REMOVE,
		data: {
			id: id,
		},
	});
}
