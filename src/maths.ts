import type { iPositionedRectangle, iRectangle, iVector2 } from "./geometry.js";

/**
 * Interpolates between the start and end points based on {@link t} which is a value between `0` (start) and `1` (end). This does not clamp `t` so values outside of this range will be interpolated.
 * @param start Value when {@link t} === `0`
 * @param end Value when {@link t} === `1`
 * @param t Value between `0` and `1`
 * @returns The calculated value
 */
export function lerp(start: number, end: number, t: number) {
	return start * (1 - t) + end * t;
}

/**
 * Interpolates between the start and end points based on {@link t} which is a value between `0` ({@link start}) and `1` ({@link end}). This does clamps {@link t} so values will always be between the {@link start} and {@link end}.
 * @param start Value when {@link t} === `0`
 * @param end Value when {@link t} === `1`
 * @param t Value between `0` and `1`
 * @returns The calculated value
 */
export function clampedLerp(start: number, end: number, t: number) {
	// clamp
	t = t > 1 ? 1 : t < 0 ? 0 : t;
	// lerp
	return start * (1 - t) + end * t;
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
export function clamp(num: number, min: number, max: number) {
	return Math.min(Math.max(num, min), max);
}

export function getRandomPositionWithinRectangle(
	rectangle: Readonly<iRectangle> | Readonly<iPositionedRectangle>,
	integer = false,
) {
	const point = {
		x: Math.random() * rectangle.width + ("x" in rectangle ? rectangle.x : 0),
		y: Math.random() * rectangle.height + ("y" in rectangle ? rectangle.y : 0),
	} satisfies iVector2;

	if (integer) {
		point.x = Math.round(point.x);
		point.y = Math.round(point.y);
	}

	return point;
}

/**
 * Calculates the Least Common Multiple between two values. Can be expensive operation for large values.
 */
export function lcm(lhs: number, rhs: number) {
	const the_gcd = gcd(lhs, rhs);

	// Handle divide by zero
	return the_gcd != 0 ? (lhs * rhs) / the_gcd : 0;
}

/**
 * Calculates the Least Common Multiple accross multiple values. Can be expensive operation for large values.
 * @param elements Array of all values to calculate. Empty arrays return `0`.
 * @returns The least common multiple across all values.
 */
export function sequentialLeastCommonMultiple(elements: ReadonlyArray<number>): number {
	if (elements.length === 1) {
		return elements[0];
	} else if (elements.length === 2) {
		return lcm(elements[0], elements[1]);
	} else if (elements.length > 2) {
		let accumulate = lcm(elements[0], elements[1]);
		for (let i = 2; i < elements.length; i++) {
			accumulate = lcm(accumulate, elements[i]);
		}
		return accumulate;
	} else {
		return 0;
	}
}

/**
 * Calculates the greatest common denominator between two integers. Can be expensive operation for large values.
 */
export function gcd(lhs: number, rhs: number): number {
	lhs = Math.abs(lhs);
	rhs = Math.abs(rhs);

	// determine which side is larger, then perform logic
	if (rhs === lhs) {
		return rhs;
	} else if (rhs > lhs) {
		while (true) {
			if (lhs == 0) return rhs;
			rhs %= lhs;
			if (rhs == 0) return lhs;
			lhs %= rhs;
		}
	} else {
		while (true) {
			if (rhs == 0) return lhs;
			lhs %= rhs;
			if (lhs == 0) return rhs;
			rhs %= lhs;
		}
	}
}

/**
 * fmod for Javascript, will work with any ECMA-262 implementation.
 * If you need a precision higher than 8, set the {@link precision} parameter
 * https://cplusplus.com/reference/cmath/fmod/
 * @warn If there are more than 8 significant figures fmod will most likely fail if there are more than 8 significant figures
 * @param precision Number of significant digits. Must be in the range 1 - 21, inclusive. Default `8`.
 * @example
 * 1.05 % 0.05
 *   => 0.04999999999999999
 * fmod(1.05, 0.05)
 *   => 0
 * fmod(1.05, 0.019)
 *   => 0.005
 * fmod(1.00000012, 0.00000005)
 *   => 0.00000002
 * fmod(1000000.40, 0.07)
 *   => 0.07
 * fmod(10000000.40, 0.07)
 *   => 0.039999999
 */
export function fmod(numerator: number, denominator: number, precision = 8): number {
	return Number(
		(numerator - Math.floor(numerator / denominator) * denominator).toPrecision(precision),
	);
}

/**
 * Modulus operation. Unique from the remainder (`%`) operation with negative numbers.
 * @returns The result of {@link n} mod {@link d}.
 */
export function mod(n: number, d: number): number {
	return ((n % d) + d) % d;
}


/**
 * Transforms the {@link value} from one range to another, similar to [the `map()` function in Arduino](https://www.arduino.cc/reference/en/language/functions/math/map/).
 * @param value The number to map
 * @param from_low The lower bound of the {@link value}'s current range
 * @param from_high The upper bound of the {@link value}'s current range
 * @param to_low The lower bound of the mapped value's target range
 * @param to_high The upper bound of the mapped value's target range
 * @returns The mapped value
 */
export function mapRange(
	value: number,
	from_low: number,
	from_high: number,
	to_low: number,
	to_high: number,
) {
	return to_low + ((to_high - to_low) * (value - from_low)) / (from_high - from_low);
}