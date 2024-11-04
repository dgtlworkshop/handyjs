/**
 * Executes Promises with the specified maximum {@link concurrency}. Use {@link pushTask} to add tasks and {@link run} to start execution.
 *
 * Adapted from https://antoinevastel.com/nodejs/2022/02/26/task-pool-no-deps-nodejs.html, slightly reworked with TypeScript typing.
 */
export class ExecutionPool<TReturn = any> {
	/**
	 * Maximum number of tasks to execute at any given time during {@link run}.
	 */
	public concurrency;
	private tasks = new Array<ExecutionTask<TReturn>>();

	constructor(concurrency: number) {
		this.concurrency = concurrency;
	}

	public get length() {
		return this.tasks.length;
	}

	/**
	 * Adds a task to the list to be executed once {@link run} is called.
	 * @param task
	 */
	public pushTask(task: ExecutionTask<TReturn>) {
		this.tasks.push(task);
	}

	/**
	 * Clears all tasks from the list of tasks to execute. This is automatically called at the start of {@link run}.
	 */
	public clear() {
		this.tasks.length = 0;
	}

	private async executeTasks(iterator: ArrayIterator<[number, ExecutionTask<TReturn>]>) {
		const results = new Array<TReturn>();
		// Leverage a shared iterator to control the maximum concurrency
		// https://stackoverflow.com/questions/40639432/what-is-the-best-way-to-limit-concurrency-when-using-es6s-promise-all
		for (let [_, task] of iterator) {
			try {
				// Run the task and await for it
				const result = await task.run();
				try {
					// If it's successful, we call a callback function onSuccess.
					// This function can be used for example to save the result to a database,
					// print something, or do nothing if not needed.
					await task.onSuccess(result);
					results.push(result);
				} catch (e) {
					await task.onError(result);
				}
			} catch (e) {
				task.onError(e);
			}
		}
		return results;
	}

	/**
	 * Clears the list of tasks and begins execution. Any tasks added this is called via {@link pushTask} will not be executed.
	 * @returns The results of the tasks. If a task failed, the array item will be `undefined`.
	 */
	async run() {
		// Copy tasks into an iterator, clearing the stored tasks.
		const iterator = new Array(...this.tasks).entries();
		this.tasks.length = 0;
		// For each concurrency, run 'executeTasks' until iterator is complete.
		// Tasks are consumed by progressing the shared iterator.
		const promises = new Array<typeof iterator>(this.concurrency)
			.fill(iterator)
			.map(this.executeTasks);
		const results = await Promise.allSettled(promises);
		// Unpack the results.
		return results.flatMap((result) => (result.status === "fulfilled" ? result.value : undefined));
	}
}

export interface ExecutionTask<TReturn> {
	/** Generate the Promise to execute */
	run: () => Promise<TReturn>;
	/** Called on completion */
	onSuccess: (result: TReturn) => unknown | Promise<unknown>;
	/** Called on error */
	onError: (err: unknown) => unknown | Promise<unknown>;
}
