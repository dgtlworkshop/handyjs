/**
 * Returns if the provided {@link test_url} is a valid, fully qualified URL with an HTTP protocol
 * @param test_url The url string to test
 */
export function isValidHttpUrl(test_url: URL | string | undefined): boolean {
	if (!test_url) return false;
	try {
		const url = new URL(test_url);
		return url.protocol.startsWith("http");
	} catch (e) {
		return false;
	}
}

/**
 * If the provided {@link test_url} is a valid, fully qualified URL with an HTTP protocol, returns the URL. Otherwise returns null.
 * @param test_url The url string to test
 */
export function tryGetHttpUrl(test_url: URL | string | undefined): URL | null {
	if (!test_url) return null;
	try {
		const url = new URL(test_url);
		return url.protocol.startsWith("http") ? url : null;
	} catch (e) {
		return null;
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
 * Applies the {@link base} hostname and _base_ path to the target {@link new_url}, modifying the {@link new_url}
 * @param base The url to take the hostname and path from
 * @param new_url The url to modify and apply the hostname and _base_ path
 * @returns The modified {@link new_url} (or new {@link URL} object)
 */
export function mergeUrls(base: Readonly<URL>, new_url: URL | string) {
	if (!(new_url instanceof URL)) new_url = new URL(new_url);
	if (new_url.hostname !== base.hostname) {
		new_url.hostname = base.hostname;
	}
	if (!new_url.pathname.startsWith(base.pathname)) {
		// Prevent double slashes in url
		if (base.pathname.endsWith("/")) {
			new_url.pathname = base.pathname.slice(0, -1) + new_url.pathname;
		} else {
			new_url.pathname = base.pathname + new_url.pathname;
		}
	}
	return new_url;
}
