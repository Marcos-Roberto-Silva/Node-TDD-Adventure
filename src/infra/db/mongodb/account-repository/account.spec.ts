import {MongoHelper} from '../helpers/mongo-helper';

describe("Account Mongo Repository", () => {
    beforeAll(async () => {
        // @ts-ignore
        await MongoHelper.connect(process.env.MONGODB_URL);
    });

    afterAll( async () => {
        await MongoHelper.disconnect();
    })

    it("Should return an account on success", async () => {
        const sut = new AccountMongoRepository();
        const account = await sut.add({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password'
        });
        expect(account).toBeTruthy();
        expect(account.id).toBeTruthy();
        expect(account.name).toBe('any_name');
        expect(account).toBe('any_email@mail.com');
        expect(account).toBe('any_password');
    });
});
