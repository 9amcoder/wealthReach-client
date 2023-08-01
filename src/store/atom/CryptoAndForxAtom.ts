import { atom } from  'recoil' ;

interface CryptoType {
    time: string;
    symbol: string;
    buy: string;
    sell : string;
    changeRate: string;
    changePrice: string;
    high: string;
    low: string;
    vol: string;
    volValue: string;
    last: string;
    averagePrice: string | null;
    takerFeeRate: string;
    makerFeeRate: string;
    takerCoefficient: string;
    makerCoefficient: string;
}

export const CryptoState = atom<CryptoType[]>({
    key: 'CryptoState',
    default: [],
});

interface ForexType {
     EUR : number;
     USD : number;
     JPY : number;
     BGN : number;
     CZK : number;
     DKK : number;
     GBP : number;
     HUF : number;
     PLN : number;
     RON : number;
     SEK : number;
     CHF : number;
     ISK : number;
     NOK : number;
     TRY : number;
     AUD : number;
     BRL : number;
     CAD : number;
     CNY : number;
     HKD : number;
     IDR : number;
     ILS : number;
     INR : number;
     KRW : number;
     MXN : number;
     MYR : number;
     NZD : number;
     PHP : number;
     SGD : number;
     THB : number;
     ZAR : number;
}

export const ForexState = atom<ForexType[]>({
    key: 'ForexState',
    default: [],
});