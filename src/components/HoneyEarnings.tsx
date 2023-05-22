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
import { PolygonProps } from "../views/Dashboard";

function HoneyEarnings() {

    const {honeyBalance, isLoadingOneOfOne, isLoadingBirthCerts, tokens: ethTokens } = LoadETHAccountDetails(); 
    console.log(honeyBalance);
    console.log(isLoadingOneOfOne);
    console.log(isLoadingBirthCerts);
    console.log(ethTokens);

    return (
        <Box sx={{width: "50%", height: "100%"}}>
            <Typography className="page-header">
                My Earnings
            </Typography>
            <Box className="row-space-between">
                <Box className="column-between">
                    <Typography>
                        7,500 $HNY Per Day 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary">
                        Visit The Factory
                    </Button>
                </Box>
                <Box className="column-between">
                    <Typography>
                        Teddies by FOTF<br/>
                        4,500 $HNY Per Day 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary">
                        Stake Your Teddies
                    </Button>
                </Box>
                <Box className="column-between">
                    <Typography>
                        Fury Teds<br/>
                        3,000 $HNY Per Day 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary">
                        Purchase Fury Teds
                    </Button>
                </Box>
            </Box>    
        </Box>
    );
}

export default HoneyEarnings;
