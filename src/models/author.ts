import { Resource } from '.';

export default class Author {
	public id?: number;
	public name?: string;
	public surname?: string;
	public email?: string;
	public orcid?: string;
	public resources?: Array<Resource>;
	public constructor(author?: Author);
	public constructor(author?: Partial<Author>) {
		Object.assign(this, author);
	}
}
