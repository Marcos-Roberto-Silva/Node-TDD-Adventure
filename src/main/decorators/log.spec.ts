import {Controller, HttpRequest, HttpResponse} from "../../presentation/protocols";
import {LogControllerDecorator} from "./log";
import {serverError} from "../../presentation/helpers/http-helper";
import {LogErrorRepository} from "../../data/protocols/log-error-repository";

const makeController = (): Controller => {
    class ControllerStub implements Controller {
        async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
            const httpResponse: HttpResponse = {
                statusCode: 200,
                body: {
                    name: "Marcos",
                }
            }
            return new Promise(resolve => resolve(httpResponse))
        }
    }
    return new ControllerStub();
}

interface SutTypes {
    sut: LogControllerDecorator,
    controllerStub: Controller,
    logErrorRepositoryStub: LogErrorRepository
}

const makeLogErrorRepository = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
        async log (stack: string): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new LogErrorRepositoryStub();
}

const makeSut = (): SutTypes => {
    const controllerStub = makeController();
    const logErrorRepositoryStub = makeLogErrorRepository()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);
    return {
        sut, controllerStub, logErrorRepositoryStub
    }
}

describe("LogController decorator", () => {
    it("should call controller handle", async () => {
        const {sut, controllerStub} = makeSut()
        const handleSpy = jest.spyOn(controllerStub, "handle")
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@email.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
        await sut.handle(httpRequest);
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    });

    it('should return the same result of the controller', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@email.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual({
            statusCode: 200,
            body: {
                name: "Marcos",
            }
        })
    });

    it('should  call LogErrorRepository with error if controller returns a server error', async () => {
        const {sut, controllerStub, logErrorRepositoryStub} = makeSut();
        const fakeError = new Error();
        fakeError.stack = 'any_stack';
        const error = serverError(fakeError);
        const logSpy = jest.spyOn(logErrorRepositoryStub, 'log');
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)));
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email@email.com",
                password: "any_password",
                passwordConfirmation: "any_password"
            }
        }
        await sut.handle(httpRequest);
        expect(logSpy).toHaveBeenCalledWith('any_stack')
    });
});
