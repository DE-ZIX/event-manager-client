import { ConsultList, Resource } from '@/models';
import { EventManagerAPIService } from '.';

export default class ResourceService {
	private baseEndpoint = 'resources';

	public async getResources(): Promise<ConsultList> {
		const response = await EventManagerAPIService.get(this.baseEndpoint);
		return response.data as ConsultList;
	}

	public async getResource(id: number): Promise<Resource> {
		const response = await EventManagerAPIService.get(
			`${this.baseEndpoint}/${id}`,
		);
		return response.data as Resource;
	}

	public async postResource(resource: Resource): Promise<Resource> {
		const response = await EventManagerAPIService.post(
			this.baseEndpoint,
			resource,
		);
		return response.data as Resource;
	}

	public async putResource(resource: Resource): Promise<Resource> {
		const response = await EventManagerAPIService.put(
			this.baseEndpoint,
			resource,
		);
		return response.data as Resource;
	}

	public async deleteResource(id: number): Promise<string> {
		const response = await EventManagerAPIService.delete(
			`${this.baseEndpoint}/${id}`,
		);
		return response.data as string;
	}
}
