/// <reference path="../References.d.ts" />
import * as Flux from 'flux';

interface Dispatch {
	type: string;
	data: any;
}

class _AppDispatcher extends Flux.Dispatcher<Dispatch> {}
var AppDispatcher = new _AppDispatcher();
export default AppDispatcher;
