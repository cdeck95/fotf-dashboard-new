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
import honeyJar from "../assets/honey_jar.png";
import honeyPot from "../assets/honey_pot.png";
import honeyStash from "../assets/honey_stash.png";

function HoneyDashboard() {

    return (
        <Box sx={{width: "50%", height: "auto", paddingLeft: "5px", paddingRight: "5px"}}>
            <Typography className="page-header-small">
                Quick Purchase Amounts w/ Bonus
            </Typography>
            <Box className="row-space-around-dashboard" sx={{ height: "220px" }}>
                <Box className="column-between-dashboard">
                    <img src={honeyJar} alt="honey jar" className="honeyImage"/>
                    <Button className="dashboard-button" variant="contained" color="primary">
                        50,000
                    </Button>
                </Box>
                <Box className="column-between-dashboard">
                    <img src={honeyPot} alt="honey pot" className="honeyImage"/>
                    <Button className="dashboard-button" variant="contained" color="primary">
                        110,000
                    </Button>
                </Box>
                <Box className="column-between-dashboard">
                    <img src={honeyStash} alt="honey stash" className="honeyImage"/>
                    <Button className="dashboard-button" variant="contained" color="primary">
                        220,000
                    </Button>
                </Box>
            </Box>  
        </Box>
    );
}

export default HoneyDashboard;
