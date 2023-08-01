import { atom } from "recoil";

export interface InvestmentType {
    _id?: string;
    investmentId?: string;
    title: string;
    amount: number;
    date: string;
    type: string;
    user?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const InvestmentState = atom<InvestmentType[]>({
    key: 'InvestmentState',
    default: [],
});