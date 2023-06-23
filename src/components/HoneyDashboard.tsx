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
import { BigNumber, ethers } from "ethers";

const IS_DISABLED = true;

function HoneyDashboard(props: PolygonPropsNoNav) {
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [errorCode, setErrorCode] = useState(0);
    const theme = useTheme();
    const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
    console.log(`Mobile:  ${isMobile}`);

    const tokenProps = props.tokenProps;
    const isSmallScreen = props.isSmallScreen;

    const isLoadingHoneyExchangeContract = tokenProps.isLoadingHoneyExchangeContract;
    console.log(`isLoadingHoneyExchangeContract: ${isLoadingHoneyExchangeContract}`)

    const exchangeRate = ethers.utils.formatEther(tokenProps.exchangeRate);
    const honeyJarPrice = ethers.utils.formatEther(tokenProps.honeyJarPrice);
    const honeyPotPrice = ethers.utils.formatEther(tokenProps.honeyPotPrice);
    const honeyStashPrice = ethers.utils.formatEther(tokenProps.honeyStashPrice);

    console.log(exchangeRate);
    console.log(honeyJarPrice);
    console.log(honeyPotPrice);
    console.log(honeyStashPrice);

    const honeyPotAmount = BigNumber.from(tokenProps.honeyPotPrice).mul(tokenProps.exchangeRate).div(BigNumber.from(10).pow(18));
    //jar gets 10% bonus
    const honeyJarAmount = BigNumber.from(tokenProps.honeyJarPrice).mul(tokenProps.exchangeRate).div(BigNumber.from(10).pow(18));
    const honeyJarAmountWithBonus = honeyJarAmount.mul(11).div(10);
    //stash gets 20% bonus
    const honeyStashAmount = BigNumber.from(tokenProps.honeyStashPrice).mul(tokenProps.exchangeRate).div(BigNumber.from(10).pow(18));
    const honeyStashAmountWithBonus = honeyStashAmount.mul(12).div(10);

    const buyHoneyJar = tokenProps.buyHoneyJar!;
    const buyHoneyPot = tokenProps.buyHoneyPot!;
    const buyHoneyStash = tokenProps.buyHoneyStash!;

    const maticBalance = parseInt(tokenProps.maticBalance);

    const [canBuyJar, setCanBuyJar] = useState(false);
    const [canBuyPot, setCanBuyPot] = useState(false);
    const [canBuyStash, setCanBuyStash] = useState(false);

    useEffect(() => {
      if(maticBalance < 20) {
        setCanBuyJar(false);
      } else {
        setCanBuyJar(true);
      }
      if(maticBalance < 40) {
        setCanBuyPot(false);
      } else {
        setCanBuyPot(true);
      }
      if(maticBalance < 80) {
        setCanBuyStash(false);
      } else {
        setCanBuyStash(true);
      }
      
    }, [maticBalance]);

    const handleErrorClose = () => {
        setShowError(false);
      };

    return (
        <Box sx={{display: "flex", flexDirection: "column", height: "100%", width: "100%", paddingLeft: "5px", paddingRight: "5px", paddingBottom: "10px", backgroundColor: "#fff", borderRadius: "10px"}}>
            <Box className="first-row-space-around-honey">
              <Typography className="page-header-small-mobile">
                  Quick Purchase Amounts w/ Bonus
              </Typography>
            </Box>
            <Box className="row-space-even-honey" sx={{height: "100%"}}>
                <Box className="column-between-honey">
                    <img src={honeyPot} alt="honey pot" className={isSmallScreen ? "honeyImage-mobile" : "honeyImage"}/>
                    <Button className="dashboard-button" disabled={(tokenProps.honeyPotPrice.toString()==="-10" || !canBuyPot)} variant="contained" color="primary" onClick={() => buyHoneyPot()} sx={{ marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".79rem !important" : "1rem !important"}}>
                      {isLoadingHoneyExchangeContract
                        ? <CircularProgress size={20} color="inherit" />
                        : <Typography sx={{ fontSize: isSmallScreen? ".79rem !important" : "1rem !important"}}>{new Intl.NumberFormat("en-US", { minimumIntegerDigits: 1, notation: 'compact'}).format(parseInt(honeyPotAmount.toString()))} $HNY - {new Intl.NumberFormat("en-US", { minimumIntegerDigits: 2 }).format(parseInt(honeyPotPrice))} MATIC</Typography>
                       }
                    </Button>
                </Box>
                <Box className="column-between-honey">
                    <img src={honeyJar} alt="honey jar" className={isSmallScreen ? "honeyImage-mobile" : "honeyImage"}/>
                    <Button className="dashboard-button" disabled={(tokenProps.honeyJarPrice.toString()==="-10" || !canBuyJar)} variant="contained" color="primary" onClick={() => buyHoneyJar()} sx={{ marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".79rem !important" : "1rem !important"}}>
                      {isLoadingHoneyExchangeContract
                        ? <CircularProgress size={20} color="inherit" />
                        : <Typography sx={{ fontSize: isSmallScreen? ".79rem !important" : "1rem !important"}}>{new Intl.NumberFormat("en-US", { minimumIntegerDigits: 1, notation: 'compact' }).format(parseInt(honeyJarAmountWithBonus.toString()))} $HNY - {new Intl.NumberFormat("en-US", { minimumIntegerDigits: 2 }).format(parseInt(honeyJarPrice))} MATIC</Typography>
                      }
                    </Button>
                </Box>
                <Box className="column-between-honey">
                    <img src={honeyStash} alt="honey stash" className={isSmallScreen ? "honeyImage-mobile" : "honeyImage"}/>
                    <Button className="dashboard-button" disabled={(tokenProps.honeyStashPrice.toString()==="-10" || !canBuyStash)} variant="contained" color="primary" onClick={() => buyHoneyStash()} sx={{ marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".79rem !important" : "1rem !important"}}>
                      {isLoadingHoneyExchangeContract
                        ? <CircularProgress size={20} color="inherit" />
                        : <Typography sx={{ fontSize: isSmallScreen? ".79rem !important" : "1rem !important"}}>{new Intl.NumberFormat("en-US", { minimumIntegerDigits: 1, notation: 'compact' }).format(parseInt(honeyStashAmountWithBonus.toString()))} $HNY - {new Intl.NumberFormat("en-US", { minimumIntegerDigits: 2 }).format(parseInt(honeyStashPrice))} MATIC</Typography>
                      }
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
