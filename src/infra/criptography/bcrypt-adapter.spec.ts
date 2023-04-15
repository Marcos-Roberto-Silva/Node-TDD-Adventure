import bcrypt from "bcrypt";
import {BcryptAdapter} from "./bcrypt-adapter";

describe("Bcrypt Adapter", () => {
    it("Should call bcrypt with correct value", async () => {
        const salt = 12;
        const sut = new BcryptAdapter(salt);
        jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(bcrypt.hash).toBeCalledWith('any_value', salt)
    });
});
