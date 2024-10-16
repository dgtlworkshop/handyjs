export { CircularArray } from "./data-structures/CircularArray.js";
export { ExecutionPool, type ExecutionTask } from "./data-structures/ExecutionPool.js";

export function pickRandomFromArray<T>(array: ReadonlyArray<T>): T {
	return array[Math.floor(Math.random() * array.length)];
}

/**
 * Marks every property of a type as readonly. Helpful for indicating immutability, but not perfect.
 */
export type DeepReadonly<T> = T extends (infer R)[]
	? DeepReadonlyArray<R>
	: T extends Function
	? T
	: T extends object
	? DeepReadonlyObject<T>
	: T;

export interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

export type DeepReadonlyObject<T> = {
	readonly [P in keyof T]: DeepReadonly<T[P]>;
};

/**
 * Shuffles the {@link array} in place
 * @see https://stackoverflow.com/a/12646864/4333246
 * @param array Array to shuffle (mutates)
 */
export function shuffleArray<TArray>(array: Array<TArray>) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

/**
 * Behaves similarly to Python's `range()` generator function
 * @see https://docs.python.org/3/library/functions.html#func-range
 * @param start Start of the range. If this is the only parameter, {@link start} becomes `0` and {@link stop} becomes what {@link start} was provided
 * @param stop If omitted, {@link start} becomes the new {@link stop} [0...stop]
 * @param step Increment amount, default `1`
 * @example
 * for(const num of range(5)) {
 * 	console.debug(num);
 * }
 * => 0, 1, 2, 3, 4
 * for(const num of range(5)) {
 * 	console.debug(num);
 * }
 * => 0, 1, 2, 3, 4
 */
export function* range(start: number, stop = start, step = 1): Generator<number> {
	if (stop === start) {
		start = 0;
	}
	// Idiot check
	if ((start > stop && step > 1) || (start < stop && step < 1) || step === 0) {
		throw new RangeError(`Range step ${step} will complete range from ${start} to ${stop}`, {
			cause: step,
		});
	}

	if (step > 0) {
		for (let i = start; i < stop; i += step) {
			yield i;
		}
	} else {
		for (let i = start; i > stop; i += step) {
			yield i;
		}
	}
}
