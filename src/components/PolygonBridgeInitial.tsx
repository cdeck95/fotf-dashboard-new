import {
  Box,
  Button,
  ImageList,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import "../styles/Dashboard.css";
import "../styles/Bridge.css";
import {
  LoadAllAccountDetails,
  allOwnedNFTs,
} from "../account/loadAllAccountDetails";
import ConnectWalletPage from "../components/ConnectWalletPage";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ErrorDialog from "./ErrorDialog";

interface BridgeProps {
  setCollection: Function;
  setAdvance: Function;
}

function PolygonBridgeInitial(props: BridgeProps) {
  useTitle("FOTF | The Bridge");
  const { tokens, isLoading, error, honeyBalance } = LoadAllAccountDetails();
  const { setCollection, setAdvance } = props;
  console.log(tokens);
  console.log(isLoading);
  console.log(error);
  console.log(honeyBalance);

  const AllTokens = tokens.AllTokens.tokens;
  const tedNFTs = tokens.Teds?.tokens;
  const teddyNFTs = tokens.Teddies?.tokens;
  //const aiTedNFTs: string | any[] = [];
  const aiTedNFTs = tokens.AITeds?.tokens;
  const stakedTeddiesIDs = tokens.StakedTeddiesIDs?.tokens;

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
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();

  const leftDrawerWidth = isSmallScreen ? "0px" : "240px";
  const rightDrawerWidth = isSmallScreen ? "0px" : "340px";

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
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
      <Box className="row-center">
        <h1 className="Large-Header">Pick The Collection</h1>
      </Box>
      <Box
        className="row-center"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Typography className="desc-text">
          Please choose which collection (Fury Teds, Teddies, or AI Teds) that
          you wish to bridge to Polygon.{" "}
          <span className="accent-text">Please note:</span> all assets in your
          wallet from that collection will be bridged. You will not be able to
          choose only certain tokens to bridge. If you have items that you do
          not want to bridge, please leave them in a different wallet.
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
        {tedNFTs && (
          <Box className="col-margin">
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
                {selectedCollection === "Fury Teds" && (
                  <p className="title-selected">Bridge</p>
                )}
              </Box>
              <Typography className="desc-text-larger">
                <span className="desc-text-larger-accent">
                  {tedNFTs?.length}
                </span>{" "}
                Fury Teds
              </Typography>
            </Box>
          </Box>
        )}

        {teddyNFTs && (
          <Box className="col-margin">
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
                {selectedCollection === "Teddies by FOTF" && (
                  <p className="title-selected">Bridge</p>
                )}
              </Box>
              <Typography className="desc-text-larger">
                <span className="desc-text-larger-accent">{teddyCount}</span>{" "}
                Teddies
              </Typography>
            </Box>
          </Box>
        )}

        {aiTedNFTs && (
          <Box className="col-margin">
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
                {selectedCollection === "AI Teds" && (
                  <p className="title-selected">Bridge</p>
                )}
              </Box>
              <Typography className="desc-text-larger">
                <span className="desc-text-larger-accent">
                  {aiTedNFTs.length}
                </span>{" "}
                AI Teds
              </Typography>
            </Box>
          </Box>
        )}
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
            <span className="underline">FOTF Discord</span>
          </a>{" "}
          (https://discord.gg/fotf).
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
