
import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';
import { TestService } from '../services/test.service';

@route('/check')
export class CheckController {
    constructor( private readonly testService: TestService ){}

    @GET() //mi controlador tiene una accion llamada index la cual puede ser accedida por medio del vervo get
    public index(req:Request, res: Response): void {
        res.send({
            NODE_ENV : process.env.NODE_ENV, 
            APP_ENV  : process.env.APP_ENV 
        })
    }

    @route('/test')
    @GET() //mi controlador tiene una accion llamada index la cual puede ser accedida por medio del vervo get
    public test(req:Request, res: Response): void {
        res.send(this.testService.get())        

    }

    @route('/user-payload')
    @GET() //mi controlador tiene una accion llamada index la cual puede ser accedida por medio del vervo get
    public userPayload(req:Request, res: Response): void {
        res.send((req as any).user)        

    }
}

