import { ConsultList, Author, Pagination } from '@/models';
import { EventManagerAPIService } from '.';

export default class AuthorService {
	private baseEndpoint = 'authors';

	public async getMultiple(
		pagination?: Pagination,
		extraParams?: { [key: string]: unknown },
	): Promise<ConsultList<Author>> {
		const config = {
			params: {
				pagination,
			},
		};
		config.params = { ...config.params, ...extraParams };
		const response = await EventManagerAPIService.get<ConsultList<Author>>(
			this.baseEndpoint,
			config,
		);
		return response.data;
	}

	public async get(id: number): Promise<Author> {
		const response = await EventManagerAPIService.get<Author>(
			`${this.baseEndpoint}/${id}`,
		);
		return response.data;
	}

	public async post(resource: Author): Promise<Author> {
		const response = await EventManagerAPIService.post<Author>(
			this.baseEndpoint,
			resource,
		);
		return response.data;
	}

	public async put(resource: Author): Promise<Author> {
		const response = await EventManagerAPIService.put<Author>(
			this.baseEndpoint,
			resource,
		);
		return response.data;
	}

	public async delete(id: number): Promise<string> {
		const response = await EventManagerAPIService.delete<string>(
			`${this.baseEndpoint}/${id}`,
		);
		return response.data;
	}
}
