/// <reference path="../References.d.ts"/>
import Dispatcher from '../dispatcher/Dispatcher';
import * as Events from 'events';
import * as ItemTypes from '../types/ItemTypes';
import * as GlobalTypes from '../types/GlobalTypes';
import * as MiscUtils from '../utils/MiscUtils';

class _ItemStore extends Events.EventEmitter {
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
let ItemStore = new _ItemStore();
export default ItemStore;

function loading(): void {
	ItemStore._state = {
		'loading': {
			'id': 'loading',
			'content': 'Loading...',
		},
	};
	ItemStore.emitChange();
}

function load(data: ItemTypes.Item[]): void {
	ItemStore._state = {};
	for (let item of data) {
		ItemStore._state[item.id] = item;
	}
	ItemStore.emitChange();
}

function create(content: string): void {
	let id = MiscUtils.uuid();

	ItemStore._state[id] = {
		id: id,
		content: content,
	};

	ItemStore.emitChange();
}

function update(id: string, updates: {[key: string]: any}): void {
	Object.assign(ItemStore._state[id], updates);
	ItemStore.emitChange();
}

function remove(id: string): void {
	delete ItemStore._state[id];
	ItemStore.emitChange();
}

ItemStore.token = Dispatcher.register(function(
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
