import { ConsultList, Class, Pagination } from '@/models';
import { EventManagerAPIService } from '.';

export default class ClassService {
	private baseEndpoint = 'classes';

	public async getMultiple(
		pagination?: Pagination,
	): Promise<ConsultList<Class>> {
		const config = {
			params: {
				pagination,
			},
		};
		const response = await EventManagerAPIService.get<ConsultList<Class>>(
			this.baseEndpoint,
			config,
		);
		return response.data;
	}

	public async get(id: number): Promise<Class> {
		const response = await EventManagerAPIService.get<Class>(
			`${this.baseEndpoint}/${id}`,
		);
		return response.data;
	}

	public async post(classIn: Class): Promise<Class> {
		const response = await EventManagerAPIService.post<Class>(
			this.baseEndpoint,
			classIn,
		);
		return response.data;
	}

	public async put(classIn: Class): Promise<Class> {
		const response = await EventManagerAPIService.put<Class>(
			this.baseEndpoint,
			classIn,
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
