/**
 * Identifies that this `number` should behave like an **RGB** hexadecimal color.
 * The alpha component should be treated as an additional number.
 *
 * This follows PIXI's color handling system: https://pixijs.download/v5.3.7/docs/PIXI.utils.html#.hex2rgb
 *
 * @example
 * const black: ColorInteger = 0x000000;
 * const red: ColorInteger = 0xFF0000;
 */
export type ColorInteger = number;

export interface RGB {
	/** Whole number between 0...255 (inclusive) */
	r: number;
	/** Whole number between 0...255 (inclusive) */
	g: number;
	/** Whole number between 0...255 (inclusive) */
	b: number;
}

export interface RGBA extends RGB {
	/** Whole number between 0...255 */
	a: number;
}

export interface HSL {
	/** Floating point number between 0...1 (inclusive) */
	h: number;
	/** Floating point number between 0...1 (inclusive) */
	s: number;
	/** Floating point number between 0...1 (inclusive) */
	l: number;
}

/**
 * @param hex_string Hexadecimal string formatted like `0xAAFF00`
 * @returns The numerical representation of it
 */
export function hexStringToNumber(hex_string: string): ColorInteger {
	return parseInt(hex_string, 16);
}

/**
 * Converts an alpha number from `0` to `255` (`0x00` to `0xFF`) to a floating point `0.0` to `1.0` range
 * @param alpha_255 Number from `0` to `255`
 * @returns Number from `0.0` to `1.0`
 */
export function reduceAlphaRangeToFloat(alpha_255: number) {
	if (alpha_255 < 0) return 0.0;
	else if (alpha_255 > 255) return 1.0;

	return alpha_255 / 255;
}

/**
 * Converts a `0x`-prefixed string to a CSS style `#`-prefixed string
 * @see {@link hashStringToHexString} For the opposite
 * @param hex_string A string formatted like `0xAAFF00`
 * @returns A string formatted like `#AAFF00`
 */
export function hexStringToHashString(hex_string: string) {
	if (/^0x([0-9a-f]*)$/i.test(hex_string)) {
		return `#${hex_string.slice(2)}`;
	} else {
		return undefined;
	}
}

/**
 * Converts a CSS style `#`-prefixed string to a `0x`-prefixed string
 * @see {@link hexStringToHashString} For the opposite
 * @param hash_string A color string formatted like `#AAFF00`
 * @returns A color string formatted like `0xAAFF00` or undefined if invalid
 */
export function hashStringToHexString(hash_string: string) {
	if (/^#([0-9a-f]*)$/i.test(hash_string)) {
		return `0x${hash_string.slice(1)}`.toUpperCase();
	} else {
		return undefined;
	}
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param h The hue
 * @param s The saturation
 * @param l The lightness
 * @return The RGB representation
 */
export function hslToRgb(h: number, s: number, l: number) {
	let r: number, g: number, b: number;

	if (s == 0) {
		r = g = b = l; // achromatic
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;

		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return { r, g, b } satisfies RGB;
}

function hue2rgb(p: number, q: number, t: number): number {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
}

/**
 * Converts a number to a hexidecimal string starting with a hash (ex `#AAFF00`)
 * @param num The number to convert
 * @param padding The minimum length of the string. Use `6` for a CSS hash string
 * @returns Hexadecimal string starting with a hash (ex `"#AAFF00"`)
 */
export function numberToHashString(num: number, padding: number) {
	let hex = Number(num).toString(16);

	while (hex.length < padding) {
		hex = "0" + hex;
	}

	return "#" + hex;
}

/**
 * Linearly transitions from one RGB color to the other
 * @param start Minimum color
 * @param end Maximum Color
 * @param t 0...1
 * @returns Interpolated color
 */
export function lerpRGB(start: Readonly<RGB>, end: Readonly<RGB>, t: number) {
	return {
		r: start.r + (end.r - start.r) * t,
		g: start.g + (end.g - start.g) * t,
		b: start.b + (end.b - start.b) * t,
	} satisfies RGB;
}

/**
 * Separates an RGB integer into its red, green, and blue parts.
 * @param hex_rgb The RGB integer (ex: `0xFF0000` is red)
 */
export function rgbHexToParts(hex_rgb: ColorInteger) {
	return {
		r: (hex_rgb >> 16) & 0xff,
		g: (hex_rgb >> 8) & 0xff,
		b: hex_rgb & 0xff,
	} satisfies RGB;
}
