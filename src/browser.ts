/**
 * This module should only be imported in the Browser
 */

/**
 * Saves the {@link data} Blob to the user's device
 * @warn This file should only be imported in the browser
 * @param filename The filename to present in the save dialog
 * @param type The MIME Type of the data
 * @param data The data to save
 */
export function downloadFileFromBlob(filename: string, type: string, data: BlobPart) {
	const a = document.createElement("a");
	const url = window.URL.createObjectURL(new Blob([data], { type: type }));
	a.href = url;
	a.download = filename;
	document.body.append(a);
	a.click();
	window.URL.revokeObjectURL(url);
	a.remove();
}

/**
 * Determines if the Webcam can be accessed on the user's browser
 */
// export async function detectWebcam() {
// 	try {
// 		// const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// 		// stream.getTracks().forEach((track) => track.stop());
// 		return true;
// 	} catch (error) {
// 		if (error instanceof DOMException) {
// 			if (error.message.includes("not allowed") || error.message.includes("denied") || error.message.includes("videoinput failed")) {
// 				return false;
// 			} else {
// 				console.warn(error);
// 				return true;
// 			}
// 		} else {
// 			console.warn(error);
// 			return false;
// 		}
// 	}
// }
