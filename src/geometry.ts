export interface iRectangle {
	width: number;
	height: number;
}

export interface iVector2 {
	x: number;
	y: number;
}

export type iPositionedRectangle = iVector2 & iRectangle;

export interface iBox {
	top: number;
	left: number;
	bottom: number;
	right: number;
}

/**
 * Object will be scaled to fit in the container
 */
export interface FitContain {
	mode: "CONTAIN";
	position?: FitPosition;
}
/**
 * Where should this object be aligned to within its container
 */
export interface FitPosition {
	/**
	 * Where should this object be anchored along the X axis. `0` is left, `0.5` is center, and `1` is right.
	 */
	x?: number;
	/**
	 * Where should this object be anchored along the Y axis. `0` is top, `0.5` is center, and `1` is bottom.
	 */
	y?: number;
}
/**
 * Object will be scaled to fit in the container, then tiled to fill the container
 */
export interface FitContainTiled {
	mode: "CONTAIN_TILED";
	position?: FitPosition;
}
/**
 * Object will be scaled to cover the container
 */
export interface FitCover {
	mode: "COVER";
	position?: FitPosition;
}
/**
 * Object will not be scaled
 */
export interface FitNone {
	mode: "NONE";
	position?: FitPosition;
}
/**
 * Object will not be scaled, then tiled to fill the container
 */
export interface FitNoneTiled {
	mode: "NONE_TILED";
	position?: FitPosition;
}
/**
 * Object will be stretched to fill
 */
export interface Fill {
	mode: "FILL";
}

export type Fit = FitContain | FitContainTiled | FitCover | FitNone | FitNoneTiled | Fill;

/**
 * @param inner Top left aligned rectangle-alike
 * @param outer  Top left aligned positioning instructions
 */
export function centerRectangleWithinRectangle(
	inner: Readonly<{ position: iVector2 } & iRectangle>,
	outer: Readonly<Partial<iPositionedRectangle>>,
) {
	if (Number.isFinite(outer.width)) {
		inner.position.x = Math.round((outer.width as number) / 2 - inner.width / 2) + (outer.x ?? 0);
	} else if (Number.isFinite(outer.x)) {
		inner.position.x = outer.x!;
	}

	if (Number.isFinite(outer.height)) {
		inner.position.y = Math.round((outer.height as number) / 2 - inner.height / 2) + (outer.y ?? 0);
	} else if (Number.isFinite(outer.y)) {
		inner.position.y = outer.y!;
	}
}

/**
 * Returns the parameters to scale the {@link inner} rectangle to completely fill the {@link outer} rectangle
 */
export function scaleToFillRectangleWithinRectangle(
	inner: Readonly<iRectangle>,
	outer: Readonly<iRectangle>,
) {
	const ratioWidth = outer.width / inner.width;
	const ratioHeight = outer.height / inner.height;

	if (ratioWidth < ratioHeight) {
		return {
			width: inner.width * ratioHeight,
			height: inner.height * ratioHeight,
			ratio: ratioHeight,
		};
	} else {
		return {
			width: inner.width * ratioWidth,
			height: inner.height * ratioWidth,
			ratio: ratioWidth,
		};
	}
}

/**
 * Returns the parameters to scale the {@link inner} rectangle to seamlessly fit within the {@link outer} rectangle
 */
export function scaleToFitRectangleWithinRectangle(
	inner: Readonly<iRectangle>,
	outer: Readonly<iRectangle>,
) {
	const ratio_width = outer.width / inner.width;
	const ratio_height = outer.height / inner.height;

	if (ratio_width > ratio_height) {
		return {
			width: inner.width * ratio_height,
			height: inner.height * ratio_height,
			ratio: ratio_height,
			ratio_width,
			ratio_height,
		};
	} else {
		return {
			width: inner.width * ratio_width,
			height: inner.height * ratio_width,
			ratio: ratio_width,
			ratio_width,
			ratio_height,
		};
	}
}

export function getRandomPositionWithinRectangle(
	rectangle: Readonly<iRectangle> | Readonly<iPositionedRectangle>,
	integer = false,
) {
	const point = {
		x: Math.random() * rectangle.width + ((rectangle as iPositionedRectangle).x ?? 0),
		y: Math.random() * rectangle.height + ((rectangle as iPositionedRectangle).y ?? 0),
	} satisfies iVector2;

	if (integer) {
		point.x = Math.round(point.x);
		point.y = Math.round(point.y);
	}

	return point;
}
