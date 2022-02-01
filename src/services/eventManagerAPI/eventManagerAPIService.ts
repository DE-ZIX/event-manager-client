import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class EventManagerAPIService {
	private static _eventManagerAPIServiceBaseURL = 'http://localhost:3005/';
	//private static _eventManagerAPIServiceBaseURL: string = process.env.EVENT_MANAGER_API_BASE_URL!;

	get eventManagerBaseURL(): string {
		return EventManagerAPIService._eventManagerAPIServiceBaseURL;
	}

	public static async get<T = unknown, D = unknown>(
		requestURL: string,
		config?: AxiosRequestConfig<D>,
	): Promise<AxiosResponse<T>> {
		return axios.get<T>(
			this._eventManagerAPIServiceBaseURL + requestURL,
			config,
		);
	}

	public static async post<T = unknown, D = unknown>(
		requestURL: string,
		data?: D,
		config?: AxiosRequestConfig<D>,
	): Promise<AxiosResponse<T>> {
		return axios.post<T>(
			this._eventManagerAPIServiceBaseURL + requestURL,
			data,
			config,
		);
	}

	public static async put<T = unknown, D = unknown>(
		requestURL: string,
		data?: D,
		config?: AxiosRequestConfig<D>,
	): Promise<AxiosResponse<T>> {
		return axios.put<T>(
			this._eventManagerAPIServiceBaseURL + requestURL,
			data,
			config,
		);
	}

	public static async delete<T = unknown, D = unknown>(
		requestURL: string,
		config?: AxiosRequestConfig<D>,
	): Promise<AxiosResponse<T>> {
		return axios.delete<T>(
			this._eventManagerAPIServiceBaseURL + requestURL,
			config,
		);
	}
}
