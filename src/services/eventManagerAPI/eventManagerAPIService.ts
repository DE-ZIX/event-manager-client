import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class EventManagerAPIService {
	private static _eventManagerAPIServiceBaseURL = 'http://localhost:3005/';
	//private static _eventManagerAPIServiceBaseURL: string = process.env.EVENT_MANAGER_API_BASE_URL!;

	get eventManagerBaseURL(): string {
		return EventManagerAPIService._eventManagerAPIServiceBaseURL;
	}

	public static async get<T = unknown, R = AxiosResponse<T>, D = unknown>(
		requestURL: string,
		config?: AxiosRequestConfig<D>,
	): Promise<R> {
		return axios.get(this._eventManagerAPIServiceBaseURL + requestURL, config);
	}

	public static async post<T = unknown, R = AxiosResponse<T>, D = unknown>(
		requestURL: string,
		data?: D,
		config?: AxiosRequestConfig<D>,
	): Promise<R> {
		return axios.post(
			this._eventManagerAPIServiceBaseURL + requestURL,
			data,
			config,
		);
	}

	public static async put<T = unknown, R = AxiosResponse<T>, D = unknown>(
		requestURL: string,
		data?: D,
		config?: AxiosRequestConfig<D>,
	): Promise<R> {
		return axios.put(
			this._eventManagerAPIServiceBaseURL + requestURL,
			data,
			config,
		);
	}

	public static async delete<T = unknown, R = AxiosResponse<T>, D = unknown>(
		requestURL: string,
		config?: AxiosRequestConfig<D>,
	): Promise<R> {
		return axios.delete(
			this._eventManagerAPIServiceBaseURL + requestURL,
			config,
		);
	}
}
