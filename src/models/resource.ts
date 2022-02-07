import { Author, Collection } from '.';
import { file } from '@/composables';
export default class Resource {
	public id?: number;
	public title?: string;
	public description?: string;
	public link?: string;
	public image?: File | ArrayBuffer | string;
	public imageFileName?: string;
	public imageFileType?: string;
	public createdDate?: Date;
	public updatedDate?: Date;
	public responsibleAuthor?: Author;
	public keywords?: Array<string>;
	public authors?: Array<Author>;
	public collections?: Array<Collection>;

	public constructor(resource?: Partial<Resource>) {
		Object.assign(this, resource);
	}

	public getName(): string {
		return this.title || '';
	}

	public async convertImageToByteArray(): Promise<void> {
		const { fileToBase64, base64ToByteArray } = file();
		if (this.image && this.image instanceof File) {
			const { image } = this;
			await fileToBase64(image).then((base64) => {
				const byteArray = base64ToByteArray(base64);
				this.image = byteArray;
			});
		}
	}

	public setImageProperties(): void {
		if (this.image && this.image instanceof File) {
			const { image, imageFileName, imageFileType } = this;
			this.imageFileName = imageFileName || image.name;
			this.imageFileType = imageFileType || image.type;
		}
	}

	public async setAndConvertImageToByte(): Promise<void> {
		this.setImageProperties();
		await this.convertImageToByteArray();
	}

	public async setAndConvertImageToBase64(): Promise<void> {
		this.setImageProperties();
		await this.convertImageToBase64();
	}

	public async setAndConvertImageToFile(): Promise<void> {
		await this.convertImageToFile();
		this.setImageProperties();
	}

	public async convertImageToFile(): Promise<void> {
		const { byteArrayToBase64, base64ToFile } = file();
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

	public async convertBase64ToFile(): Promise<void> {
		const { base64ToFile } = file();
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

	public async convertImageToBase64(): Promise<void> {
		if (this.image && this.image instanceof File) {
			const { image } = this;
			await image.arrayBuffer().then((arrayBuffer) => {
				this.image = Buffer.from(arrayBuffer).toString('base64');
			});
		}
	}
}
