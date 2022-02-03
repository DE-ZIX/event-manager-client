import { Author } from '.';

export default class Resource {
	public id?: number;
	public title?: string;
	public description?: string;
	public link?: string;
	public image?: File;
	public createdDate?: Date;
	public updatedDate?: Date;
	public responsibleAuthor?: Author;
	public keywords?: Array<string>;
	public authors?: Array<Author>;
	public collections?: Array<string>;

	public constructor(resource?: Partial<Resource>) {
		Object.assign(this, resource);
	}

	public getName(): string {
		return this.title || '';
	}
}
