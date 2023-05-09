import { Box, Button, ImageList, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useEffect,
  useState,
} from "react";
import { useSDK } from "@thirdweb-dev/react";
import "../styles/Dashboard.css";
import "../styles/Bridge.css";
import {
  LoadAllAccountDetails,
  allOwnedNFTs,
} from "../account/loadAllAccountDetails";
import ConnectWalletPage from "../components/ConnectWalletPage";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface TheFactoryProps {
  allOwnedNFTs: allOwnedNFTs;
}

function PolygonBridge(props: TheFactoryProps) {
  useTitle("FOTF | The Bridge");
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { tokens, isLoading, error, honeyBalance } = LoadAllAccountDetails();
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
    teddyCount  = teddyNFTs?.length + stakedTeddiesIDs?.length;
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
      setSheetOpen(true);
    } else {
      setSmallScreen(false);
      setSheetOpen(false);
    }
  }, [isMediumLarge, isMobile]);

  //////////// OnSelect Functions ///////////////////////////

  interface IDictionary {
    [index: string]: string;
  }

  const [selectedCollection, setSelectedCollection] = useState("");

  function handleOnSelect(collection: string) {
    console.log(collection);
    if(collection === selectedCollection) {
      setSelectedCollection("");
    } else {
      setSelectedCollection(collection);
    }
  }

  //////////////////////////////////////////////

  return (
    <Box className="factory-inner-container">
      {address && (
        <Box className={isSmallScreen ? "header-mobile" : "header"}>
          <Box className={isSmallScreen ? "header-row-mobile" : "header-row"}>
            <Typography
              className={isSmallScreen ? "bridge-header-mobile" : "bridge-header"}
            >
              Polygon Bridge
            </Typography>
          </Box>
        </Box>
      )}
      {address ? (
        <Box sx={{ width: "100%", height: "100%" }}>
          {error ? (
            <div>
              <p>NFTs not found - error</p>
            </div>
          ) : (
            <Box
              className="gallery"
              sx={{
                zIndex: "0",
                paddingLeft: "10px",
                paddingBottom: "75px",
                backgroundColor: "white",
                paddingRight: "10px",
                width: "100%",
                height: "100%",
              }}
            >
              {tokens ? (
                <Box className="polygon-bridge-containter">
                  <Box className="row-center">
                    <h1 className="Large-Header">Pick The Collection</h1>
                  </Box>
                  <Box
                    className="row-center"
                    sx={{ paddingTop: "10px", paddingBottom: "10px" }}
                  >
                    <Typography className="desc-text">
                      Please choose which collection (Fury Teds, Teddies, or AI
                      Teds) that you wish to bridge to Polygon.{" "}
                      <span className="accent-text">Please note:</span> all
                      assets in your wallet from that collection will be
                      bridged. You will not be able to choose only certain
                      tokens to bridge. If you have items that you do not want
                      to bridge, please leave them in a different wallet.
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
                          className={selectedCollection==="teds"? "card-selected" : "card"}
                          onClick={() => {handleOnSelect("teds")}}
                          sx={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            background: "none",
                            maxHeight: "375px",
                            maxWidth: "350px",
                          }}
                        >
                          <Box sx={{width: "100%", height: "100%", position: "relative"}}>
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
                             {selectedCollection==="teds" && <p className="title-selected">Bridge</p>}
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
                          className={selectedCollection==="teddies"? "card-selected" : "card"}
                          onClick={() => {handleOnSelect("teddies")}}
                          sx={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            background: "none",
                            maxHeight: "375px",
                            maxWidth: "350px",
                          }}
                        >
                          <Box sx={{width: "100%", height: "100%", position: "relative"}}>
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
                            {selectedCollection==="teddies" && <p className="title-selected">Bridge</p>}
                          </Box>
                          <Typography className="desc-text-larger">
                            <span className="desc-text-larger-accent">
                              {teddyCount}
                            </span>{" "}
                            Teddies
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {aiTedNFTs && (
                      <Box className="col-margin">
                        <Box
                          className={selectedCollection==="aiTeds"? "card-selected" : "card"}
                          onClick={() => {handleOnSelect("aiTeds")}}
                          sx={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            background: "none",
                            maxHeight: "375px",
                            maxWidth: "350px",
                          }}
                        >
                          <Box sx={{width: "100%", height: "100%", position: "relative"}}>
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
                             {selectedCollection==="aiTeds" && <p className="title-selected">Bridge</p>}
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
                      <span className="accent-text">Note:</span> This will
                      include all Staked Teddies. Please verify the total number
                      of assets before you choose which asset(s) to bridge. If
                      you find any issues please open a support ticket in the{" "}
                      <a href="https://discord.gg/fotf"><span className="underline">FOTF Discord</span></a> (https://discord.gg/fotf).
                    </Typography>
                  </Box>
                  {selectedCollection!=="" && <Box className="row-center">
                    <Button
                      className="bridge-btn"
                      variant="contained"
                      onClick={() => {
                        if(selectedCollection === "teds") {
                          console.log("Would bridge teds");
                        } else if(selectedCollection === "teddies") {
                          console.log("Would bridge teddies");
                        } else if(selectedCollection === "aiTeds") {
                          console.log("Would bridge aiTeds");
                        } else {
                          console.log("No collection selected");
                        }
                      }}
                    >
                      <span className="top-padding">Continue With Bridge</span> <ArrowRightIcon sx={{ alignItems:"center", justifyContent: "center" }}/>
                    </Button>
                    </Box>
                  }
                </Box>
              ) : (
                <p>Loading...</p>
              )}
            </Box>
          )}

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      ) : (
        <ConnectWalletPage />
      )}
    </Box>
  );
}

export default PolygonBridge;
