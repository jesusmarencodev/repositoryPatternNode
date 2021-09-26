import { MovementType } from "../../../common/enums/movement.type";

export interface Movement {
    id: number;
    user_id : number;
    type: MovementType;
    amount: number;
    create_at : Date | null;
    update_at : Date | null;
}