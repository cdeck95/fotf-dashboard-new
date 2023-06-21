import { Box, Button, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { ThirdwebProvider, coinbaseWallet, localWallet, metamaskWallet, safeWallet, useAddress, walletConnect } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import ComingSoon from "./ComingSoon";
import { ethers, BigNumber } from "ethers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PolygonPropsNoNav } from "./Dashboard";
import { Ethereum, Polygon } from "@thirdweb-dev/chains";
import AssetOverview from "../components/AssetOverview";
import HoneyEarnings from "../components/HoneyEarnings";
import TeddiesDashboard from "../components/TeddiesDashboard";
import HoneyDashboard from "../components/HoneyDashboard";
import tedMintLogo from "../assets/tedMint.png"


function HoneyExchange(props: PolygonPropsNoNav) {
    useTitle("FOTF | Honey Exchange");
    //const theme = useTheme();
    //const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
    const sdk = useSDK();
    const provider = sdk?.getProvider();
    const address = useAddress();

    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [errorCode, setErrorCode] = useState(0);
    const theme = useTheme();
    const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
    console.log(`Mobile:  ${isMobile}`);

    const tokens = props.tokenProps.tokens;

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

    const isLoadingAITedContract = tokenProps.isLoadingAITedContract;

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

    useEffect(() => {
      if (tokens === undefined) {
        return;
      }
      if (tokens!.Teds === undefined) {
        console.log("no teds");
      } else {
        if (tokens!.Teds?.tokens !== undefined) {
          setTotalFuryTedsEarnings(
            tokens!.Teds?.tokens.length * TedsDailyEarnings
          );
        }
      }
  
      if (tokens!.Teddies === undefined) {
        console.log("no teddies");
      } else {
        if (tokens!.Teddies?.tokens !== undefined) {
          setTotalTeddiesEarnings(
            tokens!.Teddies?.tokens.length * TeddiesDailyEarnings
          );
        }
      }
    }, [tokens]);
  

    const TedsDailyEarnings = 25;
    const TeddiesDailyEarnings = 35;

    const [totalFuryTedsEarnings, setTotalFuryTedsEarnings] = useState(0);
    const [totalTeddiesEarnings, setTotalTeddiesEarnings] = useState(0);
    const totalHNYEarnings = totalFuryTedsEarnings + totalTeddiesEarnings;

    return (
      <Box className={isSmallScreen? "inner-container-mobile" : "inner-container"} sx={{zIndex: "1 !important", position: "relative"}}>
        {/* <Box
          sx={{
            height: isSmallScreen ? "100dvh" : "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            zIndex: "1 !important",
          }}
        > */}
          <Box className="row-left">
              {!isSmallScreen && <Typography className="page-header-small">
                $HNY Exchange
              </Typography>}
            </Box>
          <Box className="dashboard-inner-container">
            <Box className={isSmallScreen? "column-center-full-container" : "row-space-around-dashboard"}>
              <ComingSoon/>
            </Box>
            <Box className={isSmallScreen? "column-center-full-container" : "row-space-around-dashboard"}>
              <Box className={isSmallScreen? "column-center-full" : "col-large-dashboard"}>
                <HoneyEarnings
                      totalHNYEarnings={totalHNYEarnings}
                      totalTeddiesEarnings={totalTeddiesEarnings}
                      totalFuryTedsEarnings={totalFuryTedsEarnings}
                    />
              </Box>
              <Box className={isSmallScreen? "column-center-full" : "col-large-dashboard"}>
                <HoneyDashboard tokenProps={props.tokenProps} isSmallScreen={isSmallScreen} />
              </Box>
            </Box>
            <Box className={isSmallScreen? "column-center-full-container-last" : "row-space-around-dashboard"}>
              <Box sx={{height: "100%", width: "100%", paddingLeft: "5px", paddingRight: "5px", backgroundColor: "#fff", borderRadius: "10px", overflowY: "auto", position: "relative"}}>
                  <Box className="first-row-space-around-honey">
                    <Typography className="page-header-small-mobile">
                        Quick Purchase Amounts w/ Bonus
                    </Typography>
                  </Box>
                  <Box className="row-space-around-honey">
                      <Box className="column-between-honey">
                        <Box className="row-space-around-honey">
                          <Box className="column-between-honey">
                            <img src={tedMintLogo} alt="honey pot" className={isSmallScreen ? "honeyImage-mobile" : "honeyImage"}/>
                          </Box>
                          <Box className="column-between-honey">
                            <Typography>AI Ted Mint</Typography>
                            <Typography>100,000 $HNY</Typography>
                            <Button className="dashboard-button" disabled={(tokenProps.honeyPotPrice.toString()==="-10" || !canBuyPot)} variant="contained" color="primary" onClick={() => buyHoneyPot()} sx={{ marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}}>
                              {isLoadingAITedContract
                                ? <CircularProgress size={20} color="inherit" />
                                : <Button sx={{ fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}}>Mint Now</Button>
                              }
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                      <Box className="column-between-honey">
                        <Box className="row-space-around-honey">
                          <Box className="column-between-honey">
                            <img src={tedMintLogo} alt="honey pot" className={isSmallScreen ? "honeyImage-mobile" : "honeyImage"}/>
                          </Box>
                          <Box className="column-between-honey">
                            <Typography>AI Ted Mint</Typography>
                            <Typography>100,000 $HNY</Typography>
                            <Button className="dashboard-button" disabled={(tokenProps.honeyPotPrice.toString()==="-10" || !canBuyPot)} variant="contained" color="primary" onClick={() => buyHoneyPot()} sx={{ marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}}>
                              {isLoadingAITedContract
                                ? <CircularProgress size={20} color="inherit" />
                                : <Button sx={{ fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}}>Mint Now</Button>
                              }
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                      <Box className="column-between-honey">
                        <Box className="row-space-around-honey">
                          <Box className="column-between-honey">
                            <img src={tedMintLogo} alt="honey pot" className={isSmallScreen ? "honeyImage-mobile" : "honeyImage"}/>
                          </Box>
                          <Box className="column-between-honey">
                            <Typography>AI Ted Mint</Typography>
                            <Typography>100,000 $HNY</Typography>
                            <Button className="dashboard-button" disabled={(tokenProps.honeyPotPrice.toString()==="-10" || !canBuyPot)} variant="contained" color="primary" onClick={() => buyHoneyPot()} sx={{ marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}}>
                              {isLoadingAITedContract
                                ? <CircularProgress size={20} color="inherit" />
                                : <Button sx={{ fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}}>Mint Now</Button>
                              }
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                      <Box className="column-between-honey">
                        <Box className="row-space-around-honey">
                          <Box className="column-between-honey">
                            <img src={tedMintLogo} alt="honey pot" className={isSmallScreen ? "honeyImage-mobile" : "honeyImage"}/>
                          </Box>
                          <Box className="column-between-honey">
                            <Typography>AI Ted Mint</Typography>
                            <Typography>100,000 $HNY</Typography>
                            <Button className="dashboard-button" disabled={(tokenProps.honeyPotPrice.toString()==="-10" || !canBuyPot)} variant="contained" color="primary" onClick={() => buyHoneyPot()} sx={{ marginTop: isSmallScreen? "0px": "5px", fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}}>
                              {isLoadingAITedContract
                                ? <CircularProgress size={20} color="inherit" />
                                : <Button sx={{ fontSize: isSmallScreen? ".80rem !important" : "1rem !important"}}>Mint Now</Button>
                              }
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                  </Box>  

              </Box>
            </Box>
          </Box>
        {/* </Box> */}
      </Box>
    );
}

export default HoneyExchange;
