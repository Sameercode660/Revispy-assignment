

export class ApiSuccessResponse {
    statusCode: number;
    message: string;
    response: any
    status: boolean;

    constructor(statusCode: number, message: string, response: any, status: boolean) {
        this.statusCode = statusCode;
        this.message = message;
        this.response = response;
        this.status = status
    }    
}