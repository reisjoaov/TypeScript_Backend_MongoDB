import routes from './4webApi/routes';
import express, { NextFunction, Request, Response } from 'express';
import Logger from './3infra/middlewares/Logger';
import { basicAuthMiddleware } from './3infra/middlewares/basicAuth';
import ErrorHandler from './3infra/middlewares/ErrorHandler';
import NotFoundException from './2domain/exceptions/NotFoundExpection';
import MongooseConfig from './3infra/dbConfig/mongooseConfig';

const app = express();
const port = 3000;
app.use(express.json());
app.use(Logger.init());
MongooseConfig.connect();

app.use('/api', basicAuthMiddleware, routes);

app.get('/', (req: Request, res: Response) => {
    res.json('Bem vindo a primeira rota!!!');
});

const routeNotFoundMiddleware =
    (req: Request, res: Response, next: NextFunction) =>
        next(new NotFoundException('Rota não disponível'));

app.use(routeNotFoundMiddleware);
app.use(ErrorHandler.init());

app.listen(port, () => {
    console.info(`Servidor rodando na porta: http://localhost: ${port}`);
});