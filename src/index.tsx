import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum} from "@thirdweb-dev/chains";
import "./styles/globals.css";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
//const activeChain = Ethereum;
const activeChain = ChainId.Mainnet;

const container = document.getElementById("root");
const root = createRoot(container!);
// ReactDOM.render(
//   <React.StrictMode>
//     <ThirdwebProvider activeChain={activeChain}>
//       <App />
//     </ThirdwebProvider>
//   </React.StrictMode>,
//  document.getElementById('root')
// );
  root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThirdwebProvider activeChain={activeChain}>
        <App />
      </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
