import { ConsultList, Class, Pagination, Resource } from '@/models';
import { EventManagerAPIService } from '.';

export default class ClassService {
	private baseEndpoint = 'classes';

	public async getMultiple(
		pagination?: Pagination,
		extraParams?: { [key: string]: unknown },
	): Promise<ConsultList<Class>> {
		const config = {
			params: {
				pagination,
			},
		};
		config.params = { ...config.params, ...extraParams };
		const response = await EventManagerAPIService.get<ConsultList<Class>>(
			this.baseEndpoint,
			config,
		);
		return response.data;
	}

	public async getResources(
		id: number,
		pagination?: Pagination,
	): Promise<ConsultList<Resource>> {
		const config = {
			params: {
				pagination,
			},
		};
		const response = await EventManagerAPIService.get<ConsultList<Resource>>(
			`${this.baseEndpoint}/${id}/resources`,
			config,
		);
		return response.data;
	}

	public async addResource(id: number, resourceId: number): Promise<Class> {
		const response = await EventManagerAPIService.get<Class>(
			`${this.baseEndpoint}/${id}/${resourceId}`,
		);
		return response.data;
	}

	public async unlink(id: number, resourceId: number): Promise<string> {
		const response = await EventManagerAPIService.delete<string>(
			`${this.baseEndpoint}/${id}/${resourceId}/remove`,
		);
		return response.data;
	}

	public async get(id: number): Promise<Class> {
		const response = await EventManagerAPIService.get<Class>(
			`${this.baseEndpoint}/${id}`,
		);
		const data = new Class(response.data);
		return data.setAndConvertImageToFile().then(() => {
			return data;
		});
	}

	public async post(classIn: Class): Promise<Class> {
		const converted = new Class({ ...classIn });
		return converted.setAndConvertImageToBase64().then(async () => {
			const response = await EventManagerAPIService.post<Class>(
				this.baseEndpoint,
				converted,
			);
			const data = new Class(response.data);
			return data.setAndConvertImageToFile().then(async () => {
				return data;
			});
		});
	}

	public async put(classIn: Class): Promise<Class> {
		const converted = new Class({ ...classIn });
		return converted.setAndConvertImageToBase64().then(async () => {
			const response = await EventManagerAPIService.put<Class>(
				this.baseEndpoint,
				converted,
			);
			const data = new Class(response.data);
			return data.setAndConvertImageToFile().then(async () => {
				return data;
			});
		});
	}

	public async delete(id: number): Promise<string> {
		const response = await EventManagerAPIService.delete<string>(
			`${this.baseEndpoint}/${id}`,
		);
		return response.data;
	}
}
