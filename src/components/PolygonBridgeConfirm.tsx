import {
  Box,
  Button,
  ImageList,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ThirdwebNftMedia, UseContractResult, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useMemo, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import "../styles/Dashboard.css";
import "../styles/Bridge.css";
import {
  LoadAllAccountDetails,
  allOwnedNFTs,
  tokens,
} from "../account/loadAllAccountDetails";
import ConnectWalletPage from "../components/ConnectWalletPage";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { PolygonNetwork } from "./PolygonNetwork";
import { BaseContract, BigNumber, ethers } from "ethers";
import MaticDialog from "./MaticDialog";
import ErrorDialog from "./ErrorDialog";
import { SmartContract } from "@thirdweb-dev/sdk";
import LoadingDialog from "./LoadingDialog";
import BridgeSuccessDialog from "./BridgeSuccessDialog";
import { LoadPolygonAccountDetails } from "../account/loadPolygonAccountDetails";

interface BridgeConfirmProps {
  setCollection: Function;
  setAdvance: Function;
  collection: string;
  tokens: tokens;
  leftNavOpen: boolean;
  rightNavOpen: boolean;
}

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

function PolygonBridgeConfirm(props: BridgeConfirmProps) {
  useTitle("FOTF | Confirm Bridge");
  // const [isSheetOpen, setSheetOpen] = useState(false);
  // const { tokens, isLoading, error, honeyBalance } = LoadAllAccountDetails();
  const { setCollection, setAdvance, collection, tokens, leftNavOpen, rightNavOpen } = props;
  // console.log(tokens);
  // console.log(isLoading);
  // console.log(error);
  // console.log(honeyBalance);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] =  useState(false);
  const [failure, setFailure] =  useState(false);

  const AllTokens = tokens.AllTokens.tokens;
  const tedNFTs = tokens.Teds?.tokens;
  const teddyNFTs = tokens.Teddies?.tokens;
  //const aiTedNFTs: string | any[] = [];
  const aiTedNFTs = tokens.AITeds?.tokens;
  const stakedTeddiesIDs = tokens.StakedTeddiesIDs?.tokens;
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  const [showMismatch, setShowMismatch] = useState(false);

  var teddyCount = 0;
  if (stakedTeddiesIDs && teddyNFTs) {
    teddyCount = teddyNFTs?.length + stakedTeddiesIDs?.length;
  } else if (teddyNFTs) {
    teddyCount = teddyNFTs?.length;
  } else if (stakedTeddiesIDs) {
    teddyCount = stakedTeddiesIDs?.length;
  }

  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const [collectionCount, setCollectionCount] = useState(0);

  const { maticBalance, needsFunds, setNeedsFunds, bridgeTeds, bridgeTeddies, bridgeAITeds, CanIBridgeTeds, CanIBridgeTeddies, CanIBridgeAITeds, hasBridgedTeds, hasBridgedTeddies, hasBridgedAITeds } = LoadPolygonAccountDetails();

  console.log(CanIBridgeTeds!());
  console.log(CanIBridgeTeddies);
  console.log(CanIBridgeAITeds);


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

  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  useEffect(() => {
    if (collection === "Fury Teds") {
      setCollectionCount(tedNFTs?.length!);
      if (tedNFTs?.length === 0) {
        console.log("No Fury Teds");
        setShowError(true);
        setErrorCode(2);
        return;
      }
    } else if (collection === "Teddies by FOTF") { 
      if (teddyCount === 0) {
        console.log("No Tedies");
        setShowError(true);
        setErrorCode(2);
        return;
      }
      setCollectionCount(teddyCount);
    } else if (collection === "AI Teds") {
      if (aiTedNFTs?.length === 0) {
        console.log("No AI Teds");
        setShowError(true);
        setErrorCode(2);
        return;
      }
      setCollectionCount(aiTedNFTs?.length!);
    }
  }, [aiTedNFTs?.length, collection, tedNFTs?.length, teddyCount]);

   useEffect(() => {
      // Check if the user is connected to the wrong network
      if (isMismatched) {
        console.log("Mismatched network detected. Switching to Polygon...");
      }
    }, [address, isMismatched]); // This above block gets run every time "address" changes (e.g. when the user connects)

  //////////// OnSelect Functions ///////////////////////////

  interface IDictionary {
    [index: string]: string;
  }

  const [collectionForError, setCollectionForError] = useState("");

  useEffect(() => {
    // if (collection === "Fury Teds" && !CanIBridgeTeds) {
    //   console.log("Not approved for Bridging Fury Teds");
    //   setShowError(true);        
    //   setErrorCode(5);
    //   setCollectionForError("Fury Teds");
    // }
  
    if (collection === "Teddies by FOTF" && !CanIBridgeTeddies) {
        console.log("Not approved for Bridging Teddies by FOTF");
        setShowError(true);        
        setErrorCode(5);
        setCollectionForError("Teddies by FOTF");
    }
  
    if (collection === "AI Teds" && !CanIBridgeAITeds) {
      console.log("Not approved for Bridging AI Teds");
      setShowError(true);        
      setErrorCode(5);
      setCollectionForError("AI Teds");
    }
  }, [CanIBridgeAITeds, CanIBridgeTeddies, CanIBridgeTeds, collection]);  

  
  function handleErrorClose(): void {
    setAdvance(false);
  }

  const handleLoadingClosed = () => {
    setIsLoading(false);
  }

  async function handleBridgeCleanup (urlParam: string, pairedBridgeIDs?: IDictionary[]) {
    console.log(pairedBridgeIDs);
    const json = JSON.stringify(pairedBridgeIDs, null, 2);
    console.log(json);
    try {
        const response = await fetch(`https://h7ke8qc4ng.execute-api.us-east-1.amazonaws.com/Prod/${urlParam}`, {
            method: 'POST',
            body: json
        })
        const responseStatus = await response.status;
        console.log(response.status);
        if (responseStatus !== 200) {
          setErrorCode(responseStatus);
          setShowError(true);
          setIsLoading(false);
          return;
        } else {
          setSuccess(true);
          setIsLoading(false);
        }
    } catch (error){
        console.log(error);
        setIsLoading(false);
        setErrorCode(500);
        setShowError(true);
    }
  }

  const handleBridge = async () => {
    setIsLoading(true);

    const pairedBridgeIDs: IDictionary[] = [];
     
    var returnedBridgeIDs: string[] = [];
    var bridgeCount = 0;

    switch (collection) {
      case "Fury Teds":
        setCollectionCount(tedNFTs?.length!);
        // BRIDGE FIRST
        const bridgeResponseTeds = await bridgeTeds!();
        //const bridgeResponseTeds = await testbridgeTeds!();
        console.log(bridgeResponseTeds);
        const events = bridgeResponseTeds["receipt"]["events"];
        const TokensMinted: BigNumber[] = events[events.length -2]["args"]["tokenIds"];
        console.log(TokensMinted);

        TokensMinted.forEach((id) => {
          console.log(id.toString());
          returnedBridgeIDs.push(id.toString());
        });

        console.log(returnedBridgeIDs);

        if(bridgeResponseTeds === null){
          setErrorCode(500);
          setShowError(true);
          setIsLoading(false);
          return;
        }
        //get tokenIDs being minted on Polygon
        tedNFTs?.forEach((token) => {
          console.log(token.metadata.id);
          pairedBridgeIDs.push({oldTokenID: token.metadata.id, newPolygonID: returnedBridgeIDs[bridgeCount].toString()});
          bridgeCount++;
        });
        handleBridgeCleanup("bridgeTeds", pairedBridgeIDs);
        break;
      case "Teddies by FOTF":
        setCollectionCount(teddyCount);
        // BRIDGE FIRST
        const bridgeResponseTeddies = await bridgeTeddies!();
        const eventsTeddies = bridgeResponseTeddies["receipt"]["events"];
        const TokensMintedTeddies: BigNumber[] = eventsTeddies[events.length -2]["args"]["tokenIds"];
        console.log(TokensMintedTeddies);

        TokensMintedTeddies.forEach((id) => {
          console.log(id.toString());
          returnedBridgeIDs.push(id.toString());
        });

        console.log(returnedBridgeIDs);
        if(bridgeResponseTeddies === null){
          setErrorCode(500);
          setShowError(true);
          setIsLoading(false);
          return;
        }
        teddyNFTs?.forEach((token) => {
          console.log(token.metadata.id);
          pairedBridgeIDs.push({oldTokenID: token.metadata.id, newPolygonID: returnedBridgeIDs[bridgeCount].toString()});
          bridgeCount++;
        });

        stakedTeddiesIDs?.forEach((id) => {
          console.log(id);
          pairedBridgeIDs.push({oldTokenID: id, newPolygonID: returnedBridgeIDs[bridgeCount].toString()});
          bridgeCount++;
        });

        handleBridgeCleanup("bridgeTeddies", pairedBridgeIDs);
        break;
      case "AI Teds":
        setCollectionCount(aiTedNFTs?.length!);
        // BRIDGE FIRST
        const bridgeResponseAITeds = await bridgeAITeds!();
        const eventsAITeds = bridgeResponseAITeds["receipt"]["events"];
        const TokensMintedAITeds: BigNumber[] = eventsAITeds[events.length -2]["args"]["tokenIds"];
        console.log(TokensMintedAITeds);

        TokensMintedAITeds.forEach((id) => {
          console.log(id.toString());
          returnedBridgeIDs.push(id.toString());
        });

        console.log(returnedBridgeIDs);
        if(bridgeResponseAITeds === null){
          setErrorCode(500);
          setShowError(true);
          setIsLoading(false);
          return;
        }
        aiTedNFTs?.forEach((token) => {
          console.log(token.metadata.id);
          pairedBridgeIDs.push({oldTokenID: token.metadata.id, newPolygonID: returnedBridgeIDs[bridgeCount].toString()});
          bridgeCount++;
        });
        handleBridgeCleanup("bridgeAITeds", pairedBridgeIDs);
        break;
      default:
        console.log("No collection selected");
        break;
    }
    setIsLoading(false);

  }

  //////////////////////////////////////////////

  return (
    <Box className={isSmallScreen? "polygon-bridge-container-mobile" : "polygon-bridge-container"}>
      <MaticDialog open={needsFunds && !showMismatch} handleClose={handleMaticClose} />
      <Box className="row-center">
        <h1 className="Large-Header">Confirm Bridge</h1>
      </Box>
      <Box
        className="row-center"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, opacity: "0.9" }}
            open={showMismatch}>
            <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, opacity: "0.9" }}
            open={showMismatch}>
                    {showMismatch && (<PolygonNetwork/>)}
            </Backdrop>
        </Backdrop>
        <Typography className="desc-text">
          Confirm the total amount of <span className="accent-text">{collection}</span> to be bridged to Polygon. Once a collection is bridged, 
          your wallet can no longer bridge again (for this collection) and all assets will be moved to Polygon
          and reverted on the main Ethereum network.
          <span className="accent-text">This is final.</span> 
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
        {collection==="Fury Teds" && aiTedNFTs && (
          
          <Box className={isSmallScreen? "column" : "row-even"} >
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
            <Typography className="desc-text-largest">
              <span className="desc-text-largest-accent">
                {tedNFTs?.length}
              </span>{" "}
              Fury Teds
            </Typography>
          </Box>
      )}

