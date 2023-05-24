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
import { PolygonProps, PolygonPropsNoNav } from "../views/Dashboard";
import { Ethereum, Polygon, Mumbai } from "@thirdweb-dev/chains";
import AssetOverviewDashboard from "./AssetOverviewDashboard";
import AssetOverviewSidebar from "./AssetOverviewSidebar";
import { PolygonAccountDetails } from "../account/loadPolygonAccountDetails";

interface AssetOverviewPropsTop {
  tokenProps: PolygonAccountDetails;
  forSidebar: boolean;
}

function AssetOverview(props: AssetOverviewPropsTop) {

  const { tokenProps, forSidebar } = props;
  const ethTokenProps = LoadETHAccountDetails(); 
  console.log(ethTokenProps);

  return (
    <Box  sx={{height: "auto", width: "auto", paddingLeft: "5px", paddingRight: "5px"}}>
      {forSidebar ? (
        <AssetOverviewSidebar
        tokenProps={tokenProps}
        ethTokenProps={ethTokenProps}/>
      )
      : (
        <AssetOverviewDashboard
        tokenProps={tokenProps}
        ethTokenProps={ethTokenProps}/>
      )}
    </Box>
   
      
  );
}

export default AssetOverview;
