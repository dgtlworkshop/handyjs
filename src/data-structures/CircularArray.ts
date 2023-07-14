/**
 * An array whose start can be "rotated", adjusting all the index values. https://en.wikipedia.org/wiki/Circular_buffer
 */
export class CircularArray<T> {
	private _elements: T[];
	/**
	 * How far the array has advanced.
	 *
	 * @warn Do not set to a negative or floating number
	 */
	public offset: number = 0;

	public get length() {
		return this._elements.length;
	}

	constructor(...elements: T[]) {
		this._elements = new Array(...elements);
	}

	public get(index: number): T | undefined {
		if (this._elements.length === 0) {
			return undefined;
		} else {
			return this._elements[(index + this.offset) % this._elements.length];
		}
	}

	/**
	 * Moves the front of the array forward by this many elements
	 * @param distance Default `1` element forwards
	 */
	public forward(distance = 1) {
		if (this._elements.length === 0) {
			throw new RangeError("CircularArray has no elements");
		} else {
			this.offset = (this.offset + distance) % this._elements.length;
		}
	}

	/**
	 * Moves the front of the array backward by this many elements
	 * @param distance Default `1` element backwards
	 */
	public reverse(distance = 1) {
		return this.forward(-distance);
	}

	/**
	 * Adds an element to the back of the array
	 * @param new_elements The elements to add
	 * @returns The new length
	 */
	public push(...new_elements: T[]): number {
		if (this.offset % this._elements.length === 0) {
			return this._elements.push(...new_elements);
		} else {
			const array_end = this._elements.slice(this.offset);
			this._elements = this._elements.slice(0, this.offset - 1).concat(new_elements, array_end);
			return this._elements.length;
		}
	}

	/**
	 * Removes an element from the back of the array
	 * @returns The item removed, if there was an item
	 */
	public pop(): T | undefined {
		let removed: T | undefined = undefined;

		if (this.offset % this._elements.length === 0) {
			removed = this._elements.pop();
		} else {
			removed = this._elements.splice((this.offset - 1) % this._elements.length, 1)[0];
		}

		if (this._elements.length === 0) {
			this.offset = 0;
		} else {
			this.reverse();
		}

		return removed;
	}

	/**
	 * Provides a copy of the array with the items sorted as they are currently
	 */
	public toArray(): T[] {
		return Array.from(this);
	}

	/**
	 * Clears the array and resets the offset
	 */
	public clear() {
		this._elements.length = 0;
		this.offset = 0;
	}

	/**
	 * Allows this to be iterated over.
	 *
	 * @warn If ${@link CircularArray.offset} is changed during operation, that will not affect the current iteration.
	 * @warn If the array is modified during operation, that may cause issues.
	 */
	*[Symbol.iterator]() {
		const reference_offset = this.offset;
		// `i` prevents the iterator from running forever
		for (let index = 0; index < this._elements.length; index++) {
			yield this._elements[(index + reference_offset) % this._elements.length];
		}
	}
}
