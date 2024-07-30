type Timeout = ReturnType<typeof setTimeout>;
type Callback<Args extends any[] = []> = (...args: Args) => void;

/**
 * Creates a timeout that can be reset with an additional callback.
 * @param start Calls this function when the timeout is set.
 * @param finish Calls this function when the timeout completes.
 * @param ms The default duration of the timeout.
 * @returns Returns the timeout's controls as a deconstructable object.
 */
export function resettable(start: () => void, finish: () => void, ms?: number) {
	let id: Timeout | undefined;
	let once: (() => void) | undefined;
	const default_ms = ms;
	/**
	 * Runs the end of the timeout.
	 */
	function run() {
		id = undefined!;
		finish();
		if (once) once();
		once = undefined;
	}
	/**
	 * Resets the timeout, immediately calling {@link start}.
	 * @param callback Runs once after {@link finish}.
	 * @param ms The duration of the timeout.
	 * @returns Returns the timeout ID.
	 */
	function reset(callback?: () => void, ms?: number): Timeout {
		clearTimeout(id);
		start();
		once = callback;
		id = setTimeout(run, ms ?? default_ms);
		return id;
	}
	/**
	 * Completes the timeout if it has not already completed, calling {@link finish}.
	 */
	function complete(): void {
		if (id === undefined) return;
		clearTimeout(id);
		run();
	}
	/**
	 * Clears the current timeout, ignoring any callbacks.
	 */
	function clear(): void {
		clearTimeout(id);
		once = undefined;
	}
	return { reset, complete, clear } as const;
}

/**
 * Creates a timeout that can be run repeatedly.
 * @param callback The function to call at the end of the timeout.
 * @param ms The default duration of the timeout.
 * @returns Returns the timeout's controls as a deconstructable object.
 */
export function repeatable<TArgs extends any[]>(callback: Callback<TArgs>, ms?: number) {
	let id: Timeout | undefined;
	const default_ms = ms;
	/**
	 * Clears the current timeout and starts a new one.
	 * @param ms The duration of the new timeout.
	 * @param args Arguments to pass when the callback is called.
	 * @returns Returns the new timeout's ID.
	 */
	function reset(ms?: number, ...args: TArgs): Timeout {
		clearTimeout(id);
		id = setTimeout(callback, ms ?? default_ms, ...args);
		setTimeout(callback, ms);
		return id;
	}
	/**
	 * Clears the current timeout.
	 */
	function clear(): void {
		clearTimeout(id);
		id = undefined;
	}
	return { reset, clear } as const;
}