import { atom } from "recoil";

export interface TransactionType {
    _id?: string;
    transactionId?: string;
    title: string;
    date: string;
    time: string;
    amount: number;
    type: 'income' | 'expense';
    user?: string;
}

export const TransactionState = atom<TransactionType[]>({
    key: 'TransactionState',
    default: [],
});

export const TransactionErrorState = atom<string>({
    key: 'TransactionErrorState',
    default: '',
});