import "./App.css";
import { RecoilRoot } from "recoil";
import LayoutComponent from "./components/LayoutComponent";
import CryptoDataComponent from "./components/CryotoDataComponent";
import FooterComponent from "./components/FooterComponent";


function App() {
  return (
    <RecoilRoot>
      <LayoutComponent />
      <CryptoDataComponent />
      <FooterComponent />
    </RecoilRoot>
  );
}

export default App;
