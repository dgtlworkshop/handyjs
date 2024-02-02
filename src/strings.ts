/**
 * Returns a hash code from a string
 * @param text The string to hash.
 * @return A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 * @see https://stackoverflow.com/a/8831937/4333246
 */
export function hashCode(text: string) {
	let hash = 0;
	const length = text.length;
	for (let i = 0; i < length; i++) {
		const chr = text.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}
