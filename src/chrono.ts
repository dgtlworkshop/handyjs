/**
 * Creates a promise that resolves once the specified timeout in {@link milliseconds} expires. Uses {@link setTimeout}.
 */
export function timeout(milliseconds: number) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Creates a promise that resolves at the next frame. Uses {@link requestAnimationFrame}.
 * @warn When used in NodeJS, this uses {@link timeout} instead due to a lack of {@link requestAnimationFrame}.
 */
export function frame() {
	if ("requestAnimationFrame" in globalThis) {
		return new Promise<DOMHighResTimeStamp>((resolve) => requestAnimationFrame(resolve));
	} else {
		return timeout(0.01667); // 1/60th of a second
	}
}

/**
 * Creates a debounce timer using {@link setTimeout}
 * @todo Create variant that uses the PIXI.Ticker
 */
export function debounce(callback: Function, timeout = 300) {
	let timer: ReturnType<typeof setTimeout>;
	const returns = (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(returns, args);
		}, timeout);
	};
	return returns;
}

/**
 * Stolen from https://stackoverflow.com/a/53652131
 * @param date Desired DateTime
 * @param ianatz Timezone string
 * @returns DateTime with the appropriate timezone
 */
export function changeTimezone(date: Date, ianatz: string) {
	// suppose the date is 12:00 UTC
	const target_timezone = new Date(
		date.toLocaleString("en-US", {
			timeZone: ianatz,
		}),
	);

	// then invdate will be 07:00 in Toronto
	// and the diff is 5 hours
	const diff = date.getTime() - target_timezone.getTime();

	// so 12:00 in Toronto is 17:00 UTC
	return new Date(date.getTime() - diff); // needs to substract
}

/**
 * @param date
 * @param ianatz Optional Timezone string, uses browser if unset
 * @returns DateTime with the appropriate timezone
 * @example
 * formatDateToMMMDDYY(undefined, new Date(2009, 10, 10)) -> "Nov 10"
 */
export function formatDateToMMMDD(date: Date, ianatz?: string) {
	return date.toLocaleString(ianatz, { month: "short", day: "numeric" });
}
/**
 * @param date
 * @param ianatz Optional Timezone string, uses browser if unset
 * @returns DateTime with the appropriate timezone
 * @example
 * formatDateToMMMDDYY(undefined, new Date(2009, 10, 10)) -> "Nov 10"
 */
export function formatDateToMMMDDYY(date: Date, ianatz?: string) {
	return `${formatDateToMMMDD(date, ianatz)} ${date.toLocaleString(ianatz, { year: "2-digit" })}`;
}
