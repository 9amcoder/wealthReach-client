import { FunctionComponent } from "react";
import { AddButton } from "../pages/Transaction";

interface TransactionProps {
  handleAddTransaction: () => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  date: string;
  setDate: (date: string) => void;
  time?: string;
  setTime?: (time: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
  type: string;
  setType: (type: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isShowTime?: boolean;
  isTypeFixed?: boolean;
  isInvestmentType?: boolean;
}

const TransactionForm: FunctionComponent<TransactionProps> = ({
  handleAddTransaction,
  showForm,
  setShowForm,
  title,
  setTitle,
  date,
  setDate,
  time,
  setTime,
  amount,
  setAmount,
  type,
  setType,
  handleSubmit,
  isShowTime = true,
  isTypeFixed = true,
  isInvestmentType = false,
}) => {
  return (
    <>
      {showForm ? (
        <AddButton onClick={handleAddTransaction}> Cancel </AddButton>
      ) : (
        <AddButton onClick={handleAddTransaction}>+ Add Transaction</AddButton>
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
              {isShowTime && (
                <label className="transaction-form__label">
                  Time:
                  <input
                    type="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    className="transaction-form__input"
                  />
                </label>
              )}
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
            { isTypeFixed && <label className="transaction-form__label">
                Type:
                <select
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="transaction-form__select"
                >
                  <option value="">Select Type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </label> }
              { isInvestmentType && <label className="transaction-form__label">
              Type:
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="transaction-form__select"
              >
                <option value="">Select Type</option>
                <option value="income">Stock</option>
                <option value="expense">Bonds</option>
                <option value="expense">Cryptocurrencies</option>
                <option value="expense">Exchange-Traded Funds</option>
                <option value="expense">Real Estate</option>
                <option value="expense">Certificates of Deposit</option>
                <option value="expense">RRSP savings account</option>
                <option value="expense">TFSA savings account</option>
                <option value="expense">First time home buyers savings account</option>
                <option value="expense">Index Funds</option>
                <option value="expense">Annuities</option>
              </select>
            </label>
                }
            </div>
          </div>
          <button type="submit" className="transaction-form__button">
            Submit Transaction
          </button>
        </form>
      )}
    </>
  );
};

export default TransactionForm;
