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

function HoneyEarnings() {

    const {honeyBalance, isLoadingOneOfOne, isLoadingBirthCerts, tokens: ethTokens } = LoadETHAccountDetails(); 
    console.log(honeyBalance);
    console.log(isLoadingOneOfOne);
    console.log(isLoadingBirthCerts);
    console.log(ethTokens);

    return (
        <Box sx={{width: "50%", height: "auto"}}>
            <Typography className="page-header-small">
                My Earnings
            </Typography>
            <Box className="row-space-between">
                <Box className="column-center-dashboard">
                    <Divider sx={{ paddingBottom: "15px", opacity: "0"}}><Chip label="" /></Divider>
                    <Typography className="honey-earnings-dashboard">
                        <span className="accent-text">7,500</span><br/><span className="perDay"> Per Day</span> 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary">
                        Visit The Factory
                    </Button>
                </Box>
                <Box className="column-center-dashboard">
                    {/* <Typography className="honey-earnings-title"> Teddies by FOTF </Typography> */}
                    <Divider sx={{ paddingBottom: "15px"}}><Chip label="Teddies by FOTF" /></Divider>
                    <Typography className="honey-earnings-dashboard">
                        4,500<br/><span className="perDay"> Per Day</span> 
                    </Typography>
                    <Button className="dashboard-button" variant="contained" color="primary">
                        Stake Your Teddies
                    </Button>
                </Box>
                <Box className="column-center-dashboard">
                    {/* <Typography className="honey-earnings-title"> Fury Teds </Typography> */}
                    <Divider sx={{ paddingBottom: "15px"}}><Chip label="Fury Teds" /></Divider>
                    <Typography className="honey-earnings-dashboard">
                        3,000<br/><span className="perDay"> Per Day</span> 
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
