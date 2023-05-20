import {
  Box,
  Button,
  ImageList,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ThirdwebNftMedia,
  UseContractResult,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
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
import { BaseContract, BigNumber, ethers } from "ethers";
import MaticDialog from "./MaticDialog";
import { SmartContract } from "@thirdweb-dev/sdk";
import fotfLogo from "../assets/fotf_logo_colorized.png";
import { LoadPolygonAccountDetails } from "../account/loadPolygonAccountDetails";

interface BridgeProps {
  setCollection: Function;
  setAdvance: Function;
  tokens: tokens;
  error: boolean;
  isLoadingTed: boolean;
  isLoadingTeddy: boolean;
  isLoadingAI: boolean;
  isLoadingBirthCerts: boolean;
  isLoadingOneOfOne: boolean;
  isLoadingStaked: boolean;
  leftNavOpen: boolean;
  rightNavOpen: boolean;
}

function PolygonBridgeInitial(props: BridgeProps) {
  useTitle("FOTF | The Bridge");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const [showMismatch, setShowMismatch] = useState(false);
  const sdk = useSDK();

  const provider = sdk?.getProvider();
  const address = useAddress();
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  const {
    setCollection,
    setAdvance,
    tokens,
    isLoadingAI,
    isLoadingBirthCerts,
    isLoadingOneOfOne,
    isLoadingStaked,
    isLoadingTed,
    isLoadingTeddy,
    error,
    leftNavOpen,
    rightNavOpen,
  } = props;
  console.log(tokens);
  // console.log(isLoading);
  // console.log(error);
  // console.log(honeyBalance);

  const { maticBalance, needsFunds, setNeedsFunds, CanIBridgeTeds, CanIBridgeTedsFlag, CanIBridgeTedsAmount, CanIBridgeTeddies, CanIBridgeTeddiesFlag, CanIBridgeTeddiesAmount, CanIBridgeAITeds, CanIBridgeAITedsFlag, CanIBridgeAITedsAmount, tokens: polygonTokens } = LoadPolygonAccountDetails();

  // console.log(CanIBridgeTeds!());
  // console.log(CanIBridgeTedsFlag);
  // console.log(CanIBridgeTedsAmount.toString());

  // console.log(CanIBridgeTeddies!());
  // console.log(CanIBridgeTeddiesFlag);
  // console.log(CanIBridgeTeddiesAmount.toString());

  // console.log(CanIBridgeAITeds!());
  // console.log(CanIBridgeAITedsFlag);
  // console.log(CanIBridgeAITedsAmount.toString());

  

  const [hasBridgedTeds, setHasBridgedTeds] = useState(false);
  const [hasBridgedTeddies, setHasBridgedTeddies] = useState(false);
  const [hasBridgedAITeds, setHasBridgedAITeds] = useState(false);

  console.log(hasBridgedTeds);
  console.log(hasBridgedTeddies);
  console.log(hasBridgedAITeds);

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
    setNeedsFunds!(false);
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
    if (isMismatched && (!isSmallScreen || (isSmallScreen && !rightNavOpen && !leftNavOpen))){
      setShowMismatch(true);
    } else {
      setShowMismatch(false);
    }
  }, [isMediumLarge, isMismatched, isMobile, isSmallScreen, leftNavOpen, rightNavOpen]);

  useEffect(() => {
    if (!tedNFTs) {
      console.log("No Teds");
      setHasTeds(false);
    } else {
      if (tedNFTs?.length === 0) {
        setHasTeds(false);
      } else {
        setHasTeds(true);
        // if(polygonTokens.Teds?.tokens){
        //   if(polygonTokens.Teds?.tokens.length! > 0) {
        //     setHasBridgedTeds(true);
        //   }
        // }
      }
    }

    if (!teddyNFTs && !stakedTeddiesIDs) {
      console.log("No Teddies");
      setHasTeddies(false);
    } else {
      setHasTeddies(true);
      // if(polygonTokens.Teddies?.tokens){
      //   if(polygonTokens.Teddies?.tokens.length! > 0) {
      //     setHasBridgedTeddies(true);
      //   }
      // }
    }

    if (!aiTedNFTs) {
      console.log("No AI Teds");
    } else {
      if (aiTedNFTs?.length === 0) {
        setHasAITeds(false);
      } else {
        setHasAITeds(true);
        // if(polygonTokens.AITeds?.tokens){
        //   if(polygonTokens.AITeds?.tokens.length! > 0) {
        //     setHasBridgedAITeds(true);
        //   }
        // } 
      }
    }

    

  }, [aiTedNFTs, polygonTokens.AITeds?.tokens, polygonTokens.Teddies?.tokens, polygonTokens.Teds?.tokens, stakedTeddiesIDs, tedNFTs, teddyNFTs]);

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
  const [collectionForError, setCollectionForError] = useState("");

  const handleErrorClose = () => {
    setShowError(false);
  };

  function handleOnSelect(collection: string) {
    console.log(collection);
    if (collection === selectedCollection) {
      setSelectedCollection("");
      setCollection("");
    } else {
      if (collection === "Fury Teds" && isLoadingTed) {
        console.log("still loading Teds");
        setShowError(true);
        setErrorCode(2);
        setCollectionForError("Fury Teds");
        return;
      } else if (collection === "Fury Teds" && !hasTeds) {
        console.log("No Teds");
        setShowError(true);        
        setErrorCode(3);
        setCollectionForError("Fury Teds");
        return;
       } 
      // else if (collection === "Fury Teds" && !CanIBridgeTedsFlag) {
      //   console.log("Not approved for Bridging Teds");
      //   setShowError(true);        
      //   setErrorCode(5);
      //   setCollectionForError("Fury Teds");
      //   return;
      // }

      if (collection === "Teddies by FOTF" && (isLoadingTeddy || isLoadingStaked)) {
        console.log("still loading Teddies");
        setShowError(true);
        setErrorCode(2);
        setCollectionForError("Teddies by FOTF");
        return;
      } else if (collection === "Teddies by FOTF" && !hasTeddies) {
        console.log("No Teddies");
        setShowError(true);
        setErrorCode(3);
        setCollectionForError("Teddies by FOTF");
        return;
       } 
      //   else if (collection === "Teddies by FOTF" && !CanIBridgeTeddiesFlag) {
      //   console.log("Not approved for Bridging Teddies by FOTF");
      //   setShowError(true);        
      //   setErrorCode(5);
      //   setCollectionForError("Teddies by FOTF");
      //   return;
      // }

      if (collection === "AI Teds" && isLoadingAI) {
        console.log("Still loading AI Teds");
        setShowError(true);
        setErrorCode(2);
        setCollectionForError("AI Teds");
        return;
      } else if (collection === "AI Teds" && !hasAITeds) {
        console.log("No AI Teds");
        setShowError(true);
        setErrorCode(3);
        setCollectionForError("AI Teds");
        return;
      }
      // else if (collection === "AI Teds" && !CanIBridgeAITedsFlag) {
      //   console.log("Not approved for Bridging AI Teds");
      //   setShowError(true);        
      //   setErrorCode(5);
      //   setCollectionForError("AI Teds");
      //   return;
      // }
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
    <Box className={isSmallScreen? "polygon-bridge-container-mobile" : "polygon-bridge-container"}>
      <MaticDialog
        open={needsFunds && !showMismatch}
        handleClose={handleMaticClose}
      />
      <Box className="row-center">
        <h1 className="Large-Header">Pick The Collection</h1>
      </Box>
      <Box
        className="row-center"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showMismatch}>  
          <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showMismatch}>
            {showMismatch && <PolygonNetwork />}
         </Backdrop>
        </Backdrop>
       
        <Typography className="desc-text">
          Please choose which collection (Fury Teds, Teddies, or AI Teds) that
          you wish to bridge to Polygon.{" "}
          <span className="accent-text">Please note:</span> all assets in your
          wallet from that collection will be bridged. You will not be able to
          choose only certain tokens to bridge. If you have items that you do
          not want to bridge, please leave them in a different wallet.
        </Typography>
        {/* <Typography className="desc-text">
          Matic Balance: {maticBalance}
        </Typography> */}
      </Box>
      <Box className={isSmallScreen ? "column" : "row-around-bridge"}>
        <Box className={isSmallScreen ? "row" : "col-margin"}>
          <Box
            className={
              (selectedCollection === "Fury Teds" || hasBridgedTeds) ? "card-selected" : "card"
            }
            onClick={() => { if(!hasBridgedTeds){
              handleOnSelect("Fury Teds");
            }
            }}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              background: "none",
              // maxHeight: "375px",
              // maxWidth: "350px",
            }}
          >
            <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
              {isLoadingTed ? (
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={280}
                  sx={{ borderRadius: "10px" }}
                />
              ) : (
                <Box>
                  {tedNFTs!.length > 0 ? (
                    <Box>
                      {tedNFTs![0].metadata.name!=="Failed to load NFT metadata" ? <ThirdwebNftMedia
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
                      : <img
                      src={fotfLogo}
                      className={"teddyStakedPlaceholder"}
                      alt="Placeholder Logo - All Fury Teds are Bridged"
                    />
                      }
                      </Box>
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={280}
                      height={280}
                      sx={{ borderRadius: "10px" }}
                    />
                  )}
                </Box>
              )}
              {hasBridgedTeds && (
                <p className="title-selected">Bridge Complete</p>
              )}
              {selectedCollection === "Fury Teds" && (
                <p className="title-selected">Bridge</p>
              )}
            </Box>
            <Typography className="desc-text-larger">
              <span className="desc-text-larger-accent">
                {isLoadingTed ? (
                  <CircularProgress size="1rem" />
                ) : (
                  tedNFTs!.length
                )}
              </span>{" "}
              Fury Teds
            </Typography>
          </Box>
        </Box>

        <Box className={isSmallScreen ? "row" : "col-margin"}>
          <Box
            className={
              (selectedCollection === "Teddies by FOTF" || hasBridgedTeddies)
                ? "card-selected"
                : "card"
            }
            onClick={() => {if(!hasBridgedTeddies){
              handleOnSelect("Teddies by FOTF");
            }
            }}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              background: "none",
              // maxHeight: "375px",
              // maxWidth: "350px",
            }}
          >
            <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
              {isLoadingTeddy ? (
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={280}
                  sx={{ borderRadius: "10px" }}
                />
              ) : (
                <Box>
                  {teddyNFTs!.length > 0 ? (
                    <Box>
                    {teddyNFTs![0].metadata.name!=="Failed to load NFT metadata" ?
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
                      : <img
                      src={fotfLogo}
                      className={"teddyStakedPlaceholder"}
                      alt="Placeholder Logo - All Teddies are Bridged"
                    />
                  }
                  </Box>
                  ) : (
                    <Box>
                      {stakedTeddiesIDs!.length > 0 ? (
                        <img
                          src={fotfLogo}
                          className={"teddyStakedPlaceholder"}
                          alt="Placeholder Logo - All Teddies are Staked"
                        />
                      ) : (
                        <Box></Box>
                      )}
                    </Box>
                  )}
                </Box>
              )}
              {hasBridgedTeddies && (
                <p className="title-selected">Bridge Complete</p>
              )}
              {selectedCollection === "Teddies by FOTF" && (
                <p className="title-selected">Bridge</p>
              )}
            </Box>
            <Typography className="desc-text-larger">
              <span className="desc-text-larger-accent">
                {isLoadingTeddy && isLoadingStaked ? (
                  <CircularProgress size="1rem" />
                ) : (
                  teddyCount
                )}
              </span>{" "}
              Teddies
            </Typography>
          </Box>
        </Box>

        <Box className={isSmallScreen ? "row" : "col-margin"}>
          <Box
            className={
              (selectedCollection === "AI Teds" || hasBridgedAITeds) ? "card-selected" : "card"
            }
            // className={
            //   (selectedCollection === "AI Teds") ? "card-selected" : "card"
            // }
            // onClick={() => {
            //   handleOnSelect("AI Teds");
            
            onClick={() => {if(!hasBridgedAITeds){
              handleOnSelect("AI Teds");
            }
            }}
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              background: "none",
              // maxHeight: "375px",
              // maxWidth: "350px",
            }}
          >
            <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
              {isLoadingAI ? (
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={280}
                  sx={{ borderRadius: "10px" }}
                />
              ) : (
                <Box>
                  {aiTedNFTs!.length > 0 ? (
                    <Box>
                    {aiTedNFTs![0].metadata.name!=="Failed to load NFT metadata" ?
                      <ThirdwebNftMedia
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
                      :  <img
                      src={fotfLogo}
                      className={"teddyStakedPlaceholder"}
                      alt="Placeholder Logo - All AI Teds are Bridged"
                    />
                      }
                      </Box>
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={280}
                      height={280}
                      sx={{ borderRadius: "10px" }}
                    />
                  )}
                </Box>
              )}
              {hasBridgedAITeds && (
                <p className="title-selected">Bridge Complete</p>
              )}
              {selectedCollection === "AI Teds" && (
                <p className="title-selected">Bridge</p>
              )}
            </Box>
            <Typography className="desc-text-larger">
              <span className="desc-text-larger-accent">
                {isLoadingAI ? (
                  <CircularProgress size="1rem" />
                ) : (
                  aiTedNFTs!.length
                )}
              </span>{" "}
              AI Teds
            </Typography>
          </Box>
        </Box>
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
          <span>Continue With Bridge</span>{" "}
          <ArrowRightIcon
            sx={{ alignItems: "center", justifyContent: "center" }}
          />
        </Button>
      </Box>
      <ErrorDialog
        open={showError}
        handleClose={handleErrorClose}
        errorCode={errorCode}
        collection={collectionForError}
      />
    </Box>
  );
}

export default PolygonBridgeInitial;
