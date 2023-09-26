import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider, ConnectWallet, metamaskWallet, coinbaseWallet, walletConnect, localWallet, safeWallet, walletConnectV1 } from "@thirdweb-dev/react";
import { Ethereum, Polygon, Mumbai } from "@thirdweb-dev/chains";
import "./styles/globals.css";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
//const activeChain = Ethereum;
// const activeChain = ChainId.Mainnet;

const container = document.getElementById("root");
const root = createRoot(container!);

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
  const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
  const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");
  
  root.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* walletConnect() */}
      <ThirdwebProvider supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect(), localWallet(), safeWallet()]}
        activeChain={Polygon}
        supportedChains={[Polygon, Ethereum]}
        clientId="373b1cf6f7ae2a429f8359ddd03a40a2"
        key={"polygonThirdWebProvider"}>
        <App />
      </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
