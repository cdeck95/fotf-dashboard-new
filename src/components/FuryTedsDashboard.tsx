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

function FuryTedsDashboard(props: PolygonPropsNoNav) {

    const tedNFTs = props.tokenProps.tokens.Teds?.tokens;
    const isLoadingTed = props.tokenProps.isLoadingTed;

    const navigate = useNavigate();
    
    return (
        <Box sx={{height: "auto", width: "100%", padding: "10px", backgroundColor: "#fff", borderRadius: "10px"}}>
            <Typography className="page-header-dashboard">
                Fury Teds
            </Typography>
            <Box className="row-space-between" sx={{ height: "180px" }}>
                <NFTList tokens={tedNFTs!} isLoading={isLoadingTed} />
            </Box>  
            <Box className="row-center">
                <Button className="dashboard-button" variant="contained" color="primary" onClick={() => navigate("/TeddyClaims")}>
                    Head to Fury Ted $HNY Claim
                </Button>
            </Box>  
        </Box>
    );
}

export default FuryTedsDashboard;
