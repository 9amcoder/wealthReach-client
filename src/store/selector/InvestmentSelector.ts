import { selector } from "recoil";
import { InvestmentState } from "../atom/InvestmentAtom";

export const InvestmentCounter = selector({
    key: 'investmentCount',
    get: ({ get }) => {
        const investments = get(InvestmentState);
        return investments.length;
    }
});