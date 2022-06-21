import { Resource } from '.';
import { file } from '@/composables';
export default class Collection {
	public id?: number;
	public title?: string;
	public image?: File | string;
	public imageFileName?: string;
	public imageFileType?: string;
	public description?: string;
	public resources?: Array<Resource>;

	public constructor(collection?: Partial<Collection>) {
		Object.assign(this, collection);
	}

	public getName(): string {
		return this.title || '';
	}

	public async setAndConvertImageToFile(): Promise<void> {
		await this.convertImageToFile();
		this.setImageProperties();
	}

	public async setAndConvertImageToBase64(): Promise<void> {
		this.setImageProperties();
		await this.convertImageToBase64();
	}

	public setImageProperties(): void {
		if (this.image && this.image instanceof File) {
			const { image, imageFileName, imageFileType } = this;
			this.imageFileName = imageFileName || image.name;
			this.imageFileType = imageFileType || image.type;
		}
	}

	public async convertImageToBase64(): Promise<void> {
		if (this.image && this.image instanceof File) {
			const { image } = this;
			await image.arrayBuffer().then((arrayBuffer) => {
				this.image = Buffer.from(arrayBuffer).toString('base64');
			});
		}
	}

	public async convertBase64ToFile(): Promise<void> {
		const { base64ToFile } = file;
		if (this.image && typeof this.image === 'string') {
			const { image } = this;
			await base64ToFile(
				image + '',
				this.imageFileName || '',
				this.imageFileType || '',
			).then((file) => {
				this.image = file;
			});
		}
	}

	public async convertImageToFile(): Promise<void> {
		const { byteArrayToBase64, base64ToFile } = file;
		if (this.image && this.image instanceof ArrayBuffer) {
			const { image } = this;
			const base64 = byteArrayToBase64(image);
			base64ToFile(
				base64,
				this.imageFileName || '',
				this.imageFileType || '',
			).then((file) => (this.image = file));
		} else if (this.image && typeof this.image === 'string') {
			await this.convertBase64ToFile();
		}
	}
}
