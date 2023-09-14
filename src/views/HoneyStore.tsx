import { Box, Button, CircularProgress, Divider, IconButton, InputBase, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { ThirdwebProvider, coinbaseWallet, localWallet, metamaskWallet, safeWallet, useAddress, walletConnect } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import ComingSoon from "./ComingSoon";
import { ethers, BigNumber, FixedNumber } from "ethers";
import { useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router";
import { PolygonPropsNoNav } from "./Dashboard";
import { Ethereum, Polygon } from "@thirdweb-dev/chains";
import AssetOverview from "../components/AssetOverview";
import HoneyEarnings from "../components/HoneyEarnings";
import TeddiesDashboard from "../components/TeddiesDashboard";
import HoneyDashboard from "../components/HoneyDashboard";
import tedMintLogo from "../assets/tedMint.png"
import "../styles/HoneyStore.css";
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import ErrorDialog from "../components/ErrorDialog";
import aiTedMintLogo from "../assets/aiTedMint.png";


const IS_DISABLED = true;

function HoneyStore(props: PolygonPropsNoNav) {
    useTitle("FOTF | Honey Store");
    //const theme = useTheme();
    //const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
    const sdk = useSDK();
    const provider = sdk?.getProvider();
    const address = useAddress();

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
    const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
    const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");

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
    const buyHoneyWithMATIC = tokenProps.buyHnyWithMATIC!;

    const maticBalance = parseInt(tokenProps.maticBalance);
    const honeyBalance = tokenProps.honeyBalance;

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

    const TedsDailyEarnings = 25;
    const TeddiesDailyEarnings = 35;

    const [totalFuryTedsEarnings, setTotalFuryTedsEarnings] = useState(0);
    const [totalTeddiesEarnings, setTotalTeddiesEarnings] = useState(0);
    const totalHNYEarnings = totalFuryTedsEarnings + totalTeddiesEarnings;

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
    }, [tokens, tokens.Teds, tokens.Teddies, tokens.Teds?.tokens, tokens.Teddies?.tokens,]);

    const [exchangeInput, setExchangeInput] = useState<BigNumber>(BigNumber.from(0));
    const [honeyForExchange, setHoneyForExchange] = useState<BigNumber>(BigNumber.from(0));

    const handleInput = (e: {
      preventDefault: () => void;
      target: { value: SetStateAction<string> };
    }) => {
      e.preventDefault();
      if(e.target.value === "") {
        setExchangeInput(BigNumber.from(0));
        setHoneyForExchange(BigNumber.from(0));
        return;
      }
      else {
        try {
          setExchangeInput(BigNumber.from(e.target.value));
          setHoneyForExchange(BigNumber.from(e.target.value).mul(BigNumber.from(tokenProps.exchangeRate)));
        } catch (error) {
          console.log(error);
          setShowError(true);
          setErrorCode(12)
          setExchangeInput(BigNumber.from(0));
          setHoneyForExchange(BigNumber.from(0));
        }
      }
    };  

    // const handleReverseInput = (e: {
    //   preventDefault: () => void;
    //   target: { value: SetStateAction<string> };
    // }) => {
    //   e.preventDefault();
    //   if(e.target.value === "") {
    //     setExchangeInput(BigNumber.from(0));
    //     setHoneyForExchange(BigNumber.from(0));
    //     return;
    //   }
    //   else {
    //     try {
    //       const maticFromHoney = FixedNumber.from(e.target.value).divUnsafe(FixedNumber.from(tokenProps.exchangeRate)); 
    //       console.log(maticFromHoney.toString());
    //       setExchangeInput(maticFromHoney);
    //       setHoneyForExchange(BigNumber.from(e.target.value));
    //     } catch (error) {
    //       console.log(error);
    //       setShowError(true);
    //       setErrorCode(12)
    //       setExchangeInput(BigNumber.from(0));
    //       setHoneyForExchange(BigNumber.from(0));
    //     }
    //   }
    // }; 

  function buyFOTFShirt(): void {
    console.log("buy FOTF Shirt clicked");
    if(IS_DISABLED) {
      setShowError(true);
      setErrorCode(4);
      return;
    }  
  }

  function buyCodenameFlavor(): void {
    console.log("buy Codename: Flavor clicked");
    if(IS_DISABLED) {
      setShowError(true);
      setErrorCode(4);
      return;
    }  
  }

  function buyGummies(): void {
    console.log("buy gummies clicked");
    if(IS_DISABLED) {
      setShowError(true);
      setErrorCode(4);
      return;
    }  
  }

  const handleErrorClose = () => {
    setShowError(false);
  };

  function purchaseHoney(): void {
    // console.log("purchase Honey clicked");
    // if(IS_DISABLED) {
    //   setShowError(true);
    //   setErrorCode(4);
    //   return;
    // }  
    if (parseInt(exchangeInput.toString()) > maticBalance) {
      setShowError(true);
      setErrorCode(13);
      return;
    }
    try {
      buyHoneyWithMATIC(exchangeInput);
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorCode(-1)
      setExchangeInput(BigNumber.from(0));
      setHoneyForExchange(BigNumber.from(0));
    }
  }

    return (
      <Box className={isSmallScreen? "inner-container-mobile" : "inner-container-honey-exchange"} sx={{zIndex: "1 !important", position: "relative"}}>
        <Box className="row-left" sx={{marginTop: "10px", marginBottom: "20px"}}>
          {!isSmallScreen && <Typography className="page-header-small">
            $HNY Store
          </Typography>}
        </Box>
        <Box className={isSmallScreen? "column-center-full-container" : "row-space-around-dash"}>
          <Box className={isSmallScreen? "column-center-full-container" : "row-space-around-dash"}>
            <Box className="column-between" sx={{ width: "50%"}}>
              <Box className="row-space-around">
                <Box className="column-around" sx={{padding: "10px"}}>
                  <Typography className="learnMore">Current Balance</Typography>
                  {isLoadingHoneyExchangeContract
                  ? <CircularProgress size="1rem" color="inherit" />
                  : <Typography sx={{fontSize: "2.5rem", margin: 0, padding: 0,
                  marginBlockStart: "0em", marginBlockEnd: "0em"}}>{new Intl.NumberFormat("en-US", { minimumIntegerDigits: 2}).format(parseInt(honeyBalance.toString()))} $HNY</Typography>
                }
                  
                </Box>
              </Box>
              <Box className="row-space-around">
                <Box className="column-even" sx={{padding: "10px"}}>
                  <Typography className="learnMore">Current Exchange Rate</Typography>
                  {isLoadingHoneyExchangeContract
                  ? <CircularProgress size="1rem" color="inherit" />
                  : <Typography sx={{fontSize: "2.5rem", margin: 0, padding: 0,
                  marginBlockStart: "0em", marginBlockEnd: "0em"}}>1 MATIC &rarr; {tokenProps.exchangeRate.toString()} $HNY</Typography>
                  }
                </Box>
              </Box>
            </Box>
            <Box className={isSmallScreen? "honey-exchange-col-full" : "honey-exchange-col"}>
              <Box className="row-exchange" sx={{ justifyContent: "center"}}>
                <Typography sx={{fontSize: "1.5rem"}}>The Store</Typography>
              </Box>
              <Box className="row-exchange"sx={{justifyContent: "center"}}>
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80%" }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, minWidth: "75px"  }}
                    disabled={isLoadingHoneyExchangeContract}
                    type="number"
                    placeholder="0"
                    inputProps={{ 'aria-label': 'Enter MATIC to Purchase $HNY' }}
                    onChange={handleInput}
                    value={exchangeInput.toString()}
                  />
                  <Typography sx={{marginLeft: "5px", marginRight: "5px"}}> MATIC </Typography>
                  <SwapHorizOutlinedIcon sx={{marginLeft: "5px", marginRight: "5px"}}/>
                  <InputBase
                    sx={{ ml: 1, flex: 1, minWidth: "75px" }}
                    disabled={isLoadingHoneyExchangeContract}
                    placeholder="000,000,000"
                    value={honeyForExchange.toString()}
                  />
                  <Typography sx={{marginLeft: "5px", marginRight: "5px"}}> $HNY </Typography>
                </Paper>
              </Box>
              <Box className="row-exchange">
                <Button variant="contained" disabled={isLoadingHoneyExchangeContract} color="primary" className="exchange-button" 
                sx={{ fontSize: "1.5rem" }} onClick={() => purchaseHoney()} >
                  Purchase $HNY
                </Button>
              </Box>
              {/* <Box className="row-exchange"sx={{justifyContent: "space-evenly"}}>
                <Typography>
                  Reminder: Quick Purchase Options () below offer a bonus amount of $HNY for your purchase.
                </Typography>
              </Box> */}
              {/* <Box className="row-exchange"sx={{justifyContent: "space-evenly"}}>
                <Typography>
                  Want to purchase $HNY with fiat? Head just below and grab one of our fiat options.
                </Typography>
              </Box> */}
            </Box>
          </Box>
        </Box>
        <Box className={isSmallScreen? "column-center-full-container" : "row-space-around-dash"} sx={{marginTop: isSmallScreen? "20px" : "0px" }}>
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
        <Box className={isSmallScreen? "column-center-full-container-last" : "row-space-around-dash"}>
          <Box sx={{height: "100%", width: "100%"}}>
              <Box className="row-exchange" sx={{justifyContent: "flex-start"}}>
                <Typography className="page-header-small-mobile">
                    Quick Purchase Amounts w/ Bonus
                </Typography>
              </Box>
              <Box className={isSmallScreen? "column-center-full-container-last" :"row-exchange"}>
                  <Box className="column-between-exchange" sx={{ padding: "0"}}>
                    <Box className="row-exchange">
                      <Box className="column-between-exchange">
                        <img src={aiTedMintLogo} alt="honey pot" 
                        className={isSmallScreen ? "exchangeImage-mobile" : "exchangeImage"}/>
                      </Box>
                      <Box className="column-around">
                        <Box className="column-around" sx={{marginBottom: "20px"}}>
                          <Typography sx={{fontSize: "1.32rem"}}>AI Ted Mint</Typography>
                          <Typography className="accent-text">100,000 $HNY</Typography>
                        </Box>
                          <Button disabled={isLoadingAITedContract} className="exchange-button" variant="contained" color="primary" onClick={() => navigate("/AITedMint")}>Mint Now</Button>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="column-between-exchange" sx={{ padding: "0"}}>
                    <Box className="row-exchange">
                      <Box className="column-between-exchange">
                        <img src={tedMintLogo} alt="honey pot" className={isSmallScreen ? "exchangeImage-mobile" : "exchangeImage"}/>
                      </Box>
                      <Box className="column-around">
                        <Box className="column-around" sx={{marginBottom: "20px"}}>
                          <Typography sx={{fontSize: "1.32rem"}}>Sour Gummies</Typography>
                          <Typography className="accent-text">250,000 $HNY</Typography>
                        </Box>
                          <Button disabled={isLoadingHoneyExchangeContract || IS_DISABLED} className="exchange-button" variant="contained" color="primary" onClick={() => buyGummies()}>Buy Now</Button>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="column-between-exchange" sx={{ padding: "0"}}>
                    <Box className="row-exchange">
                      <Box className="column-between-exchange">
                        <img src={tedMintLogo} alt="honey pot" className={isSmallScreen ? "exchangeImage-mobile" : "exchangeImage"}/>
                      </Box>
                      <Box className="column-around">
                        <Box className="column-around" sx={{marginBottom: "20px"}}>
                          <Typography sx={{fontSize: "1.32rem"}}>Codename: Flavor</Typography>
                          <Typography className="accent-text">75,000 $HNY</Typography>
                        </Box>
                          <Button disabled={isLoadingHoneyExchangeContract || IS_DISABLED} className="exchange-button" variant="contained" color="primary" onClick={() => buyCodenameFlavor()}>Buy Now</Button>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="column-between-exchange" sx={{ padding: "0"}}>
                    <Box className="row-exchange">
                      <Box className="column-between-exchange">
                        <img src={tedMintLogo} alt="honey pot" className={isSmallScreen ? "exchangeImage-mobile" : "exchangeImage"}/>
                      </Box>
                      <Box className="column-around">
                        <Box className="column-around" sx={{marginBottom: "20px"}}>
                          <Typography sx={{fontSize: "1.32rem"}}>FOTF Logo Shirt</Typography>
                          <Typography className="accent-text">125,000 $HNY</Typography>
                        </Box>
                          <Button disabled={isLoadingHoneyExchangeContract || IS_DISABLED} className="exchange-button" variant="contained" color="primary" onClick={() => buyFOTFShirt()}>Buy Now</Button>
                      </Box>
                    </Box>
                  </Box>
              </Box>  

          </Box>
        </Box>
        <ErrorDialog
                open={showError}
                handleClose={handleErrorClose}
                errorCode={errorCode}
                collection={"Honey Store"}
            />
      </Box>
    );
}

export default HoneyStore;
