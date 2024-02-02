export { CircularArray } from "./data-structures/CircularArray.js";

export function pickRandomFromArray<T>(array: ReadonlyArray<T>): T {
	return array[Math.floor(Math.random() * array.length)];
}

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
