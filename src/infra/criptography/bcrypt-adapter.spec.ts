import bcrypt from "bcrypt";
import {BcryptAdapter} from "./bcrypt-adapter";

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return new Promise(resolve => resolve('hash'))
    }
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

describe("Bcrypt Adapter", () => {
    it("Should call bcrypt with correct values", async () => {
        const salt = 12;
        const sut = makeSut();
        jest.spyOn(bcrypt, 'hash');
        await sut.encrypt('any_value');
        expect(bcrypt.hash).toBeCalledWith('any_value', salt);
    });

    it("Should return a hash on success", async () => {
        const sut = makeSut();
        const hash = await sut.encrypt('any_value');
        expect(hash).toBe('hash');
    });

    it("Should throw if bcrypt throws", async () => {
        const sut = makeSut();
        jest.spyOn<any, string>(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.encrypt('any_value');
        await expect(promise).rejects.toThrow();
    });
});
