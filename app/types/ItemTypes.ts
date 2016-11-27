/// <reference path="../References.d.ts"/>
export const LOADING = Symbol('item.loading');
export const LOADED = Symbol('item.loaded');
export const SYNC = Symbol('item.sync');
export const CREATE = Symbol('item.create');
export const REMOVE = Symbol('item.remove');
export const UPDATE = Symbol('item.update');

export interface Item {
	id: string;
	content: string;
}

export type Items = {[key: string]: Item};

export interface ItemDispatch {
	type: Symbol;
	data?: {
		id: string;
		content: string;
		items: Item[];
	};
}
