/// <reference path="../References.d.ts"/>
import * as Events from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import * as ItemTypes from '../types/ItemTypes';
import * as GlobalTypes from '../types/GlobalTypes';
import * as MiscUtils from '../utils/MiscUtils';

class ItemStore extends Events.EventEmitter {
	_state: ItemTypes.Items = [];
	_map: {[key: string]: number} = {};
	_loadingState: boolean;
	_token = Dispatcher.register((this._callback).bind(this));

	get items(): ItemTypes.Items {
		return this._state;
	}

	get loading(): boolean {
		return this._loadingState;
	}

	emitChange(): void {
		this.emit(GlobalTypes.CHANGE);
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

	_sync(data: ItemTypes.Items): void {
		this._map = {};
		for (let i = 0; i < data.length; i++) {
			this._map[data[i].id] = i;
		}
		this._state = data;
		this.emitChange();
	}

	_create(content: string): void {
		let id = MiscUtils.uuid();
		this._map[id] = this._state.push({
			id: id,
			content: content,
		});
		this.emitChange();
	}

	_update(id: string, updates: {[key: string]: any}): void {
		let i = this._map[id];
		if (i === undefined) {
			return;
		}
		Object.assign(this._state[i], updates);
		this.emitChange();
	}

	_remove(id: string): void {
		let n = this._map[id];
		if (n === undefined) {
			return;
		}
		delete this._map[id];

		this._state.splice(n, 1);

		for (let i = n; i < this._state.length; i++) {
			this._map[this._state[i].id] = i;
		}

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
