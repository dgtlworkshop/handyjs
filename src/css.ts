export function convertCssRecordToCss(record: Readonly<Record<string, string>>) {
	let css_string = "";
	for (const [rule, value] of Object.entries(record)) {
		css_string += `${rule}: ${value}; `;
	}
	return css_string.endsWith(" ") ? css_string.substring(0, css_string.length - 1) : css_string;
}

/**
 * Cleans the font name so it can be loaded into the HTML document.
 * - Spaces, underscores, colons, punctuation, and other special characters
 * - If the name starts with a digit, the letter `A` is inserted in front are removed
 *
 * @returns The cleaned font name that can be used in CSS
 * @todo This should clean all non-ISO-10646 characters
 */
export function cleanFontName(font_name: string) {
	// remove disallowed characters
	const cleaned_key = font_name.replace(/[\W_:.,!?'"\[\]\\|/()@#$%^&*+=`~]+/g, "");
	// does the font start with a digit?
	if (cleaned_key.match(/^\d/)) {
		return `A${cleaned_key}`;
	}
	return cleaned_key;
}
