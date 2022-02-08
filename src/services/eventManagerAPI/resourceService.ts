import { ConsultList, Resource, Pagination } from '@/models';
import { EventManagerAPIService } from '.';

export default class ResourceService {
	private baseEndpoint = 'resources';

	public async getMultiple(
		pagination?: Pagination,
		extraParams?: { [key: string]: unknown },
	): Promise<ConsultList<Resource>> {
		const config = {
			params: {
				pagination,
			},
		};
		config.params = { ...config.params, ...extraParams };
		const response = await EventManagerAPIService.get<ConsultList<Resource>>(
			this.baseEndpoint,
			config,
		);
		return response.data;
	}

	public async get(id: number): Promise<Resource> {
		const response = await EventManagerAPIService.get<Resource>(
			`${this.baseEndpoint}/${id}`,
		);
		const data = new Resource(response.data);
		return data.setAndConvertImageToFile().then(() => {
			return data;
		});
	}

	public async unlink(
		id: number,
		collectionId: number,
		entity: string,
	): Promise<string> {
		const response = await EventManagerAPIService.delete<string>(
			`${entity}/${id}/${collectionId}/remove`,
		);
		return response.data;
	}

	public async post(resource: Resource): Promise<Resource> {
		const converted = new Resource({ ...resource });
		return converted.setAndConvertImageToBase64().then(async () => {
			const response = await EventManagerAPIService.post<Resource>(
				this.baseEndpoint,
				converted,
			);
			const data = new Resource(response.data);
			return data.setAndConvertImageToFile().then(async () => {
				return data;
			});
		});
	}

	public async put(resource: Resource): Promise<Resource> {
		const converted = new Resource({ ...resource });
		return converted.setAndConvertImageToBase64().then(async () => {
			const response = await EventManagerAPIService.put<Resource>(
				this.baseEndpoint,
				converted,
			);
			const data = new Resource(response.data);
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
