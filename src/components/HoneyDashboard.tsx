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
import honeyJar from "../assets/honey_jar.png";
import honeyPot from "../assets/honey_pot.png";
import honeyStash from "../assets/honey_stash.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorDialog from "./ErrorDialog";

const IS_DISABLED = true;

function HoneyDashboard() {

    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [errorCode, setErrorCode] = useState(0);
    const theme = useTheme();
    const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
    const isLarge = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXL = !useMediaQuery(theme.breakpoints.down("xl"));
    const isFullScreen = useMediaQuery(theme.breakpoints.up(1800));
    const [isSmallScreen, setSmallScreen] = useState(false);
    console.log(`Mobile:  ${isMobile}`);
    console.log(`Small:  ${isSmall}`);
    console.log(`Medium:  ${isMedium}`);
    console.log(`Medium-Large:  ${isMediumLarge}`);
    console.log(`Large:  ${isLarge}`);
    console.log(`XL:  ${isXL}`);
    console.log(`Is 1920:  ${isFullScreen}`);

    useEffect(() => {
        if (!isMobile && isMediumLarge) {
          setSmallScreen(true);
        } else {
          setSmallScreen(isMobile);
        }
      }, [isMobile, isMediumLarge, isSmallScreen]);


    const handleErrorClose = () => {
        setShowError(false);
      };

    function buyHoneyJar() {
        console.log("buy honey jar clicked");
        if(IS_DISABLED) {
          setShowError(true);
          setErrorCode(4);
          return;
        }  
    }

    function buyHoneyPot() {
        console.log("buy honey pot clicked");
        if(IS_DISABLED) {
          setShowError(true);
          setErrorCode(4);
          return;
        }  
    }

    function buyHoneyStash() {
        console.log("buy honey stash clicked");
        if(IS_DISABLED) {
          setShowError(true);
          setErrorCode(4);
          return;
        }  
    }


    return (
        <Box sx={{height: "auto", width: "100%", paddingLeft: "10px", paddingRight: "10px", backgroundColor: "#fff", borderRadius: "10px"}}>
            <Typography className="page-header-small-mobile">
                Quick Purchase Amounts w/ Bonus
            </Typography>
            <Box className="row-space-around-dashboard" sx={{ height: "220px" }}>
                <Box className="column-between-dashboard">
                    <img src={honeyJar} alt="honey jar" className={isSmallScreen ? "honeyImage-mobile" : "honeyImage"}/>
                    <Button className="dashboard-button" variant="contained" color="primary" onClick={() => buyHoneyJar()}>
                        50,000
                    </Button>
                </Box>
                <Box className="column-between-dashboard">
                    <img src={honeyPot} alt="honey pot" className={isSmallScreen ? "honeyImage-mobile" : "honeyImage"}/>
                    <Button className="dashboard-button" variant="contained" color="primary" onClick={() => buyHoneyPot()}>
                        110,000
                    </Button>
                </Box>
                <Box className="column-between-dashboard">
                    <img src={honeyStash} alt="honey stash" className={isSmallScreen ? "honeyImage-mobile" : "honeyImage"}/>
                    <Button className="dashboard-button" variant="contained" color="primary" onClick={() => buyHoneyStash()}>
                        220,000
                    </Button>
                </Box>
            </Box>  

            <ErrorDialog
                open={showError}
                handleClose={handleErrorClose}
                errorCode={errorCode}
                collection={"Honey Exchange"}
            />
        </Box>
    );
}

export default HoneyDashboard;
