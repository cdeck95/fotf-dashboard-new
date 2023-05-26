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

function TeddiesDashboard(props: PolygonPropsNoNav) {

    const teddyNFTs = props.tokenProps.tokens.Teddies?.tokens;
    const isLoadingTeddy = props.tokenProps.isLoadingTeddy;

    const theme = useTheme();
    const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
    const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
    const [isSmallScreen, setSmallScreen] = useState(false);

    useEffect(() => {
        if (!isMobile && isMediumLarge) {
          setSmallScreen(true);
        } else {
          setSmallScreen(isMobile);
        }
      }, [isMobile, isMediumLarge, isSmallScreen]);

    const navigate = useNavigate();

    return (
        <Box sx={{height: "auto", width: "100%", paddingLeft: "10px", paddingRight: "10px", backgroundColor: "#fff", borderRadius: "10px"}}>
            <Typography className="page-header-dashboard">
                Teddies by FOTF
            </Typography>
            <Box className="row-space-between" sx={{ height: "180px" }}>
                <NFTList tokens={teddyNFTs!} isLoading={isLoadingTeddy} />
            </Box>  
            <Box className="row-center">
                <Button className="dashboard-button" variant="contained" color="primary" onClick={() => navigate("/TeddyClaims")} sx={{marginBottom: "10px", padding: "8px !important", marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".90rem !important" : "1rem !important"}}>
                    Head to Teddy $HNY Claims
                </Button>
            </Box>  
        </Box>
    );
}

export default TeddiesDashboard;
