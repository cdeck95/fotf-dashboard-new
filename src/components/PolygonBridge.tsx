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
import PolygonBridgeInitial from "./PolygonBridgeInitial";
import PolygonBridgeConfirm from "./PolygonBridgeConfirm";

function PolygonBridge() {
  useTitle("FOTF | The Bridge");
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
    } else {
      setSmallScreen(false);
    }
  }, [isMediumLarge, isMobile]);

  const [collection, setCollection] = useState("");
  const [advance, setAdvance] = useState(false);

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
                <Box sx={{ height: "100%", width: "100%"}}>
                   {advance 
                      ? <PolygonBridgeConfirm setCollection={setCollection} setAdvance={setAdvance} collection={collection}/>
                      : <PolygonBridgeInitial setCollection={setCollection} setAdvance={setAdvance}/>
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
