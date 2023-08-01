import { FunctionComponent, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { InvestmentState } from "../store/atom/InvestmentAtom";
import { getInvestments } from "../api/apiHandler";
import { DeleteButton, TransactionContainer, TransactionData, TransactionHeader, TransactionRow, TransactionTable, TransactionTitle } from "./Transaction";
import { InvestmentCounter } from "../store/selector/InvestmentSelector";

 
const DebtPage: FunctionComponent = () => {

    const investments = useRecoilValue(InvestmentState);
    const setInvestments = useSetRecoilState(InvestmentState);
    const totalInvestment = useRecoilValue(InvestmentCounter);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const transactionData = await getInvestments();
            setInvestments(transactionData);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, [setInvestments]);

    return ( 
        <TransactionContainer>
        <TransactionTitle>Debts</TransactionTitle>
        <h4 className="total_transaction_text">New feature under development...</h4>
      </TransactionContainer>
     );
}
 
export default DebtPage;