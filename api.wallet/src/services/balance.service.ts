import { BalanceRepository } from "./repositories/balance.repository";
import { Balance } from "./repositories/domain/balance";

export class BalanceService {
    constructor(
        private readonly balanceRepository : BalanceRepository
    ){}

    public async find(id:number): Promise<Balance | null> {
        return await this.balanceRepository.find(id);
    }

    public async findByUserId(user_id:number): Promise<Balance | null> {
        return await this.balanceRepository.find(user_id);
    }
}