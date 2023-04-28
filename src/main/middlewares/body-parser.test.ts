import request from 'supertest';
import app from '../config/app';

describe("", () => {
    it("Should body as jason", async () => {
        app.post('/test_body_parser', (req, res) => {
            console.log('RESULT: ',req.body)
            res.send(req.body)
        });
        await request(app)
            .post('/test_body_parser')
            .send({name:'Marcos'})
            .expect({name:'Marcos'});
    });
});

