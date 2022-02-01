import { ConsultList, Resource } from '@/models';
import { EventManagerAPIService } from '.';

export default class ResourceService {
	private baseEndpoint = 'resources';

	public async getMultiple(): Promise<ConsultList<Resource>> {
		const response = await EventManagerAPIService.get<ConsultList<Resource>>(
			this.baseEndpoint,
		);
		return response.data;
	}

	public async get(id: number): Promise<Resource> {
		const response = await EventManagerAPIService.get<Resource>(
			`${this.baseEndpoint}/${id}`,
		);
		return response.data;
	}

	public async post(resource: Resource): Promise<Resource> {
		const response = await EventManagerAPIService.post<Resource>(
			this.baseEndpoint,
			resource,
		);
		return response.data;
	}

	public async put(resource: Resource): Promise<Resource> {
		const response = await EventManagerAPIService.put<Resource>(
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
