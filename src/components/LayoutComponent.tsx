import { FunctionComponent, useState } from "react";
import Transaction from "../pages/Transaction";
import "./LayoutComponentStyle.css";
import InvestmentPage from "../pages/Investment";
import ReportPage from "../pages/Report";
import DebtPage from "../pages/Debt";
import NavigationComponent from "./NavigationComponent";

interface LayoutComponentProps {}

const LayoutComponent: FunctionComponent<LayoutComponentProps> = () => {
    const [selected, setSelected] = useState("TRANSACTION");

    const handleNavigationClick = (selection: string) => {
      setSelected(selection);
    };

    console.log(selected);

  return (
    <>
      <h3>WealthReach - Beta </h3>
      <NavigationComponent onClick={handleNavigationClick} />
      {selected === "TRANSACTION" && <Transaction />}
      {selected === "INVESTMENT" && <InvestmentPage />}
      {selected === "DEBT" && <DebtPage />}
      {selected === "REPORT" && <ReportPage />}
    </>
  );
};

export default LayoutComponent;