{collection==="Teddies by FOTF" && teddyNFTs && (
          
          <Box className={isSmallScreen? "column" : "row-even"} >
             {teddyNFTs.length > 0 
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
                  }}/>
                )
              : (
                <Skeleton variant="rectangular" width={280} height={280} /> )
              } 
              
            <Typography className="desc-text-largest">
              <span className="desc-text-largest-accent">
                {teddyCount}
              </span>{" "}
              Teddies
            </Typography>
          </Box>
      )}

    {collection==="AI Teds" && aiTedNFTs && (
          
          <Box className={isSmallScreen? "column" : "row-even"} >
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
              <Typography className="desc-text-largest">
                <span className="desc-text-largest-accent">
                  {aiTedNFTs?.length}
                </span>{" "}
                AI Teds
              </Typography>
            </Box>
        )}
      </Box>
      <Box className={isSmallScreen? "column" : "row-center"} 
          sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Typography className="desc-text">
          <span className="accent-text">Note:</span> Please verify the total
          number of assets before you choose to bridge. If you find any issues please open a
          support ticket in the{" "}
          <a href="https://discord.gg/fotf">
            <span className="underline">FOTF Discord.</span>
          </a>
        </Typography>
      </Box>
      <Box className={isSmallScreen? "column" : "row-center"}>
        <Button
          className={isSmallScreen ? "back-btn-mobile" : "back-btn" }
          sx={{marginRight: "10px !important", marginLeft: "10px !important"}}
          variant="contained"          
          onClick={() => {
            setAdvance(false);
            setCollection("");
          }}
        >
          {" "}
          <ArrowLeftIcon
            sx={{ alignItems: "center", justifyContent: "center" }}
          />
          <span className="top-padding">Back To Collection Picker</span>
        </Button>
        <Button
          className={isSmallScreen ? "bridge-btn-mobile" : "bridge-btn" }
          variant="contained"
          sx={{marginRight: "10px !important", marginLeft: "10px !important"}}
          disabled={(collection === "" || ((collection === "Fury Teds" && hasBridgedTeds) || (collection === "Teddies by FOTF" && hasBridgedTeddies) || (collection === "AI Teds" && hasBridgedAITeds)))}
          onClick={() => handleBridge()}
        >
          <span className="top-padding">Bridge {collectionCount} to Polygon </span>{" "}
          <ArrowRightIcon
            sx={{ alignItems: "center", justifyContent: "center" }}
          />
        </Button>
      </Box>

      <BridgeSuccessDialog open={success} setOpen={setSuccess} setAdvance={setAdvance} collection={collection} collectionCount={collectionCount}/>

      <LoadingDialog open={isLoading} onClose={handleLoadingClosed} collection={collection} collectionCount={collectionCount}/>

      <ErrorDialog
        open={showError}
        handleClose={handleErrorClose}
        errorCode={errorCode}
        collection={collectionForError}
      />
    </Box>
  );
}

export default PolygonBridgeConfirm;
