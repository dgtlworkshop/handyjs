/**
 * HACK: from https://github.com/webpack/webpack/discussions/14648#discussioncomment-1589272
 * 
 * @example
 * import { CorsWorker as Worker } from './cors-worker.js';

	// aliasing CorsWorker to Worker makes it statically analyzable
	const corsWorker = new Worker(new URL('../worker', import.meta.url));
	// tada!
	const worker: Worker["worker"] = corsWorker.worker;
 */
export class CorsWorker {
	public readonly worker: Worker;

	constructor(url: string | URL) {
		const objectURL = URL.createObjectURL(
			new Blob([`importScripts(${JSON.stringify(url.toString())});`], {
				type: "application/javascript",
			}),
		);
		this.worker = new Worker(objectURL);
		URL.revokeObjectURL(objectURL);
	}
}
