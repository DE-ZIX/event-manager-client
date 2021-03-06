export function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			resolve(reader.result as string);
		};
		reader.onerror = function (error) {
			reject(error);
		};
	});
}

export function base64ToByteArray(base64: string): ArrayBufferLike {
	//const raw = Buffer.from(base64, 'base64');
	const raw = Buffer.from(base64, 'base64').toString();
	const rawLength = raw.length;
	const bytes = new Uint8Array(rawLength);
	for (let i = 0; i < rawLength; i++) {
		bytes[i] = raw.charCodeAt(i);
	}
	return bytes.buffer;
}

export function byteArrayToBase64(byteArray: ArrayBuffer): string {
	const raw = Buffer.from(byteArray);
	return raw.toString('base64');
}

export async function urlToFile(
	url: string,
	filename: string,
	mimeType: string,
): Promise<File> {
	const res = await fetch(url);
	const buf = await res.arrayBuffer();
	return new File([buf], filename, { type: mimeType });
}

export function base64ToFile(
	base64: string,
	fileName: string,
	fileType: string,
): Promise<File> {
	return urlToFile(`data:text/plain;base64,${base64}`, fileName, fileType);
}
