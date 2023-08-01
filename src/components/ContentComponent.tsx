import { FunctionComponent } from "react";
import styled from 'styled-components';

const TransactionContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
`;

const TransactionTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const TransactionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TransactionHeader = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const TransactionRow = styled.tr`
  &:nth-child(even) {
    background-color: black;
  }
`;

const TransactionData = styled.td`
  padding: 10px;
`;

const DeleteButton = styled.button`
  background-color: red;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: blue;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
`;

const AddButton = styled.button`
  background-color: green;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
`;

interface ContentComponentProps {
    transactions: [];
    totalTransaction: number;
    transactionError: string;
}
 
const ContentComponent: FunctionComponent<ContentComponentProps> = ({
    transactions, totalTransaction, transactionError
}) => {

    const handleAddTransaction = async (transaction: TransactionType) => {
        try {
           console.log(transaction);
        } catch (error) {
          console.error(error);
        }
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
    
      const handleEditTransaction = async (id: string, transaction: TransactionType) => {
        try {
          await updateTransaction(transaction);
          const newTransactions = transactions.map((t) => {
            if (t._id === id) {
              return { ...t, ...transaction };
            }
            return t;
          });
          setTransactions(newTransactions);
        } catch (error) {
          console.error(error);
        }
      };


    return (
        <TransactionContainer>
          <TransactionTitle>
            Transactions
          </TransactionTitle>
          <AddButton onClick={handleAddTransaction} >+ Add Transaction</AddButton>
          <h2>Total Transaction: {totalTransaction}</h2>
          <TransactionTable>
            <thead>
              <tr>
                <TransactionHeader>Title</TransactionHeader>
                <TransactionHeader>Date</TransactionHeader>
                <TransactionHeader>Amount</TransactionHeader>
                <TransactionHeader>Type</TransactionHeader>
                <TransactionHeader>Delete</TransactionHeader>
                <TransactionHeader>Edit</TransactionHeader>
              </tr>
            </thead>
            <tbody>
              {transactions.map(({ title, date, amount, type, _id }, i) => (
                <TransactionRow key={i}>
                  <TransactionData>{title}</TransactionData>
                  <TransactionData>{new Date(date).toLocaleDateString()}</TransactionData>
                  <TransactionData>{amount}</TransactionData>
                  <TransactionData>{type}</TransactionData>
                  <TransactionData>
                    <EditButton onClick={handleEditTransaction}>Edit </EditButton>
                  </TransactionData>
                  <TransactionData>
                    <DeleteButton onClick={handleDeleteTransaction(_id)}>Delete </DeleteButton>
                  </TransactionData>
                </TransactionRow>
              ))}
            </tbody>
          </TransactionTable>
          {transactionError && <p>{transactionError}</p>}
        </TransactionContainer>
      );
}
 
export default ContentComponent;