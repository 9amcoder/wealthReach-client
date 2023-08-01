import { FunctionComponent, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { InvestmentState, InvestmentType } from "../store/atom/InvestmentAtom";
import { addInvestment, deleteInvestment, getInvestments } from "../api/apiHandler";
import {
    AddButton,
  DeleteButton,
  TransactionContainer,
  TransactionData,
  TransactionHeader,
  TransactionRow,
  TransactionTable,
  TransactionTitle,
} from "./Transaction";
import { InvestmentCounter } from "../store/selector/InvestmentSelector";

const InvestmentPage: FunctionComponent = () => {

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [investmentType, setInvestmentType] = useState("");

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

  const handleAddInvestment = () => {
    setShowForm(true);
    if (showForm) {
      setShowForm(false);
      clearForm();
    }
  };

  const clearForm = () => {
    setTitle("");
    setDate("");
    setAmount("");
    setInvestmentType("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newTransaction: InvestmentType = {
        title,
        date,
        amount: Number(amount),
        type: investmentType,
        user: "64c0219a6904cca8539161db",
      };
      console.log(newTransaction);
      await addInvestment(newTransaction);
      const transactionData = await getInvestments();
      setInvestments(transactionData);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteInvestment(id);
      const newTransactions = investments.filter(
        (investment) => investment._id !== id
      );
      setInvestments(newTransactions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TransactionContainer>
      <TransactionTitle>Investments</TransactionTitle>
      <>
      {showForm ? (
        <AddButton onClick={handleAddInvestment}> Cancel </AddButton>
      ) : (
        <AddButton onClick={handleAddInvestment}>+ Add Investment</AddButton>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="transaction-form">
            <div className="transaction-form__row">
                <div className="transaction-form__column">
                    <label className="transaction-form__label">
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            className="transaction-form__input"
                        />
                    </label>
                    <label className="transaction-form__label">
                        Date:
                        <input
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            className="transaction-form__input"
                        />
                    </label>
                </div>
                <div className="transaction-form__column">
                    <label className="transaction-form__label">
                        Amount:
                        <input
                            type="number"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            className="transaction-form__input"
                        />
                    </label>
                <label className="transaction-form__label">
                    Type:
                    <select
                        value={investmentType}
                        onChange={(event) => setInvestmentType(event.target.value)}
                        className="transaction-form__select"
                    >
                        <option value="">Select Type</option>
                        <option value="Stock">Stock</option>
                        <option value="Bonds">Bonds</option>
                        <option value="Cryptocurrencies">Cryptocurrencies</option>
                        <option value="Exchange-Traded Funds">Exchange-Traded Funds</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Certificates of Deposit">Certificates of Deposit</option>
                        <option value="RRSP savings account">RRSP savings account</option>
                        <option value="FSA savings account">TFSA savings account</option>
                        <option value="First time home buyers savings account">First time home buyers savings account</option>
                        <option value="Index Funds">Index Funds</option>
                        <option value="Annuities">Annuities</option>
                    </select>
                </label>
                </div>
            </div>
            <button type="submit" className="transaction-form__button">
                Submit Transaction
            </button>
        </form>
      )}
    </>
      <h4 className="total_transaction_text">
        Total Investment info: {totalInvestment}
      </h4>
      <TransactionTable>
        <thead>
          <tr>
            <TransactionHeader>Title</TransactionHeader>
            <TransactionHeader>Date</TransactionHeader>
            <TransactionHeader>Amount</TransactionHeader>
            <TransactionHeader>Type</TransactionHeader>
            <TransactionHeader></TransactionHeader>
          </tr>
        </thead>
        <tbody>
          {investments.map(({ title, date, amount, type, _id }, i) => (
            <TransactionRow key={i}>
              <TransactionData>{title}</TransactionData>
              <TransactionData>
                {new Date(date).toLocaleDateString()}
              </TransactionData>
              <TransactionData>${amount}</TransactionData>
              <TransactionData>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </TransactionData>
              <TransactionData>
                <DeleteButton
                  onClick={() => handleDeleteTransaction(_id)}
                >
                  Delete{" "}
                </DeleteButton>
              </TransactionData>
            </TransactionRow>
          ))}
        </tbody>
      </TransactionTable>
    </TransactionContainer>
  );
};

export default InvestmentPage;
