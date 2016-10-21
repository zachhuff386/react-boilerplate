/// <reference path="../References.d.ts"/>
export const LOADING = Symbol('item_loading');
export const LOAD = Symbol('item_load');
export const CREATE = Symbol('item_create');
export const REMOVE = Symbol('item_remove');
export const UPDATE = Symbol('item_update');

export interface Item {
	id: string;
	content: string;
}

export type ItemsLoad = Item[];
export type Items = {[key: string]: Item}
