import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import member_route from './handlers/members';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

member_route(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

export default app;
