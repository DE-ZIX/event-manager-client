import Collection from './collection';

export default class Event extends Collection {
	public startDate?: Date;
	public endDate?: Date;

	public constructor(event?: Partial<Event>) {
		super(event);
		Object.assign(this, event);
	}
}
