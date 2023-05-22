import { Box } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import {
  ThirdwebProvider,
  coinbaseWallet,
  localWallet,
  metamaskWallet,
  safeWallet,
  useAddress,
  walletConnect,
} from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import { LoadETHAccountDetails } from "../account/loadETHAccountDetails";
import { PolygonProps } from "../views/Dashboard";
import { Ethereum, Polygon, Mumbai } from "@thirdweb-dev/chains";
import AssetOverviewDashboard from "./AssetOverviewDashboard";

function AssetOverview(props: PolygonProps) {
  return (
    <ThirdwebProvider
      key={"ethThirdWebProvider"}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        localWallet(),
        safeWallet(),
      ]}
      activeChain={Ethereum}
      supportedChains={[Polygon, Ethereum]}
    >
      <AssetOverviewDashboard
        tokenProps={props.tokenProps}
        leftNavOpen={props.leftNavOpen}
        rightNavOpen={props.rightNavOpen}
      />
    </ThirdwebProvider>
  );
}

export default AssetOverview;
