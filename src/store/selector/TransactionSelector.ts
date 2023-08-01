import { selector } from "recoil";
import { TransactionState } from "../atom/TransactionAtom";

export const TransactionCounter = selector({
    key: 'transactionCount',
    get: ({ get }) => {
        const transactions = get(TransactionState);
        return transactions.length;
    }
});