import type { DeepReadonly } from "./data-structures.js";

/**
 * Creates a promise that resolves once the specified timeout in {@link milliseconds} expires. Uses {@link setTimeout}.
 */
export function timeout(milliseconds: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Creates a promise that resolves at the next frame. Uses {@link requestAnimationFrame}.
 * @warn When used in NodeJS, this uses {@link timeout} with 1/60th of a second instead due to a lack of {@link requestAnimationFrame}.
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

/**
 * Separates a time in milliseconds into discrete time elements
 * @param total_milliseconds A time in milliseconds
 */
export function formatMilliseconds(total_milliseconds: number) {
	const milliseconds = Math.floor(total_milliseconds % 1000);
	const seconds = Math.floor((total_milliseconds / 1000) % 60);
	const minutes = Math.floor((total_milliseconds / 1000 / 60) % 60);
	const hours = Math.floor((total_milliseconds / 1000 / 60 / 60) % 24);
	return { milliseconds, seconds, minutes, hours };
}

/**
 * Takes the output of {@link formatMilliseconds} and transforms it into an english description of a duration
 * @returns `XXhours YYmins ZZsec`
 */
export function formatTimeText({
	hours,
	minutes,
	seconds,
}: DeepReadonly<ReturnType<typeof formatMilliseconds>>) {
	let str = new Array<string>();
	if (hours > 0) {
		str.push(`${hours}${hours === 1 ? "hr" : "hrs"}`);
	}
	if (minutes > 0) {
		str.push(`${minutes}${minutes === 1 ? "min" : "mins"}`);
	}
	if (seconds > 0) {
		str.push(`${seconds}sec`);
	}
	return str.join(" ");
}

export function formatTimeTextFixed(
	{ hours, minutes, seconds }: ReturnType<typeof formatMilliseconds>,
	length: 1 | 2 | 3,
) {
	let str = new Array<string>();
	if (hours > 0 || length === 3) {
		if (length >= 1) {
			str.push(`${String(hours).padStart(2, "0")}${hours === 1 ? "hr " : "hrs"}`);
			length--;
		}
	}
	if (minutes > 0 || length >= 2) {
		if (length >= 1) {
			str.push(`${String(minutes).padStart(2, "0")}${minutes === 1 ? "min " : "mins"}`);
			length--;
		}
	}
	if (seconds > 0 || length >= 1) {
		if (length >= 1) {
			str.push(`${String(seconds).padStart(2, "0")}sec`);
			length--;
		}
	}
	return str.join(" ");
}

/**
 * Formats a duration in seconds to a `:` colon seperated timestamp
 * @param time_seconds Duration in seconds
 * @returns `HH:MM:SS:MSMS`
 */
export function formatTimestampFromSeconds(
	time_seconds: number,
	{ show_ms = true }: { show_ms?: boolean } = {},
) {
	const { hours, minutes, seconds, milliseconds } = formatMilliseconds(time_seconds * 1000);
	const segments = new Array<string>();
	if (hours) segments.push(String(hours).padStart(2, "0"));
	if (hours || minutes) segments.push(String(minutes).padStart(2, "0"));
	if (hours || minutes || seconds) segments.push(String(seconds).padStart(2, "0"));
	if (show_ms && (hours || minutes || seconds || milliseconds))
		segments.push(String(milliseconds).padStart(4, "0"));
	return segments.join(":") as
		| `${number}`
		| `${number}:${number}`
		| `${number}:${number}:${number}`
		| `${number}:${number}:${number}:${number}`;
}
