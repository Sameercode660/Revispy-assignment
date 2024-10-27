

export class ApiSuccessResponse<T> {
    statusCode: number;
    message: string;
    response: T; 
    status: boolean;

    constructor(statusCode: number, message: string, response: T, status: boolean) {
        this.statusCode = statusCode;
        this.message = message;
        this.response = response;
        this.status = status;
    }
}
