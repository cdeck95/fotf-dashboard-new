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
import { BaseContract, ethers } from "ethers";
import MaticDialog from "./MaticDialog";
import ErrorDialog from "./ErrorDialog";
import { SmartContract } from "@thirdweb-dev/sdk";

interface BridgeProps {
  setCollection: Function;
  setAdvance: Function;
  collection: string;
  tokens: tokens;
  bridgeContract: UseContractResult<SmartContract<BaseContract>>;
  leftNavOpen: boolean;
  rightNavOpen: boolean;
}

function PolygonBridgeConfirm(props: BridgeProps) {
  useTitle("FOTF | Confirm Bridge");
  // const [isSheetOpen, setSheetOpen] = useState(false);
  // const { tokens, isLoading, error, honeyBalance } = LoadAllAccountDetails();
  const { setCollection, setAdvance, collection, tokens, bridgeContract, leftNavOpen, rightNavOpen } = props;
  // console.log(tokens);
  // console.log(isLoading);
  // console.log(error);
  // console.log(honeyBalance);

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
          if(parseInt(maticBalanceString) < 10){
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

  const [selectedCollection, setSelectedCollection] = useState("");

  function handleOnSelect(collection: string) {
    console.log(collection);
    if (collection === selectedCollection) {
      setSelectedCollection("");
    } else {
      setSelectedCollection(collection);
    }
  }

  function handleErrorClose(): void {
    setAdvance(false);
  }

  //////////////////////////////////////////////

  return (
    <Box className="polygon-bridge-container">
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
          
          <Box className="row-even" >
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
          
          <Box className="row-even" >
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
          
            <Box className="row-even" >
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
      <Box
        className="row-center"
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
      <Box className="row-center">
        <Button
          className="bridge-btn"
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
          className="bridge-btn"
          variant="contained"
          sx={{marginRight: "10px !important", marginLeft: "10px !important"}}
          disabled={collection === ""}
          onClick={() => {
            if (selectedCollection === "teds") {
              console.log("Would bridge teds");
            } else if (selectedCollection === "teddies") {
              console.log("Would bridge teddies");
            } else if (selectedCollection === "aiTeds") {
              console.log("Would bridge aiTeds");
            } else {
              console.log("No collection selected");
            }
          }}
        >
          <span className="top-padding">Bridge {collectionCount} to Polygon </span>{" "}
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

export default PolygonBridgeConfirm;
