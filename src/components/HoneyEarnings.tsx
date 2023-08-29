import { Box, Button, Chip, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export interface HoneyEarningsProps {
    totalFuryTedsEarnings: number;
    totalTeddiesEarnings: number;
    totalHNYEarnings: number;
}
  

function HoneyEarnings(props: HoneyEarningsProps) {

    // const {isLoadingOneOfOne, isLoadingBirthCerts, tokens: ethTokens } = LoadETHAccountDetails(); 
    // console.log(isLoadingOneOfOne);
    // console.log(isLoadingBirthCerts);
    // console.log(ethTokens);
    const theme = useTheme();
    const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
    const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
    const [isSmallScreen, setSmallScreen] = useState(false);

    const { totalHNYEarnings, totalTeddiesEarnings, totalFuryTedsEarnings } = props;

    useEffect(() => {
        if (!isMobile && isMediumLarge) {
          setSmallScreen(true);
        } else {
          setSmallScreen(isMobile);
        }
      }, [isMobile, isMediumLarge, isSmallScreen]);

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
    const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
    const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");

    const navigate = useNavigate();

    return (
        <Box sx={{width: "100%", height: "100%", padding: "10px", backgroundColor: "#fff", borderRadius: "10px", marginTop: isSmallScreen? "10px" : "0px"}}>
            <Box className="row-space-between">
                <Typography className="page-header-small">
                    My Earnings - $HNY
                </Typography>
            </Box>
            <Box className="row-space-between" sx={{height: "80%"}}>
                <Box className="column-between-dashboard">
                    <Divider sx={{ paddingBottom: "31px", paddingTop: "11px", opacity: "0"}}><Chip label="" /></Divider>
                    <Typography className="honey-earnings-dashboard" sx={{ paddingBottom: "15px"}}>
                        <span className="accent-text">{totalHNYEarnings}</span><br/><span className={isSmallScreen ? "perDay-mobile" : "perDay"}> Per Day</span> 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary" 
                    sx={{ marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}} onClick={() => navigate("/TheFactory")}>
                        Visit The Factory
                    </Button>
                </Box>
                <Box className="column-between-dashboard">
                    {/* <Typography className="honey-earnings-title"> Teddies by FOTF </Typography> */}
                    <Divider sx={{ paddingBottom: "31px", paddingTop: "11px"}}><Chip label="Teddies by FOTF" /></Divider>
                    <Typography className="honey-earnings-dashboard" sx={{ paddingBottom: "15px"}}>
                        {totalTeddiesEarnings}<br/><span className={isSmallScreen ? "perDay-mobile" : "perDay"}> Per Day</span> 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary" sx={{ marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}} onClick={() => navigate("/TheFactory")}>
                        Burn Teddies
                    </Button>
                </Box>
                <Box className="column-between-dashboard">
                    {/* <Typography className="honey-earnings-title"> Fury Teds </Typography> */}
                    <Divider sx={{ paddingBottom: "31px", paddingTop: "11px"}}><Chip label="Fury Teds" /></Divider>
                    <Typography className="honey-earnings-dashboard" sx={{ paddingBottom: "15px"}}>
                        {totalFuryTedsEarnings}<br/><span className={isSmallScreen ? "perDay-mobile" : "perDay"}> Per Day</span> 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary" sx={{ marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}} onClick={() => navigate("/TheFactory")}>
                        Burn Fury Teds
                    </Button>
                </Box>
            </Box>    
        </Box>
    );
}

export default HoneyEarnings;
