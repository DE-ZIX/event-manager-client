import { ConsultListMetadata, Class, Author, Resource, Event } from '.';
export default class ConsultList {
	public metadata?: ConsultListMetadata;
	public items?: Array<Class | Event | Author | Resource>;

	public constructor(consultList?: ConsultList);
	public constructor(consultList?: Partial<ConsultList>) {
		Object.assign(this, consultList);
	}
}
