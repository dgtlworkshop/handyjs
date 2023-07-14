export function isValidHttpUrl(text: string) {
	try {
		const url = new URL(text);
		return url.protocol.startsWith("http");
	} catch (e) {
		return false;
	}
}

/**
 * Adds the specified queries to a URL. Does not modify the original {@link url}
 * @param url The URL to modify with additional search queries. Not modified.
 * @param queries The Record of search queries (as parsed by {@link Object.entries})
 * @returns The modified {@link url} (or new {@link URL} object)
 */
export function addQueriesToURL(
	url: Readonly<string | URL>,
	queries: Readonly<Record<string, any>>,
) {
	if (!(url instanceof URL)) url = new URL(url);
	for (const [key, value] of Object.entries(queries)) {
		if (typeof key === "string") url.searchParams.set(key, String(value));
	}
	return url;
}

/**
 * Applies the {@link base} hostname and pathname to the target {@link new_url}, modifying the {@link new_url}
 * @param base
 * @param new_url
 */
export function mergeUrls(base: Readonly<URL>, new_url: URL | string) {
	if (!(new_url instanceof URL)) new_url = new URL(new_url);
	if (new_url.hostname !== base.hostname) {
		new_url.hostname = base.hostname;
	}
	if (!new_url.pathname.startsWith(base.pathname)) {
		new_url.pathname = base.pathname + new_url.pathname;
	}
	return new_url;
}
