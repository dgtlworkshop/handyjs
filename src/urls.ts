export function isValidHttpUrl(text: string) {
	try {
		const url = new URL(text);
		return url.protocol.startsWith("http");
	} catch (e) {
		return false;
	}
}
