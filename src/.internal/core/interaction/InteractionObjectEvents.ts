/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IBaseObjectEvents } from "../Base";
import { IPoint } from "../defs/IPoint";
import { IPointer } from "../interaction/Pointer";
import { InteractionObject } from "../interaction/InteractionObject";
import { EventListener, TargetedEventDispatcher, AMEvent } from "../utils/EventDispatcher";
import { MultiDisposer, IDisposer, CounterDisposer } from "../utils/Disposer";


/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */

/**
 * Defines a type of event that has a single point of reference.
 */
export type PointerTypeEvent = {

	/**
	 * Is event originated by touch pointer?
	 */
	touch: boolean;

};

/**
 * Defines a type of event that has a single point of reference.
 */
export type PointEvent = {

	/**
	 * Event point in global (document) coordinates.
	 */
	point: IPoint;

};

/**
 * Defines a type of event that has a related Pointer.
 */
export type PointerEvent = {

	/**
	 * Coordinates of the primary cursor position.
	 */
	pointer: IPointer;

};

/**
 * Defines a type of event that represents some kind of shift in coordinates,
 * like draging an element.
 */
export type ShiftEvent = {

	/**
	 * Shift in coordinates after dragging.
	 */
	shift: IPoint;

};

/**
 * Defines a type of event that represents change in angle, like rotation.
 */
export type AngleEvent = {

	/**
	 * Angle to apply to the element.
	 */
	angle: number;
};


/**
 * Defines a type of event that represents change in element's scale, like
 * resize.
 */
export type ScaleEvent = {

	/**
	 * Scale to apply to the element.
	 */
	scale: number;

};

/**
 * Defines an event that contains event center coordindates.
 */
export type CenterEvent = {

	/**
	 * A center point for specific operation.
	 */
	center?: IPoint;

};

/**
 * Defines an event that can be triggered either by touch device or mouse.
 */
export type MouseTouchEvent = {

	/**
	 * An original mouse or touch event.
	 */
	event: MouseEvent | TouchEvent;

};

/**
 * Defines an event that was not generated by keyboard directly, but rather
 * was simulated to trigger require keyboard-related handlers.
 */
export type SimulatedKeyboardEvent = {

	/**
	 * A keyboard event.
	 */
	event: KeyboardEvent;

}

/**
 * Defines events for [[InteractionObject]].
 */
export interface IInteractionObjectEvents extends IBaseObjectEvents {

	/**
	 * Invoked when object is clicked or touched.
	 */
	hit: PointerTypeEvent & PointEvent & MouseTouchEvent;

	/**
	 * Invoked when object is clicked or touched twice in rapid succession.
	 *
	 * Check [[IHitOptions]] for settings about double hit.
	 */
	doublehit: PointerTypeEvent & PointEvent & MouseTouchEvent;

	/**
	 * Invoked when right mouse button is clicked on the object.
	 */
	rightclick: MouseTouchEvent;

	/**
	 * Invoked when mouse or touch pointer is held down over object for some time.
	 */
	hold: PointerTypeEvent & PointerEvent & MouseTouchEvent;

	/**
	 * Invoked when the mouse button is pressed or touch starts.
	 */
	down: PointerTypeEvent & PointerEvent & MouseTouchEvent;

	/**
	 * Invoked when the mouse button is released or touch ends.
	 */
	up: PointerTypeEvent & PointerEvent & MouseTouchEvent;

	/**
	 * Invoked when `draggable` object is being dragged. (using mouse, touch or
	 * keyboard)
	 */
	drag: PointerTypeEvent & ShiftEvent & PointEvent & {

		/**
		 * Original coordinates of the pointer's position when the dragging started.
		 */
		startPoint: IPoint,

		/**
		 * An original JavaScript event that triggered dragging.
		 */
		event?: MouseEvent | TouchEvent | KeyboardEvent

	};

	/**
	 * Invoked when `draggable` object dragging starts. This event is not
	 * invoked immediatelly after `down`, but only if there's a movement of the
	 * pointer.
	 */
	dragstart: PointerTypeEvent & {

		/**
		 * An original JavaScript event that triggered dragging.
		 */
		event?: MouseEvent | TouchEvent | KeyboardEvent

	}

