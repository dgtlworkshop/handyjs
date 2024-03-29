/**
 * HACK: from https://github.com/webpack/webpack/discussions/14648#discussioncomment-1589272
 * 
 * @example
 * import { CorsWorker as Worker } from "@dgtlworkshop/handyjs";

	// aliasing CorsWorker to Worker makes it statically analyzable
	const cors_worker = new Worker(new URL("../worker.js", import.meta.url));
	// tada!
	const worker: Worker["worker"] = cors_worker.worker;
 */
export class CorsWorker {
	public readonly worker: Worker;

	constructor(url: string | URL) {
		const object_url = URL.createObjectURL(
			new Blob([`importScripts(${JSON.stringify(url.toString())});`], {
				type: "application/javascript",
			}),
		);
		this.worker = new Worker(object_url);
		URL.revokeObjectURL(object_url);
	}
}
