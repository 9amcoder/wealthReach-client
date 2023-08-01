import { FunctionComponent, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  TransactionErrorState,
  TransactionState,
  TransactionType,
} from "../store/atom/TransactionAtom";
import { TransactionCounter } from "../store/selector/TransactionSelector";
import {
  deleteTransaction,
  getTransactions,
  addTransaction,
} from "../api/apiHandler";
import "./Transaction.css";
//import ContentComponent from "../components/ContentComponent";
import styled from "styled-components";
import TransactionForm from "../components/FormComponent";

export const TransactionContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
`;

export const TransactionTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const TransactionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TransactionHeader = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

export const TransactionRow = styled.tr`
  &:nth-child(even) {
    background-color: none;
  }
`;

export const TransactionData = styled.td`
  padding: 10px;
`;

export const DeleteButton = styled.button`
  background-color: #eda193;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
`;

export const AddButton = styled.button`
  background-color: #c3ed93;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
`;



const Transaction: FunctionComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  const transactions = useRecoilValue(TransactionState);
  const setTransactions = useSetRecoilState(TransactionState);
  const totalTransaction = useRecoilValue(TransactionCounter);

  const transactionError = useRecoilValue(TransactionErrorState);
  const setTransactionError = useSetRecoilState(TransactionErrorState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionData = await getTransactions();
        setTransactions(transactionData);
      } catch (error) {
        setTransactionError(error as string);
      }
    };
    fetchData();
  }, [setTransactions, setTransactionError]);

  const handleAddTransaction = () => {
    setShowForm(true);
    if (showForm) {
      setShowForm(false);
      clearForm();
    }
  };

  const clearForm = () => {
    setTitle("");
    setDate("");
    setTime("");
    setAmount("");
    setType("");
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      const newTransactions = transactions.filter(
        (transaction) => transaction._id !== id
      );
      setTransactions(newTransactions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newTransaction: TransactionType = {
        title,
        date,
        time,
        amount: Number(amount),
        type: type as "income" | "expense",
        user: "64c0219a6904cca8539161db",
      };
      console.log(newTransaction);
      await addTransaction(newTransaction);
      const transactionData = await getTransactions();
      setTransactions(transactionData);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TransactionContainer>
      <TransactionTitle>Transactions</TransactionTitle>
      <TransactionForm
        handleAddTransaction={handleAddTransaction}
        showForm={showForm}
        setShowForm={setShowForm}
        title={title}
        setTitle={setTitle}
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        amount={amount}
        setAmount={setAmount}
        type={type}
        setType={setType}
        handleSubmit={handleSubmit}
      />
      <h4 className="total_transaction_text">Total Transaction: {totalTransaction}</h4>
      <TransactionTable>
        <thead>
          <tr>
            <TransactionHeader>Title</TransactionHeader>
            <TransactionHeader>Date</TransactionHeader>
            <TransactionHeader>Amount</TransactionHeader>
            <TransactionHeader>Type</TransactionHeader>
            <TransactionHeader></TransactionHeader>
            {/* <TransactionHeader>Edit</TransactionHeader> */}
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ title, date, amount, type, _id }, i) => (
            <TransactionRow key={i}>
              <TransactionData>{title}</TransactionData>
              <TransactionData>
                {new Date(date).toLocaleDateString()}
              </TransactionData>
              <TransactionData>${amount}</TransactionData>
              <TransactionData>{type.charAt(0).toUpperCase() + type.slice(1)}</TransactionData>
              {/* <TransactionData>
              <EditButton onClick={
                () => {
                    console.log("Edit button clicked");
                }
              }>Edit </EditButton>
            </TransactionData> */}
              <TransactionData>
                <DeleteButton onClick={() => handleDeleteTransaction(_id || '')}>
                  Delete{" "}
                </DeleteButton>
              </TransactionData>
            </TransactionRow>
          ))}
        </tbody>
      </TransactionTable>
      {transactionError && <p>{transactionError}</p>}
    </TransactionContainer>
  );
};

export default Transaction;
