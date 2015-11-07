/// <reference path="../References.d.ts"/>
import Dispatcher from '../dispatcher/Dispatcher';
import EventEmitter from 'events';
import * as ItemTypes from '../types/ItemTypes';
import * as GlobalTypes from '../types/GlobalTypes';

let _collection: ItemTypes.Items = {};

class _ItemStore extends EventEmitter {
	token: string;

	get items(): ItemTypes.Items {
		return _collection;
	}

	emitChange(): void {
		this.emit(GlobalTypes.CHANGE)
	}

	addChangeListener(callback: () => void): void {
		this.on(GlobalTypes.CHANGE, callback);
	}

	removeChangeListener(callback: () => void): void {
		this.removeListener(GlobalTypes.CHANGE, callback);
	}
}
let ItemStore = new _ItemStore();
export default ItemStore;

function loading(): void {
	_collection = {
		'loading': {
			'id': 'loading',
			'content': 'Loading...',
		},
	};
	ItemStore.emitChange();
}

function load(data: ItemTypes.ItemsLoad): void {
	_collection = {};
	for (let item of data) {
		_collection[item.id] = item;
	}
	ItemStore.emitChange();
}

function create(content: string): void {
	let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

	_collection[id] = {
		id: id,
		content: content,
	};

	ItemStore.emitChange();
}

function update(id: string, updates: {[key: string]: any}): void {
	Object.assign(_collection[id], updates);
	ItemStore.emitChange();
}

function remove(id: string): void {
	delete _collection[id];
	ItemStore.emitChange();
}

ItemStore.token = Dispatcher.register(function(
		action: GlobalTypes.Dispatch): void {
	switch (action.type) {
		case ItemTypes.LOADING:
			loading();
			break;

		case ItemTypes.LOAD:
			load(action.data);
			break;

		case ItemTypes.CREATE:
			create(action.data.content);
			break;

		case ItemTypes.UPDATE:
			update(action.data.id, {
				content: action.data.content,
			});
			break;

		case ItemTypes.REMOVE:
			remove(action.data.id);
			break;
	}
});
