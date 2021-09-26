//variables de proceso
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV  = process.env.APP_ENV  || 'development';

//Env file
const dotenv = require('dotenv');

dotenv.config({
    path : `${__dirname}/../config/${process.env.APP_ENV}.env`
});
console.log(process.env.APP_FOO);


import express = require('express');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
import jwt from 'express-jwt';
import cors from 'cors';

const app: express.Application = express();

// JSON Support
app.use(express.json());
app.use(cors());


/* import { TestService } from './services/test.service';
                                        Tipo      nombre definido en el contenedor
const testService = container.resolve<TestService>('testService');
console.log(testService.get()); */

//add containers of dependencyes
loadContainer(app);

//JWT

if (process.env.jwt_secret_key) {
     app.use(jwt({
         secret: process.env.jwt_secret_key,
         algorithms: ['HS256']
     }).unless({ path: ['/', '/check']}));
}

app.use(loadControllers(
    'controllers/*.ts', //ruta de la carpeta donde estaran los controladores
    { cwd: __dirname } // aqui le decimos cual es la ruta donde se debe parar para  empezar a buscar

));

export { app };