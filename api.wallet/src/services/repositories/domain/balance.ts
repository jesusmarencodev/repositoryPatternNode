export interface Balance {
    id: number;
    user_id : number;
    amount: number;
    create_at : Date | null;
    update_at : Date | null;
}