import { Resource } from '.';

export default class Collection {
	public id?: number;
	public title?: string;
	public image?: File;
	public description?: string;
	public resources?: Array<Resource>;

	public constructor(collection?: Partial<Collection>) {
		Object.assign(this, collection);
	}
}
