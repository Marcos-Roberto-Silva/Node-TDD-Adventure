import {DbAddAccount} from "./db-add-account";
import {AccountModel, AddAccountModel, Encrypter, AddAccountRepository} from "./db-add-account-protocols";

const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter{
        async encrypt(value: string): Promise<string> {
            return new Promise((resolve) => resolve('hashed_password'));
        }
    }
    return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository{
        async add(account: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email',
                password: 'hashed_password'
            }
            return new Promise(resolve => resolve(fakeAccount))
        }
    }
    return new AddAccountRepositoryStub()
}

interface SutTypes {
    sut: DbAddAccount
    encrypterStub: Encrypter,
    addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
    const addAccountRepositoryStub = makeAddAccountRepository();
    const encrypterStub = makeEncrypter();
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
    return {
        sut,
        encrypterStub,
        addAccountRepositoryStub
    }
}

describe("DbAddAccount Usecase", () => {
    it("Should call Encrypter with correct password", async () => {
        const {sut, encrypterStub} = makeSut();
        const encryptSpy = jest.spyOn(encrypterStub,'encrypt');
        const accountData = {
            name: '',
            email: '',
            password: 'validPassword'
        }
        await sut.add(accountData);
        expect(encryptSpy).toHaveBeenCalledWith('validPassword');
    });

    it("Should throw if Encrypter throws", async () => {
        const {sut, encrypterStub} = makeSut();
        jest.spyOn(encrypterStub,'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const accountData = {
            name: '',
            email: '',
            password: 'validPassword'
        }
        const promise = sut.add(accountData);
        await expect(promise).rejects.toThrow();
    });

    it("Should call AddAccountRepository with correct values", async () => {
        const {sut, addAccountRepositoryStub} = makeSut();
        const addSpy = jest.spyOn(addAccountRepositoryStub,'add');
        const accountData = {
            name: '',
            email: '',
            password: 'validPassword'
        }
        await sut.add(accountData);
        expect(addSpy).toHaveBeenCalledWith({
            name: '',
            email: '',
            password: 'hashed_password'
        });
    });

    it("Should throw if addAccountRepository throws", async () => {
        const {sut, addAccountRepositoryStub} = makeSut();
        jest.spyOn(addAccountRepositoryStub,'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const accountData = {
            name: '',
            email: '',
            password: 'validPassword'
        }
        const promise = sut.add(accountData);
        await expect(promise).rejects.toThrow();
    });

    it("Should return an account with success", async () => {
        const {sut, addAccountRepositoryStub} = makeSut();
        const accountData = {
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email',
            password: 'hashed_password'
        }
        const account = await sut.add(accountData);
        expect(account).toEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email',
            password: 'hashed_password'
        });
    });
});
