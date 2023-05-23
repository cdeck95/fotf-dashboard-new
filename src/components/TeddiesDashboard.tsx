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
import { useNavigate } from "react-router-dom";

function TeddiesDashboard(props: PolygonPropsNoNav) {

    const teddyNFTs = props.tokenProps.tokens.Teddies?.tokens;
    const isLoadingTeddy = props.tokenProps.isLoadingTeddy;

    const navigate = useNavigate();

    return (
        <Box sx={{width: "50%", height: "100%", paddingLeft: "5px", paddingRight: "5px"}}>
            <Typography className="page-header-dashboard">
                Teddy Staking
            </Typography>
            <Box className="row-space-between" sx={{ height: "180px", marginBottom: "10px" }}>
                <NFTList tokens={teddyNFTs!} isLoading={isLoadingTeddy} />
            </Box>  
            <Box className="row-center">
                <Button className="dashboard-button" variant="contained" color="primary" onClick={() => navigate("/TeddyClaims")}>
                    Head to Teddy $HNY Claims
                </Button>
            </Box>  
        </Box>
    );
}

export default TeddiesDashboard;
