//-------Dependency Injection-----
import 'reflect-metadata';
import { Container } from 'typedi';

//----------Configurations----------
import express from 'express';
import * as dotenv from 'dotenv';
import { DataBase } from './config/DataBase';

//------------Midlewares-----------
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

//------------Controllers--------
import { IController } from './utils/interfaces/IController';
import { IUrlController } from './utils/interfaces/IUrlController';





export class Server {

    private app: express.Application;

    private urlsControllers: IUrlController[] = [
        // { url: '/api/user', controller: Container.get<IController>(UserController) }
    ];

    constructor() {
        this.app = express();
        this.config();
    }

    //------------------------Config--------------------
    private addRouters() {
        this.app.get('/', (req, res) => res.send('WORKS!'));
        this.urlsControllers.forEach(urlController => {
            this.app.use(urlController.url, urlController.controller.getRouter())
        });
    }

    private addMiddlewares() {
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(compression());
        this.app.use(cors());
    }

    private async config() {
        dotenv.config();
        this.app.set('port', process.env.PORT || 3000);
        await DataBase.configDataBase();
        this.addMiddlewares();
        this.addRouters()
    }


    //-------------Start----------------
    public start() {
        let port = this.app.get('port');
        this.app.listen(port, () => console.log('Server on port ', port))
    }
}