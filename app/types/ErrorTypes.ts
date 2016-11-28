/// <reference path="../References.d.ts"/>
export const CREATE = Symbol('error.create');
export const REMOVE = Symbol('error.remove');

export const WARNING = Symbol('error.warning');
export const ERROR = Symbol('error.error');

export interface Error {
	id?: string;
	level?: Symbol;
	message?: string;
}

export type Errors = Error[];

export interface ErrorDispatch {
	type: Symbol;
	data?: {
		id?: string;
		level?: Symbol;
		message?: string;
	};
}
