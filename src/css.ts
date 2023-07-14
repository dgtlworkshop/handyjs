export function convertCssRecordToCss(record: Readonly<Record<string, string>>) {
	let css_string = "";
	for (const [rule, value] of Object.entries(record)) {
		css_string += `${rule}: ${value}; `;
	}
	return css_string.endsWith(" ") ? css_string.substring(0, css_string.length - 1) : css_string;
}
