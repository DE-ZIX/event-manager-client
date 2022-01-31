import Collection from './collection';

export default class Class extends Collection {
	public updatedDate?: Date;

	public constructor(classIn?: Partial<Class>) {
		super(classIn);
		Object.assign(this, classIn);
	}
}
