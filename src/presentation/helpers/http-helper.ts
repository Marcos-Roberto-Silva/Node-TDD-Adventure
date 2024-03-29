import {HttpResponse} from "../protocols";
import {ServerError} from "../errors";

export const badRequest = (error: Error): HttpResponse => ({
        statusCode: 400,
        body: error
})

export const serverError = (error: Error): HttpResponse => ({
        statusCode: 500,
        body: new ServerError(error.stack)
})

export const statusIsOk = (data: any): HttpResponse => ({
        statusCode: 200,
        body: data
})

