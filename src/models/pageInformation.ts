export default class PageInformation {
	page = 1;
	descending = true;
	sortBy = 'id';
	rowsPerPage = 5;
	rowsNumber = 0;

	public constructor(pageInformation?: Partial<PageInformation>) {
		Object.assign(this, pageInformation);
	}
}
