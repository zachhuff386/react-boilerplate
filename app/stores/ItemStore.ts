/// <reference path="../References.d.ts"/>
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import * as ItemType from '../types/ItemType';
import * as GlobalTypes from '../types/GlobalTypes';

var _collection: {[key: string]: ItemType.Item} = {
	'1001': {
		'id': '1001',
		'content': 'Item One',
	},
	'1002': {
		'id': '1002',
		'content': 'Item Two',
	},
	'1003': {
		'id': '1003',
		'content': 'Item Three',
	},
};

function create(content: string) {
	var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

	_collection[id] = {
		id: id,
		content: content,
	};
}

function update(id: string, updates: {[key: string]: any}) {
	Object.assign(_collection[id], updates);
}

function remove(id: string) {
	delete _collection[id];
}

class _ItemStore extends EventEmitter {
	items() {
		return _collection;
	}

	emitChange() {
		this.emit(GlobalTypes.CHANGE)
	}

	addChangeListener(callback: () => void) {
		this.on(GlobalTypes.CHANGE, callback);
	}

	removeChangeListener(callback: () => void) {
		this.removeListener(GlobalTypes.CHANGE, callback);
	}
}
var ItemStore = new _ItemStore();
export default ItemStore;

AppDispatcher.register(function(action) {
	switch (action.type) {
		case ItemType.CREATE:
			create(action.data.content);
			break;

		case ItemType.UPDATE:
			update(action.data.id, {
				content: action.data.content,
			});
			break;

		case ItemType.REMOVE:
			remove(action.data.id);
			break;

		default:
			return;
	}

	ItemStore.emitChange();
});
