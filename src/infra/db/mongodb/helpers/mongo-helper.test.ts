import { MongoHelper as sut} from "./mongo-helper";
import env from "../../../../main/env";

describe("Mongo Helper", () => {
    beforeAll(async () => {
        await sut.connect(env.MONGO_URL);
    });

    afterAll(async () => {
        await sut.disconnect();
    })
    it("Should reconnect if mongoDb is down ", async () => {
        const accountCollection = await sut.getCollection("account");
        expect(accountCollection).toBeTruthy();
    });
});