	/**
	 * Invoked when `draggable` object is released. This event will not fire if
	 * position of the object did not change.
	 */
	dragstop: PointerTypeEvent & {

		/**
		 * An original JavaScript event that triggered dragging.
		 */
		event?: MouseTouchEvent | KeyboardEvent

	};

	/**
	 * Invoked when pointer (mouse cursor or touch point) moves over `trackable`
	 * object.
	 */
	track: PointerTypeEvent & PointEvent & PointerEvent & MouseTouchEvent;

	/**
	 * Invoked when `resizable` object is being resized either by mouse or touch
	 * pinch gesture.
	 */
	resize: PointerTypeEvent & ScaleEvent & MouseTouchEvent & {

		/**
		 * The starting coordinates of the first reference point.
		 */
		startPoint1: IPoint,

		/**
		 * Current coordinates of the first reference point.
		 */
		point1: IPoint,

		/**
		 * The starting coordinates of the second reference point.
		 */
		startPoint2: IPoint,

		/**
		 * Current coordinates of the second reference point.
		 */
		point2: IPoint
	};

	/**
	 * Invoked when user performs "swiping" gesture (quick horizontal movement)
	 * on the object, either using mouse or touch.
	 */
	swipe: PointerTypeEvent & MouseTouchEvent;

	/**
	 * Invoked when user performs "swiping" gesture towards left.
	 */
	swipeleft: PointerTypeEvent & MouseTouchEvent;

	/**
	 * Invoked when user performs "swiping" gesture towards right.
	 */
	swiperight: PointerTypeEvent & MouseTouchEvent;

	/**
	 * Invoked when user turns mouse wheel while over the object.
	 */
	wheel: PointEvent & ShiftEvent & {

		/**
		 * Original JavaScript event.
		 */
		event: WheelEvent

	};

	/**
	 * Invoked when user turns mouse wheel upwards while over the object.
	 */
	wheelup: PointEvent & ShiftEvent & {

		/**
		 * Original JavaScript event.
		 */
		event: WheelEvent

	};

	/**
	 * Invoked when user turns mouse wheel downwards while over the object.
	 */
	wheeldown: PointEvent & ShiftEvent & {

		/**
		 * Original JavaScript event.
		 */
		event: WheelEvent

	};

	/**
	 * Invoked when user turns mouse wheel leftwards while over the object.
	 */
	wheelleft: PointEvent & ShiftEvent & {

		/**
		 * Original JavaScript event.
		 */
		event: WheelEvent

	};

	/**
	 * Invoked when user turns mouse wheel rightwards while over the object.
	 */
	wheelright: PointEvent & ShiftEvent & {

		/**
		 * Original JavaScript event.
		 */
		event: WheelEvent

	};

	/**
	 * Invoked when mouse cursor moves over `hoverable` object or it is touched.
	 */
	over: PointerTypeEvent & MouseTouchEvent & PointerEvent;

	/**
	 * Invoked when mouse cursor moves out of `hoverable` object or it is no
	 * longer touched.
	 */
	out: PointerTypeEvent & MouseTouchEvent & PointerEvent;

	/**
	 * Invoked when `focusable` object gains focus, e.g. by using TAB button.
	 */
	focus: {

		/**
		 * Original JavaScript `FocusEvent`.
		 */
		event: FocusEvent

	};

	/**
	 * Invoked when `focusable` object loses focus, e.g. by clicking outside
	 * it or pressing TAB button to focus on the next focusable object.
	 */
	blur: {

		/**
		 * Original JavaScript `FocusEvent`.
		 */
		event: FocusEvent

	};

	/**
	 * Invoked when the key is pressed on the keyboard.
	 */
	keydown: {

		/**
		 * Orginal JavaScript `KeyboardEvent`.
		 */
		event: KeyboardEvent

	};

	/**
	 * Invoked when the key is released on the keyboard.
	 */
	keyup: {

		/**
		 * Orginal JavaScript `KeyboardEvent`.
		 */
		event: KeyboardEvent

	};

