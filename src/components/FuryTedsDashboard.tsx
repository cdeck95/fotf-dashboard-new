import { Box, Button, Typography } from "@mui/material";
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
import NFTList from "./NFTList";

function FuryTedsDashboard(props: PolygonPropsNoNav) {

    const tedNFTs = props.tokenProps.tokens.Teds?.tokens;

    return (
        <Box sx={{width: "50%", height: "100%"}}>
            <Typography className="page-header">
                Fury Teds
            </Typography>
            <Box className="row-space-between">
                <NFTList tokens={tedNFTs!} />
            </Box>  
            <Box className="row-center">
                <Button className="dashboard-button" variant="contained" color="primary">
                    Head to Fury Ted $HNY Claim
                </Button>
            </Box>  
        </Box>
    );
}

export default FuryTedsDashboard;
