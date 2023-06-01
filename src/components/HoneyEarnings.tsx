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

    const navigate = useNavigate();

    return (
        <Box sx={{width: "100%", height: "100%", overflowY: "auto", paddingLeft: "5px", paddingRight: "5px", backgroundColor: "#fff", borderRadius: "10px"}}>
            <Typography className="page-header-small">
                My Earnings
            </Typography>
            <Box className="row-space-between">
                <Box className="column-between-dashboard" sx={{marginTop: "-20px"}}>
                    <Divider sx={{ paddingBottom: "31px", paddingTop: "11px", opacity: "0"}}><Chip label="" /></Divider>
                    <Typography className="honey-earnings-dashboard" sx={{ paddingBottom: "15px"}}>
                        <span className="accent-text">{totalHNYEarnings}</span><br/><span className={isSmallScreen ? "perDay-mobile" : "perDay"}> Per Day</span> 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary" sx={{ marginBottom: "10px", padding: "8px !important", marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}} onClick={() => navigate("/TheFactory")}>
                        Visit The Factory
                    </Button>
                </Box>
                <Box className="column-between-dashboard" sx={{marginTop: "-20px"}}>
                    {/* <Typography className="honey-earnings-title"> Teddies by FOTF </Typography> */}
                    <Divider sx={{ paddingBottom: "31px", paddingTop: "11px"}}><Chip label="Teddies by FOTF" /></Divider>
                    <Typography className="honey-earnings-dashboard" sx={{ paddingBottom: "15px"}}>
                        {totalTeddiesEarnings}<br/><span className={isSmallScreen ? "perDay-mobile" : "perDay"}> Per Day</span> 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary" sx={{ marginBottom: "10px", padding: "8px !important", marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}} onClick={() => navigate("/TeddyMint")}>
                        Purchase Teddies
                    </Button>
                </Box>
                <Box className="column-between-dashboard" sx={{marginTop: "-20px"}}>
                    {/* <Typography className="honey-earnings-title"> Fury Teds </Typography> */}
                    <Divider sx={{ paddingBottom: "31px", paddingTop: "11px"}}><Chip label="Fury Teds" /></Divider>
                    <Typography className="honey-earnings-dashboard" sx={{ paddingBottom: "15px"}}>
                        {totalFuryTedsEarnings}<br/><span className={isSmallScreen ? "perDay-mobile" : "perDay"}> Per Day</span> 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary" sx={{ marginBottom: "10px", padding: "8px !important", marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}} onClick={() => navigate("/TedMint")}>
                        Purchase Fury Teds
                    </Button>
                </Box>
            </Box>    
        </Box>
    );
}

export default HoneyEarnings;
