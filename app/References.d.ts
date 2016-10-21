/// <reference path="../typings/index.d.ts" />
declare namespace JSX {
	interface IntrinsicElements {
		'iron-a11y-announcer': any,
		'iron-a11y-keys-behavior': any,
		'iron-autogrow-textarea': any,
		'iron-behaviors': any,
		'iron-checked-element-behavior': any,
		'iron-collapse': any,
		'iron-dropdown': any,
		'iron-fit-behavior': any,
		'iron-flex-layout': any,
		'iron-form-element-behavior': any,
		'iron-icon': any,
		'iron-icons': any,
		'iron-iconset-svg': any,
		'iron-input': any,
		'iron-media-query': any,
		'iron-menu-behavior': any,
		'iron-meta': any,
		'iron-overlay-behavior': any,
		'iron-range-behavior': any,
		'iron-resizable-behavior': any,
		'iron-selector': any,
		'iron-validatable-behavior': any,
		'neon-animation': any,
		'paper-badge': any,
		'paper-behaviors': any,
		'paper-button': any,
		'paper-card': any,
		'paper-checkbox': any,
		'paper-dialog': any,
		'paper-dialog-behavior': any,
		'paper-dialog-scrollable': any,
		'paper-drawer-panel': any,
		'paper-dropdown-menu': any,
		'paper-elements': any,
		'paper-fab': any,
		'paper-header-panel': any,
		'paper-icon-button': any,
		'paper-input': any,
		'paper-item': any,
		'paper-material': any,
		'paper-menu': any,
		'paper-menu-button': any,
		'paper-progress': any,
		'paper-radio-button': any,
		'paper-radio-group': any,
		'paper-ripple': any,
		'paper-scroll-header-panel': any,
		'paper-slider': any,
		'paper-spinner': any,
		'paper-styles': any,
		'paper-tabs': any,
		'paper-toast': any,
		'paper-toggle-button': any,
		'paper-toolbar': any,
		'paper-tooltip': any,
		'google-analytics': any,
		'google-analytics-chart': any,
		'google-analytics-dashboard': any,
		'google-analytics-date-selector': any,
		'google-analytics-loader': any,
		'google-analytics-query': any,
		'google-analytics-view-selector': any,
		'google-calendar': any,
		'google-castable-video': any,
		'google-chart': any,
		'google-feeds': any,
		'google-hangout-button': any,
		'google-map': any,
		'google-map-directions': any,
		'google-map-elements': any,
		'google-map-marker': any,
		'google-map-point': any,
		'google-map-poly': any,
		'google-map-search': any,
		'google-sheets': any,
		'google-signin': any,
		'google-streetview-pano': any,
		'google-youtube': any,
		'google-youtube-upload': any,
		're-captcha': any,
	}
}

declare module "events" {
    type EventType = Symbol;

    interface EventListener {
        (...args: any[]): void;
    }

    class EventEmitter {
        static defaultMaxListeners: number;
        static listenerCount(emitter: EventEmitter, type: EventType): number;

        constructor();

        setMaxListeners(n: number): EventEmitter;

        emit(type: EventType, ...args: any[]): boolean;

        addListener(type: EventType, listener: EventListener): EventEmitter;

        on(type: EventType, listener: EventListener): EventEmitter;

        once(type: EventType, listener: EventListener): EventEmitter;

        removeListener(type: EventType, listener: EventListener): EventEmitter;

        removeAllListeners(type: EventType): EventEmitter;

        listeners(type: EventType): EventListener[];

        listenerCount(type: EventType): number;
    }

    export default EventEmitter
}
