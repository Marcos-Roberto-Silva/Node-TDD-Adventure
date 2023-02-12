import {HttpRequest, HttpResponse} from "../protocols/http";
import {MissingParamError} from "../errors/missingParam-error";
import {badRequest} from "../helpers/http-helper";

export class SignUpController {
    handle (httpRequest: HttpRequest): HttpResponse {

        const arrayAttributes = ["name", "email", "password", "confirmPassword"]

        for (const attribute of arrayAttributes) {
            if (!httpRequest.body[attribute]) {
                return badRequest(new MissingParamError(attribute))
            }
        }
    }
}
