/// <reference path="../References.d.ts"/>
import * as Events from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as ItemTypes from '../types/ItemTypes';
import * as GlobalTypes from '../types/GlobalTypes';
import * as MiscUtils from '../utils/MiscUtils';

class ItemStore extends Events.EventEmitter {
	_state: ItemTypes.Items = {};
	_loadingState: boolean;
	_token = Dispatcher.register((this._callback).bind(this));

	get items(): ItemTypes.Items {
		return this._state;
	}

	get loading(): boolean {
		return this._loadingState;
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

	_loading(): void {
		if (this._loadingState !== true) {
			this._loadingState = true;
			this.emitChange();
		}
	}

	_loaded(): void {
		if (this._loadingState !== false) {
			this._loadingState = false;
			this.emitChange();
		}
	}

	_sync(data: ItemTypes.Item[]): void {
		this._state = {};
		for (let item of data) {
			this._state[item.id] = item;
		}
		this.emitChange();
	}

	_create(content: string): void {
		let id = MiscUtils.uuid();
		this._state[id] = {
			id: id,
			content: content,
		};
		this.emitChange();
	}

	_update(id: string, updates: {[key: string]: any}): void {
		Object.assign(this._state[id], updates);
		this.emitChange();
	}

	_remove(id: string): void {
		delete this._state[id];
		this.emitChange();
	}

	_callback(action: ItemTypes.ItemDispatch): void {
		switch (action.type) {
			case ItemTypes.LOADING:
				this._loading();
				break;

			case ItemTypes.LOADED:
				this._loaded();
				break;

			case ItemTypes.SYNC:
				this._sync(action.data.items);
				break;

			case ItemTypes.CREATE:
				this._create(action.data.content);
				break;

			case ItemTypes.UPDATE:
				this._update(action.data.id, {
					content: action.data.content,
				});
				break;

			case ItemTypes.REMOVE:
				this._remove(action.data.id);
				break;
		}
	}
}

export default new ItemStore();
