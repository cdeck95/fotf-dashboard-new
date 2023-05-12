import {
  Box,
  Button,
  ImageList,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ThirdwebNftMedia, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import "../styles/Dashboard.css";
import "../styles/Bridge.css";
import {
  LoadAllAccountDetails,
  allOwnedNFTs,
  tokens,
} from "../account/loadAllAccountDetails";
import ConnectWalletPage from "../components/ConnectWalletPage";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ErrorDialog from "./ErrorDialog";
import { PolygonNetwork } from "./PolygonNetwork";
import { BigNumber, ethers } from "ethers";
import MaticDialog from "./MaticDialog";


interface BridgeProps {
  setCollection: Function;
  setAdvance: Function;
  tokens: tokens;
}

function PolygonBridgeInitial(props: BridgeProps) {
  useTitle("FOTF | The Bridge");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const sdk = useSDK();

  
  const provider = sdk?.getProvider();
  const address = useAddress();
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  const tokens = props.tokens;
  const { setCollection, setAdvance } = props;
  console.log(tokens);
  // console.log(isLoading);
  // console.log(error);
  // console.log(honeyBalance);

  const [maticBalance, setMaticBalance] = useState<string>();
  const [needsFunds, setNeedsFunds] = useState<boolean>(false);


  const LoadMaticBalance = useMemo(async () => {
    try {
      // const polygonSDK = new ThirdwebSDK("polygon");
      // const maticBalance = await polygonSDK?.wallet.balance("0x0000000000000000000000000000000000001010");
      const maticBalanceRaw = await sdk?.getBalance(address!);
      console.log(`Matic: ${maticBalanceRaw?.displayValue}`);
      if(maticBalanceRaw){
        const maticBalanceString = parseFloat(ethers.utils.formatEther(maticBalanceRaw!.value)).toFixed(3);
        if(maticBalanceString === maticBalance){
          console.log("matic balance hasnt changed");
          return;
        } else {
          setMaticBalance(maticBalanceString);
          if(parseInt(maticBalanceString) < 30){
            setNeedsFunds(true);
          } else {
            setNeedsFunds(false);
          }
        }
      } else {
        setMaticBalance("0.000");
        setNeedsFunds(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, [sdk, address, maticBalance]);

  const AllTokens = tokens.AllTokens.tokens; 
  const tedNFTs = tokens.Teds?.tokens;
  const teddyNFTs = tokens.Teddies?.tokens;
  //const aiTedNFTs: string | any[] = [];
  const aiTedNFTs = tokens.AITeds?.tokens;
  const stakedTeddiesIDs = tokens.StakedTeddiesIDs?.tokens;

  const [hasTeds, setHasTeds] = useState(false);
  const [hasTeddies, setHasTeddies] = useState(false);
  const [hasAITeds, setHasAITeds] = useState(false);


  var teddyCount = 0;
  if (stakedTeddiesIDs && teddyNFTs) {
    teddyCount = teddyNFTs?.length + stakedTeddiesIDs?.length;
  } else if (teddyNFTs) {
    teddyCount = teddyNFTs?.length;
  } else if (stakedTeddiesIDs) {
    teddyCount = stakedTeddiesIDs?.length;
  }
  const leftDrawerWidth = isSmallScreen ? "0px" : "240px";
  const rightDrawerWidth = isSmallScreen ? "0px" : "340px";

  const [open, setOpen] = useState(false);
  const handleMaticClose = () => {
    setNeedsFunds(false);
    console.log("closing dialog");
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isMediumLarge || isMobile) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [isMediumLarge, isMobile]);

  useEffect(() => {
    if(!tedNFTs) {
      console.log("No Teds");
      setHasTeds(false);
    } else {
      if(tedNFTs?.length === 0){
        setHasTeds(false);
      } else {
        setHasTeds(true);
      }
    }

    if(!teddyNFTs && !stakedTeddiesIDs) {
      console.log("No Teddies");
      setHasTeddies(false);
    } else {
      setHasTeddies(true);
    }
    
    // if () {
    //   if(teddyNFTs?.length === 0 && stakedTeddiesIDs?.length === 0){
    //     setHasTeddies(false);
    //   } else {
    //     setHasTeddies(true);
    //   }
    // }

    if(!aiTedNFTs) {
      console.log("No AI Teds");
    } else {
      if(aiTedNFTs?.length === 0){
        setHasAITeds(false);
      } else {
        setHasAITeds(true);
      }
    }
  }, [aiTedNFTs, stakedTeddiesIDs, tedNFTs, teddyNFTs]);


  // useEffect(() => {
  //   try {
  //     if(!maticBalance){
  //       LoadMaticBalance();
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [maticBalance, LoadMaticBalance]);

  const [selectedCollection, setSelectedCollection] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  const handleErrorClose = () => {
    setShowError(false);
  };

  function handleOnSelect(collection: string) {
    console.log(collection);
    if (collection === selectedCollection) {
      setSelectedCollection("");
      setCollection("");
    } else {
      setSelectedCollection(collection);
      setCollection(collection);
    }
  }

  function handleAdvance(): void {
    if (selectedCollection === "Fury Teds") {
      setAdvance(true);
      console.log("bridging Fury Teds");
    } else if (selectedCollection === "Teddies by FOTF") {
      setAdvance(true);
      console.log("bridging Teddies by FOTF");
    } else if (selectedCollection === "AI Teds") {
      console.log("bridging AI Teds");
      setAdvance(true);
    } else {
      console.log("No collection selected");
      setShowError(true);
      setErrorCode(1);
    }
  }

  //////////////////////////////////////////////

  return (
    <Box className="polygon-bridge-container">
      {isMismatched && (<PolygonNetwork/>)}
      <MaticDialog open={needsFunds} handleClose={handleMaticClose} />
      <Box className="row-center">
        <h1 className="Large-Header">Pick The Collection</h1>
      </Box>
      <Box
        className="row-center"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isMismatched}
          >
            {/* <CircularProgress color="inherit" /> */}
          </Backdrop>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isMismatched}
          >
            {/* <CircularProgress color="inherit" /> */}
          </Backdrop>
        <Typography className="desc-text">
          Please choose which collection (Fury Teds, Teddies, or AI Teds) that
          you wish to bridge to Polygon.{" "}
          <span className="accent-text">Please note:</span> all assets in your
          wallet from that collection will be bridged. You will not be able to
          choose only certain tokens to bridge. If you have items that you do
          not want to bridge, please leave them in a different wallet.
        </Typography>
        <Typography className="desc-text">
          Matic Balance: {maticBalance}
        </Typography>
      </Box>
      <Box
        className="row-around"
        sx={{
          height: "450px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        
          {hasTeds && <Box className="col-margin">
            <Box
              className={
                selectedCollection === "Fury Teds" ? "card-selected" : "card"
              }
              onClick={() => {
                handleOnSelect("Fury Teds");
              }}
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                background: "none",
                maxHeight: "375px",
                maxWidth: "350px",
              }}
            >
              <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
                
               {tedNFTs?.length! > 0
               ? (
                  <ThirdwebNftMedia
                  metadata={tedNFTs![0].metadata}
                  style={{
                    maxHeight: "280px",
                    maxWidth: "280px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    width: "280px",
                    height: "280px",
                  }}
                />
                ) : (
                  <Skeleton variant="rectangular" width={280} height={280} sx={{borderRadius: "10px"}} />
                  )
                }
                {selectedCollection === "Fury Teds" && (
                  <p className="title-selected">Bridge</p>
                )}
              </Box>
              <Typography className="desc-text-larger">
                <span className="desc-text-larger-accent">
                  {tedNFTs? tedNFTs.length : <CircularProgress size="1rem"/>}
                </span>{" "}
                Fury Teds
              </Typography>
            </Box>
          </Box>
        }

        
        {hasTeddies && <Box className="col-margin">
            <Box
              className={
                selectedCollection === "Teddies by FOTF" ? "card-selected" : "card"
              }
              onClick={() => {
                handleOnSelect("Teddies by FOTF");
              }}
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                background: "none",
                maxHeight: "375px",
                maxWidth: "350px",
              }}
            >
              <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
              {teddyNFTs
               ? (
               <ThirdwebNftMedia
                  metadata={teddyNFTs![0].metadata}
                  style={{
                    maxHeight: "280px",
                    maxWidth: "280px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    width: "280px",
                    height: "280px",
                  }}
                />
               )
                : (
                  <Skeleton variant="rectangular" width={280} height={280} sx={{borderRadius: "10px"}}/>
                )
              }
                {selectedCollection === "Teddies by FOTF" && (
                  <p className="title-selected">Bridge</p>
                )}
              </Box>
              <Typography className="desc-text-larger">
                <span className="desc-text-larger-accent">{teddyNFTs? teddyCount : <CircularProgress size="1rem"/>}</span>{" "}
                Teddies
              </Typography>
            </Box>
          </Box>
        }
        

        {hasAITeds && <Box className="col-margin">
            <Box
              className={
                selectedCollection === "AI Teds" ? "card-selected" : "card"
              }
              onClick={() => {
                handleOnSelect("AI Teds");
              }}
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                background: "none",
                maxHeight: "375px",
                maxWidth: "350px",
              }}
            >
              <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
                {aiTedNFTs!.length > 0
                ? <ThirdwebNftMedia
                  metadata={aiTedNFTs![0].metadata}
                  style={{
                    maxHeight: "280px",
                    maxWidth: "280px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    width: "280px",
                    height: "280px",
                  }}
                />
                : (
                  <Skeleton variant="rectangular" width={280} height={280} sx={{borderRadius: "10px"}}/>
                )
                }
                {selectedCollection === "AI Teds" && (
                  <p className="title-selected">Bridge</p>
                )}
              </Box>
              <Typography className="desc-text-larger">
                <span className="desc-text-larger-accent">
                  {aiTedNFTs? aiTedNFTs.length : <CircularProgress size="1rem"/>}
                </span>{" "}
                AI Teds
              </Typography>
            </Box>
          </Box>
          }
      </Box>
      <Box
        className="row-center"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Typography className="desc-text">
          <span className="accent-text">Note:</span> This will include all
          Staked Teddies. Please verify the total number of assets before you
          choose which asset(s) to bridge. If you find any issues please open a
          support ticket in the{" "}
          <a href="https://discord.gg/fotf">
            <span className="underline">FOTF Discord.</span>
          </a>
        </Typography>
      </Box>
      <Box className="row-center">
        <Button
          className="bridge-btn"
          variant="contained"
          disabled={selectedCollection === ""}
          onClick={() => handleAdvance()}
        >
          <span className="top-padding">Continue With Bridge</span>{" "}
          <ArrowRightIcon
            sx={{ alignItems: "center", justifyContent: "center" }}
          />
        </Button>
      </Box>
      <ErrorDialog
        open={showError}
        handleClose={handleErrorClose}
        errorCode={errorCode}
      />
    </Box>
  );
}

export default PolygonBridgeInitial;
