import { Request, Response } from 'express';
import { route, GET, POST, PUT, DELETE } from 'awilix-express';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../dtos/suscription.dtos';
import { BaseController } from '../common/controllers/base.controllers';

@route('/subscriptions')
export class SubscriptionController extends BaseController {

    constructor(private readonly subscriptionService: SubscriptionService) {
        super();
    }
    @GET()
    public async all(req: Request, res: Response) {
        try {
            res.send(
                await this.subscriptionService.all()
            );
        } catch (error) {
            this.handleException(error, res);
        }

    }
    // ex : subscription/1
    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            const result = await this.subscriptionService.find(id);

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

    @POST()
    public async store(req: Request, res: Response) {
        try {
            await this.subscriptionService.store({
                user_id: req.body.user_id,
                code: req.body.code,
                amount: req.body.amount,
                cron: req.body.cron,
            } as SubscriptionCreateDto)

            res.send(); //default is 200
        } catch (error) {
            this.handleException(error, res);
        }
    }
    // ex : subscription/1
    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.subscriptionService.update(id, {
                code: req.body.code,
                amount: req.body.amount,
                cron: req.body.cron,
            } as SubscriptionUpdateDto)

            res.send(); //default is 200
        } catch (error) {
            this.handleException(error, res);
        }
    }

    // ex : subscription/1
    @route('/:id')
    @DELETE()
    public async remove(req: Request, res: Response) {
        try {

            const id = parseInt(req.params.id);
            await this.subscriptionService.remove(id);

            res.send(); //default is 200
        } catch (error) {
            this.handleException(error, res);
        }


    }

}