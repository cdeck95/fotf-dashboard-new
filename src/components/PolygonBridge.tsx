import { Box, Button, ImageList, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  ConnectWallet,
  ThirdwebNftMedia,
  useContract,
  useNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSDK } from "@thirdweb-dev/react";
import teddyABI from "../ABIs/teddyABI.json";
import tedABI from "../ABIs/tedABI.json";
import stakingABI from "../ABIs/stakingABI.json";
import honeyABI from "../ABIs/honeyABI.json";
import aiABI from "../ABIs/aiABI.json";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, BigNumber, ethers } from "ethers";
import { NumericFormat } from "react-number-format";
import NFTList from "../components/NFTList";
import "../styles/Dashboard.css";
import {
  LoadAllAccountDetails,
  allOwnedNFTs,
} from "../account/loadAllAccountDetails";
import ConnectWalletPage from "../components/ConnectWalletPage";
import Sheet from 'react-modal-sheet';
import { LoadStakedTeddy } from "../account/loadStakedTeddy";

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

  //////////// Header ///////////////////////////

  interface IDictionary {
    [index: string]: string;
  }

  //////////////////////////////////////////////

  return (
    <Box className="factory-inner-container">
      {address && (
        <Box className={isSmallScreen ? "header-mobile" : "header"}>
          <Box className={isSmallScreen ? "header-row-mobile" : "header-row"}>
            <h3
              className={isSmallScreen ? "page-header-mobile" : "page-header"}
            >
              Polygon Bridge
            </h3>
          </Box>
        </Box>
      )}
      {address ? (
        <div>
          {error ? (
            <div>
              <p>NFT not found - error</p>
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
              }}
            >
              {tokens ? (
                <Box className="polygon-bridge-containter">
                    <Box className="row-even">
                        <h1 className="Large-Header">Pick The Collection</h1>
                    </Box>
                    <Box className="row-even">
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                            euismod eu lorem et ultricies. In porta lorem at dui semper
                            porttitor. Nullam quis cursus dui. Cras tincidunt vehicula
                        </Typography>
                    </Box>
                    <Box className="row-even">
                        {tedNFTs &&
                          <Box className="col">
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
                            <Typography>{tedNFTs?.length} Teds</Typography>
                          </Box>
                        }

                        {teddyNFTs &&
                         <Box className="col">
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
                            <Typography>{teddyCount} Teddies</Typography>
                          </Box>
                        }

                        {aiTedNFTs &&
                          <Box className="col">
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
                            <Typography>{aiTedNFTs.length} AI Teds</Typography>
                          </Box>
                        }
                    </Box>
                    <Box className="row-even">
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                            euismod eu lorem et ultricies. In porta lorem at dui semper
                            porttitor. Nullam quis cursus dui. Cras tincidunt vehicula
                        </Typography>
                    </Box>
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
        </div>
      ) : (
        <ConnectWalletPage />
      )}

    </Box>
  );
}

export default PolygonBridge;
