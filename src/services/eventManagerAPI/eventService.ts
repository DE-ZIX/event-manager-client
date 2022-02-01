import { ConsultList, Event } from '@/models';
import { EventManagerAPIService } from '.';

export default class EventService {
	private baseEndpoint = 'events';

	public async getMultiple(): Promise<ConsultList<Event>> {
		const response = await EventManagerAPIService.get<ConsultList<Event>>(
			this.baseEndpoint,
		);
		return response.data;
	}

	public async get(id: number): Promise<Event> {
		const response = await EventManagerAPIService.get<Event>(
			`${this.baseEndpoint}/${id}`,
		);
		return response.data;
	}

	public async post(event: Event): Promise<Event> {
		const response = await EventManagerAPIService.post<Event>(
			this.baseEndpoint,
			event,
		);
		return response.data;
	}

	public async put(event: Event): Promise<Event> {
		const response = await EventManagerAPIService.put<Event>(
			this.baseEndpoint,
			event,
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
