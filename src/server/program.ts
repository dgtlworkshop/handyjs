import { realpathSync } from "node:fs";
import { dirname } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

/**
 * Stolen from https://stackoverflow.com/a/71925565/4333246
 * @example
 * import { Program } from "@dgtlworkshop/handyjs/server"
 *
 * if(Program.isMain(import.meta.url)) {
 * 	console.info("Hello World");
 * }
 * @param import_meta_url This argument must always be `import.meta.url`
 * @returns Is {@link import_meta_url} the "main" script of this execution? (ex: user ran `node ./yourfile.js`)
 */
export function isMain(import_meta_url: ImportMeta["url"]) {
	// We use realpathSync to resolve symlinks, as cli scripts will often be executed from symlinks in the `node_modules/.bin`-folder
	const real_path = realpathSync(process.argv[1]);

	// Convert the file-path to a file-url before comparing it
	const real_path_as_url = pathToFileURL(real_path).href;

	return import_meta_url === real_path_as_url;
}

/**
 * Reimplements the classic Node.js `__filename` and `__dirname` using `import.meta.url`
 * @param import_meta_url This argument must always be `import.meta.url`
 */
export function getDirname(import_meta_url: ImportMeta["url"]) {
	const __filename = fileURLToPath(import_meta_url);
	const __dirname = dirname(__filename);
	return { __filename, __dirname };
}
