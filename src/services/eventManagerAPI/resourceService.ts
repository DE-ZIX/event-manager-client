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
		const resourceReturn = new Resource(response.data);
		return resourceReturn.setAndConvertImageToFile().then(() => {
			return resourceReturn;
		});
	}

	public async post(resource: Resource): Promise<Resource> {
		const convertedResource = new Resource({ ...resource });
		return convertedResource.setAndConvertImageToBase64().then(async () => {
			const response = await EventManagerAPIService.post<Resource>(
				this.baseEndpoint,
				convertedResource,
			);
			const resourceReturn = new Resource(response.data);
			return resourceReturn.setAndConvertImageToFile().then(async () => {
				return resourceReturn;
			});
		});
	}

	public async put(resource: Resource): Promise<Resource> {
		const convertedResource = new Resource({ ...resource });
		return convertedResource.setAndConvertImageToBase64().then(async () => {
			const response = await EventManagerAPIService.put<Resource>(
				this.baseEndpoint,
				convertedResource,
			);
			const resourceReturn = new Resource(response.data);
			return resourceReturn.setAndConvertImageToFile().then(async () => {
				return resourceReturn;
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
