import { ConsultList, Event, Pagination, Resource } from '@/models';
import { EventManagerAPIService } from '.';

export default class EventService {
	private baseEndpoint = 'events';

	public async getMultiple(
		pagination?: Pagination,
		extraParams?: { [key: string]: unknown },
	): Promise<ConsultList<Event>> {
		const config = {
			params: {
				pagination,
			},
		};
		config.params = { ...config.params, ...extraParams };
		const response = await EventManagerAPIService.get<ConsultList<Event>>(
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

	public async addResource(id: number, resourceId: number): Promise<Event> {
		const response = await EventManagerAPIService.get<Event>(
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

	public async get(id: number): Promise<Event> {
		const response = await EventManagerAPIService.get<Event>(
			`${this.baseEndpoint}/${id}`,
		);
		const data = new Event(response.data);
		return data.setAndConvertImageToFile().then(() => {
			return data;
		});
	}

	public async post(event: Event): Promise<Event> {
		const converted = new Event({ ...event });
		return converted.setAndConvertImageToBase64().then(async () => {
			const response = await EventManagerAPIService.post<Event>(
				this.baseEndpoint,
				converted,
			);
			const data = new Event(response.data);
			return data.setAndConvertImageToFile().then(async () => {
				return data;
			});
		});
	}

	public async put(event: Event): Promise<Event> {
		const converted = new Event({ ...event });
		return converted.setAndConvertImageToBase64().then(async () => {
			const response = await EventManagerAPIService.put<Event>(
				this.baseEndpoint,
				converted,
			);
			const data = new Event(response.data);
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
