/// <reference path="../References.d.ts"/>

export const CREATE = 'item_create';
export const REMOVE = 'item_remove';
export const UPDATE = 'item_update';

export interface Item {
	id: string;
	content: string;
}

export type Items = {[key: string]: Item}
