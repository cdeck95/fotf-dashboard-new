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
import plushy from "../assets/plushy.jpg";
import { useState, useEffect } from "react";

interface PlushyProps {
    isSmallScreen: boolean;
}

function Plushy(props: PlushyProps) {

    const theme = useTheme();
    const isFullScreen = useMediaQuery(theme.breakpoints.up(1800));
    const isSmallScreen = props.isSmallScreen;
    console.log(`Is 1920:  ${isFullScreen}`);


    return (
        <Box className={isSmallScreen ? "row-between-mobile" : "row-between"} sx={{height: "100%", overflowY: "auto", width: "100%", marginBottom: isSmallScreen? "0px": "0px", paddingTop: isSmallScreen? "0px": "0px", paddingBottom: isSmallScreen? "0px": "0px", paddingLeft: "0px", paddingRight: "0px", backgroundColor: "#fff", borderRadius: "10px"}}>
            <Box className="half-col">
                <img src={plushy} alt="Plushies" className={isSmallScreen ? "plushyImage" : "plushyImage"}/>
            </Box>
            <Box className="half-col" sx={{paddingLeft: "10px"}}>
                <Typography className={isSmallScreen ? "page-header-small-mobile" : "page-header-small"}> 
                    Ted Plushy Launch
                </Typography>
                <Typography sx={{fontSize: "1rem"}}>
                    <span className="accent-text">$44.99</span> Collectors Box Edition Pre-Order
                </Typography>
                <Typography sx={{fontSize: "1rem"}}>
                    <span className="accent-text">$9.99</span> / Individual Teddy Plushy Pre-Order
                </Typography>
                <Typography className="small-text">
                    Who doesn't love a Teddy Bear? Stitched with large eyes, large face, tiny ears, non-toxic soft and silky plush fabric, soft huggable body and machine washable.
                </Typography>
                <Button className="dashboard-button" variant="contained" color="primary" onClick={() => window.open("https://shopfotf.com/")}>
                    Get Your Plushy
                </Button>
            </Box>
        </Box>
    );
}

export default Plushy;
