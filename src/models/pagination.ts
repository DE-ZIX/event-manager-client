import { PageInformation } from '.';

export default class Pagination {
	public page = 0;
	public descending = false;
	public limit = 1000;
	public sortBy?: string;

	public constructor(
		pagination?: Partial<Pagination> | Partial<PageInformation>,
	) {
		if (pagination instanceof PageInformation) {
			this.descending = pagination.descending;
			this.page = pagination.page;
			this.sortBy = pagination.sortBy;
			this.limit = pagination.rowsPerPage;
		} else {
			Object.assign(this, pagination);
		}
	}

	public toPageRequest(): unknown {
		return {
			page: this.page,
			descending: this.descending,
			limit: this.limit,
			sortBy: this.sortBy,
		};
	}
}
