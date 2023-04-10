import {AddAccount, AddAccountModel} from "../../../domain/usecases/add-accounts";
import {Encrypter} from "../../protocols/encrypter";
import {AccountModel} from "../../../domain/models/accounts";

export class DbAddAccount implements AddAccount {
    private readonly encrypter: Encrypter;

    constructor(encrypter: Encrypter) {
        this.encrypter = encrypter;
    }

    async add(account: AddAccountModel): Promise<AccountModel> {
        await this.encrypter.encrypt(account.password)
        return new Promise(resolve => resolve(null));
    }
}
