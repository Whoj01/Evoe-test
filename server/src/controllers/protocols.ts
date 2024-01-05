export interface HttpResponse<T> {
	statusCode: number;
	body: {
		msg: string;
		data?: T;
		status: number;
		ok: boolean;
	};
}

interface Headers {
  authorization?: string;
  [header: string]: string | undefined;
}

export interface HttpResquest<B> {
	body?: B;
	headers?: Headers;
	params?: B;
}

export enum statusCode {
	tryAgainLater = 417,
	created = 201,
	ok = 200,
	unauthorized = 401,
	badRequest = 400,
	found = 302,
	notFound = 404,
	internalServerError = 500,
	notAcceptable = 406,
}

export type requiredFieldsError = HttpResponse<string>  | null;

export interface IController {
	handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}