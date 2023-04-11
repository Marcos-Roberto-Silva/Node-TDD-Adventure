import {AddAccountModel} from "../../domain/usecases/add-accounts";
import {AccountModel} from "../../domain/models/accounts";

export interface AddAccountRepository {
    add (accountData: AddAccountModel): Promise<AccountModel>
}
