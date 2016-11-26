/// <reference path="../References.d.ts"/>
import Dispatcher from '../dispatcher/Dispatcher';
import * as Events from 'events';
import * as ItemTypes from '../types/ItemTypes';
import * as GlobalTypes from '../types/GlobalTypes';
import * as MiscUtils from '../utils/MiscUtils';

class ItemStore extends Events.EventEmitter {
	_state: ItemTypes.Items = {};
	token: string;

	get items(): ItemTypes.Items {
		return this._state;
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
let itemStore = new ItemStore();
export default itemStore;

function loading(): void {
	itemStore._state = {
		'loading': {
			'id': 'loading',
			'content': 'Loading...',
		},
	};
	itemStore.emitChange();
}

function load(data: ItemTypes.Item[]): void {
	itemStore._state = {};
	for (let item of data) {
		itemStore._state[item.id] = item;
	}
	itemStore.emitChange();
}

function create(content: string): void {
	let id = MiscUtils.uuid();

	itemStore._state[id] = {
		id: id,
		content: content,
	};

	itemStore.emitChange();
}

function update(id: string, updates: {[key: string]: any}): void {
	Object.assign(itemStore._state[id], updates);
	itemStore.emitChange();
}

function remove(id: string): void {
	delete itemStore._state[id];
	itemStore.emitChange();
}

itemStore.token = Dispatcher.register(function(
		action: ItemTypes.ItemDispatch): void {
	switch (action.type) {
		case ItemTypes.LOADING:
			loading();
			break;

		case ItemTypes.LOAD:
			load(action.data.items);
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
