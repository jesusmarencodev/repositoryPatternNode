import assert from 'assert';
import { MovementService } from './movement.service';
import { MovementMockRepository } from './repositories/implementation/mock/movement.repository';
import { BalanceMockRepository } from './repositories/implementation/mock/balance.repository';
import { MovementCreateDto } from '../dtos/movement.dtos';

const movementService = new MovementService(
    new MovementMockRepository(),
    new BalanceMockRepository()
)


describe('Movement.Service', ()=> {
    describe('Store', ()=> {
        it('tries to register an income movement', async ()=>{
           await movementService.store({
                user_id : 1,
                type : 0,
                amount : 200
            } as MovementCreateDto);
        });

        it('tries to register an outcome movement', async ()=>{
            await movementService.store({
                user_id : 2,
                type : 1,
                amount : 100
            } as MovementCreateDto);

        });
        it('tries to register an income movement with insufficient balance', async ()=>{

            try {
                await movementService.store({
                    user_id : 1,
                    type : 0,
                    amount : 1000
                } as MovementCreateDto);
            } catch (error:any) {
                assert.equal(error.message, 'User does not have enough balance.')
            }
  
        });
        it('tries to register an unexpected moment', async()=>{
            try {
                await movementService.store({
                    user_id : 1,
                    type : 3,
                    amount : 1000
                });
            } catch (error:any) {
                assert.equal(error.message, 'Invalid movement type supplied')
            }
        });
    });
});