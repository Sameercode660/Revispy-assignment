

export class ApiErrorResponse{
    statusCode: number;
    message: string;
    status: boolean;

    constructor(statusCode: number, message: string, status: boolean) {
        this.statusCode = statusCode;
        this.message = message;
        this.status = status;
    }
}