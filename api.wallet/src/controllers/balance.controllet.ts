import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';
import { BaseController } from '../common/controllers/base.controllers';
import { BalanceService } from '../services/balance.service';


@route('/balance')
export class BalanceController extends BaseController {

    constructor(private readonly balanceService: BalanceService) {
        super();
    }

    // found balance for id balance 
    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            const result = await this.balanceService.find(id);

            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send();
            }
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/user/:user_id')
    @GET()
    public async findByUserId(req: Request, res: Response) {
        const user_id = parseInt(req.params.user_id);
        try {
            res.send(
                await this.balanceService.findByUserId(user_id)
            );
        } catch (error) {
            this.handleException(error, res);
        }

    }
}