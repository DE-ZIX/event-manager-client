import { ConsultListMetadata } from '.';
export default class ConsultList<T> {
	public metadata?: ConsultListMetadata;
	public items?: Array<T>;

	public constructor(consultList?: ConsultList<T>);
	public constructor(consultList?: Partial<ConsultList<T>>) {
		Object.assign(this, consultList);
	}
}
