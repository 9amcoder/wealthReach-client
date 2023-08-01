import { FunctionComponent } from "react";

interface NavigationComponentProps {
  onClick: (selection: string) => void;
}

const NavigationComponent: FunctionComponent<NavigationComponentProps> = ({
  onClick,
}) => {
  const handleNavigationClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick(event.currentTarget.innerText);
  };

  return (
    <div className="navigation-container">
      <nav>
        <ul className="navigation-list">
          <li className="navigation-item">
            <a href="#" onClick={handleNavigationClick}>
              Transaction
            </a>
          </li>
          <li className="navigation-item">
            <a href="#" onClick={handleNavigationClick}>
              Investment
            </a>
          </li>
          <li className="navigation-item">
            <a href="#" onClick={handleNavigationClick}>
              Debt
            </a>
          </li>
          <li className="navigation-item">
            <a href="#" onClick={handleNavigationClick}>
              Report
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationComponent;