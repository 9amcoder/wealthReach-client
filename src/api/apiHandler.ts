import axios from "axios";
import { TransactionType } from "../store/atom/TransactionAtom";
import { InvestmentType } from "../store/atom/InvestmentAtom";


const API_URL = 'http://localhost:3000/api';

export const API = axios.create({
    baseURL: API_URL,
});

export const getTransactions = async () => {
   try {
     const response = await API.get('/transactions');
     return response.data;
   } catch (error) {
        console.error(error);
   }
}

export const addTransaction = async (transaction: TransactionType) => {
    try {
        const response = await API.post('/transactions', transaction);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateTransaction = async (transaction: TransactionType) => {
    try {
        const response = await API.patch(`/transactions/${transaction._id}`, transaction);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteTransaction = async (id: string) => {
    try {
        const response = await API.delete(`/transactions/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// CRUD for investment data

export const getInvestments = async () => {
    try {
        const response = await API.get('/investments');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const addInvestment = async (investment: InvestmentType ) => {
    try {
        const response = await API.post('/investments', investment);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteInvestment = async (id: string) => {
    try {
        const response = await API.delete(`/investments/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const PUBLIC_API = 'http://localhost:3000/';
// get request for getting crypto and forex data

export const cryptoAndForexApi = axios.create({
    baseURL: PUBLIC_API,
});

export const getCryptoData = async () => {
    try {
        const response = await cryptoAndForexApi.get('/crypto');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getForexData = async () => {
    try {
        const response = await cryptoAndForexApi.get('/currency');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}