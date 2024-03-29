import app from './config/app';
import {MongoHelper} from "../infra/db/mongodb/helpers/mongo-helper";
import env from '../main/env'

MongoHelper.connect(env.MONGO_URL)
    .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.PORT, () => console.log(`Server listening on http://localhost:${env.PORT}`));
}).catch(console.error);
