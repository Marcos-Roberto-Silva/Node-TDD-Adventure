import {MongoClient} from "mongodb";

export const MongoHelper = {
    client: null as MongoClient,
    async connect (uri: string): Promise<void> {
        const OPTIONS = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        // @ts-ignore
        this.client = await MongoClient.connect(process.env.MONGODB_URL, OPTIONS);
    },

    async disconnect(): Promise<void> {
        await this.client.close();
    }
}
