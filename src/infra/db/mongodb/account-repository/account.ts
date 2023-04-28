import {AddAccountRepository} from "../../../../data/protocols/add-account-repository";
import {AddAccountModel} from "../../../../domain/usecases/add-accounts";
import {AccountModel} from "../../../../domain/models/accounts";
import {MongoHelper} from "../helpers/mongo-helper"

export class AccountMongoRepository implements AddAccountRepository{
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = MongoHelper.getCollection('accounts');
        const result = await accountCollection.insertOne(accountData);
        const { insertedId: id }  = result;
        const account = await accountCollection.findOne({ _id: id });
        return MongoHelper.map(account);
    }
}