export interface IResetPass {
    from_ip: string;
    headers: string;
    reset_token: string;
    time_to_live: Date;
    isRecovered?: boolean;
    userId?: string;
}