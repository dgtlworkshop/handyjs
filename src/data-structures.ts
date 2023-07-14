export { CircularArray } from "./data-structures/CircularArray.js";

export function pickRandomFromArray<T>(array: ReadonlyArray<T>): T {
	return array[Math.floor(Math.random() * array.length)];
}
