import { FunctionComponent, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CryptoState, ForexState } from "../store/atom/CryptoAndForxAtom";
import { getCryptoData, getForexData } from "../api/apiHandler";

interface CryptoDataComponentProps {}

const CryptoDataComponent: FunctionComponent<CryptoDataComponentProps> = () => {
  const cryptoData = useRecoilValue(CryptoState);
  const setCryptoData = useSetRecoilState(CryptoState);

  const currencyData = useRecoilValue(ForexState);
  const setCurrencyData = useSetRecoilState(ForexState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cryptoData = await getCryptoData();
        setCryptoData(cryptoData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setCryptoData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currencyData = await getForexData();
        setCurrencyData(currencyData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setCurrencyData]);

  return (
    <div
      style={{
        border: "1px solid black",
        margin: "15px",
        borderRadius: "20px",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h4>Live Market Data</h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {Object.values(cryptoData).map((data, index) => (
            <div key={index} style={{ margin: "0 10px" }}>
              <h4>
                {data.symbol === "ETH-USDC"
                  ? "Ethereum"
                  : data.symbol === "BTC-USDC"
                  ? "Bitcoin"
                  : data.symbol}{" "}
                : USD$ {data.buy}
              </h4>
            </div>
          ))}
        </div>
        <div>
          {Object.values(currencyData).map(
            (data, index) => (
              console.log(data),
              (
                <div key={index} style={{ margin: "0 10px" }}>
                  <h4>
                    CAD {data.CAD.toFixed(2)} / USD {data.USD.toFixed(2)}
                  </h4>
                  <h4>
                    CAD {data.CAD.toFixed(2)} / EUR {data.EUR.toFixed(2)}
                  </h4>
                  <h4>
                    CAD {data.CAD.toFixed(2)} / CNY {data.CNY.toFixed(2)}
                  </h4>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoDataComponent;
