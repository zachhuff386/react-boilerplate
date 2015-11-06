/// <reference path="../References.d.ts"/>

export const CREATE = Symbol('item_create');
export const REMOVE = Symbol('item_remove');
export const UPDATE = Symbol('item_update');

export interface Item {
	id: string;
	content: string;
}

export type Items = {[key: string]: Item}