	/**
	 * Invoked when the key generates a "press", e.g. pressing and holding a
	 * letter key will generate repeated "keypress" events.
	 */
	keypress: {

		/**
		 * Orginal JavaScript `KeyboardEvent`.
		 */
		event: KeyboardEvent

	};

	/**
	 * Invoked whenever information changes in the textual input elements, like
	 * `<input>`, `<textarea>`, etc.
	 */
	input: {

		/**
		 * Orginal JavaScript `KeyboardEvent`.
		 */
		event: KeyboardEvent

	};
}

/**
 * Represents an Event Dispatcher for [[InteractionObject]].
 *
 * Besides regular [[EventDispatcher]] functionality it adds new events with
 * direct application to DOM nodes. Primarily used to handle keyboard events,
 * but can turn into something else moving forward.
 */
export class InteractionObjectEventDispatcher<T extends AMEvent<InteractionObject, IInteractionObjectEvents>> extends TargetedEventDispatcher<InteractionObject, T> {

	/**
	 * Holds a list of Disposers for DOM events added.
	 */
	private _domEvents: { [key: string]: CounterDisposer } = {};

	/**
	 * Adds a DOM event and returns Disposer.
	 *
	 * @return Disposer
	 */
	private _addDOMEvent<E extends Event, Key extends keyof IInteractionObjectEvents, C>(
		type: string,
		key: Key,
		listener: (this: C, key: Key, evt: E) => void,
		context: C
	): IDisposer {
		if (!this._domEvents[type]) {
			const callback = function (e: Event): void {
				listener.call(context, key, e as any);
			};

			this.target.element.addEventListener(type, callback, false);

			this._domEvents[type] = new CounterDisposer(() => {
				delete this._domEvents[type];

				this.target.element.removeEventListener(type, callback, false);
			});
		}

		return this._domEvents[type].increment();
	}

	private _dispatchKeyboardEvent<Key extends "keydown" | "keyup" | "keypress" | "input">(key: Key, ev: KeyboardEvent): void {
		// TODO use this.dispatchImmediately ?
		if (this.target.events.isEnabled(key)) {
			this.target.events.dispatchImmediately(key, {
				type: key as any,
				target: this.target,
				event: ev
			});
		}
	}

	protected _on<A, B, Key extends keyof T>(once: boolean, type: Key | null, callback: A, context: B, shouldClone: boolean, dispatch: (type: Key, event: T[Key]) => void): EventListener<T> {
		const info = super._on(once, type, callback, context, shouldClone, dispatch);

		const disposers = [info.disposer];

		switch (type) {
			case "hit":
			case "doublehit":
			case "rightclick":
			case "down":
			case "up":
				this.target.clickable = true;
				break;
			case "drag":
			case "dragstart":
			case "dragstop":
				this.target.draggable = true;
				break;
			case "track":
				this.target.trackable = true;
				break;
			case "resize":
				this.target.resizable = true;
				break;
			case "swipe":
			case "swipeleft":
			case "swiperight":
				this.target.swipeable = true;
				break;
			case "wheel":
			case "wheelup":
			case "wheeldown":
			case "wheelleft":
			case "wheelright":
				this.target.wheelable = true;
				break;
			case "over":
			case "out":
				this.target.hoverable = true;
				break;
			case "focus":
			case "blur":
			case "focusin":
			case "focusout":
				this.target.focusable = true;
				break;
			case "keydown":
				disposers.push(this._addDOMEvent<KeyboardEvent, "keydown", this>(<any>type, <any>type, this._dispatchKeyboardEvent, this));
				break;
			case "keyup":
				disposers.push(this._addDOMEvent<KeyboardEvent, "keyup", this>(<any>type, <any>type, this._dispatchKeyboardEvent, this));
				break;
			case "keypress":
				disposers.push(this._addDOMEvent<KeyboardEvent, "keypress", this>(<any>type, <any>type, this._dispatchKeyboardEvent, this));
				break;
			case "input":
				disposers.push(this._addDOMEvent<KeyboardEvent, "input", this>(<any>type, <any>type, this._dispatchKeyboardEvent, this));
				break;
		}

		info.disposer = new MultiDisposer(disposers);

		return info;
	}

}
