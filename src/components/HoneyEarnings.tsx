import { Box, Button, Chip, Divider, Typography } from "@mui/material";
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

export interface HoneyEarningsProps {
    totalFuryTedsEarnings: number;
    totalTeddiesEarnings: number;
    totalHNYEarnings: number;
}
  

function HoneyEarnings(props: HoneyEarningsProps) {

    const {honeyBalance, isLoadingOneOfOne, isLoadingBirthCerts, tokens: ethTokens } = LoadETHAccountDetails(); 
    console.log(honeyBalance);
    console.log(isLoadingOneOfOne);
    console.log(isLoadingBirthCerts);
    console.log(ethTokens);

    const { totalHNYEarnings, totalTeddiesEarnings, totalFuryTedsEarnings } = props;

    const navigate = useNavigate();

    return (
        <Box sx={{width: "100%", height: "auto", paddingLeft: "10px", paddingRight: "10px", backgroundColor: "#fff", borderRadius: "10px"}}>
            <Typography className="page-header-small">
                My Earnings
            </Typography>
            <Box className="row-space-between">
                <Box className="column-between-dashboard">
                    <Divider sx={{ paddingBottom: "31px", paddingTop: "11px", opacity: "0"}}><Chip label="" /></Divider>
                    <Typography className="honey-earnings-dashboard" sx={{ paddingBottom: "15px"}}>
                        <span className="accent-text">{totalHNYEarnings}</span><br/><span className="perDay"> Per Day</span> 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary" sx={{ marginTop: "5px"}} onClick={() => navigate("/TheFactory")}>
                        Visit The Factory
                    </Button>
                </Box>
                <Box className="column-between-dashboard">
                    {/* <Typography className="honey-earnings-title"> Teddies by FOTF </Typography> */}
                    <Divider sx={{ paddingBottom: "31px", paddingTop: "11px"}}><Chip label="Teddies by FOTF" /></Divider>
                    <Typography className="honey-earnings-dashboard" sx={{ paddingBottom: "15px"}}>
                        {totalTeddiesEarnings}<br/><span className="perDay"> Per Day</span> 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary" sx={{ marginTop: "5px"}} onClick={() => navigate("/TeddyMint")}>
                        Purchase More Teddies
                    </Button>
                </Box>
                <Box className="column-between-dashboard">
                    {/* <Typography className="honey-earnings-title"> Fury Teds </Typography> */}
                    <Divider sx={{ paddingBottom: "31px", paddingTop: "11px"}}><Chip label="Fury Teds" /></Divider>
                    <Typography className="honey-earnings-dashboard" sx={{ paddingBottom: "15px"}}>
                        {totalFuryTedsEarnings}<br/><span className="perDay"> Per Day</span> 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary" sx={{ marginTop: "5px"}} onClick={() => navigate("/TedMint")}>
                        Purchase Fury Teds
                    </Button>
                </Box>
            </Box>    
        </Box>
    );
}

export default HoneyEarnings;
