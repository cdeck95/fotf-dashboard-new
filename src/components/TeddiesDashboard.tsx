import { Box, Button, CircularProgress, Skeleton, Typography } from "@mui/material";
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
import LoadingDialog from "./LoadingDialog";

function TeddiesDashboard(props: PolygonPropsNoNav) {

    const teddyNFTs = props.tokenProps.tokens.Teddies?.tokens;
    const isLoadingTeddy = props.tokenProps.isLoadingTeddy;

    return (
        <Box sx={{width: "50%", height: "100%", paddingLeft: "5px", paddingRight: "5px"}}>
            <Typography className="page-header">
                Teddy Staking
            </Typography>
            <Box className="row-space-between" sx={{ height: "200px" }}>
                <NFTList tokens={teddyNFTs!} isLoading={isLoadingTeddy} />
            </Box>  
            <Box className="row-center">
                <Button className="dashboard-button" variant="contained" color="primary">
                    Head to Teddy Staking
                </Button>
            </Box>  
        </Box>
    );
}

export default TeddiesDashboard;