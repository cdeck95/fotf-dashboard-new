import { Box, Button, CircularProgress, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
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
import { useState, useEffect } from "react";

function FuryTedsDashboard(props: PolygonPropsNoNav) {

    const tedNFTs = props.tokenProps.tokens.Teds?.tokens;
    const isLoadingTed = props.tokenProps.isLoadingTed;
    const isSmallScreen = props.isSmallScreen;

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
    const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
    const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");

    const navigate = useNavigate();
    
    return (
        <Box sx={{height: "100%", width: "100%", paddingLeft: "5px", paddingRight: "5px", backgroundColor: "#fff", borderRadius: "10px", overflowY: "auto"}}>
            <Typography className="page-header-dashboard">
                Fury Teds
            </Typography>
            <Box className="row-space-between">
                <NFTList tokens={tedNFTs!} isLoading={isLoadingTed} isSmallScreen={isSmallScreen}/>
            </Box>  
            <Box className="row-center" sx={{ marginBottom: isSmallScreen ? "5px" : "0px" }}>
                <Button className="dashboard-button" variant="contained" color="primary" onClick={() => navigate("/TedClaims")} sx={{marginBottom: "0px", padding: "8px !important", marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".90rem !important" : "1rem !important"}}>
                    Head to Fury Ted $HNY Claim
                </Button>
            </Box>  
        </Box>
    );
}

export default FuryTedsDashboard;
