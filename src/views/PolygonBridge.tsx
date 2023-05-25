import { Box, Button, ImageList, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  ThirdwebNftMedia, ThirdwebProvider, useContract, useNetwork, useNetworkMismatch,
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
  LoadETHAccountDetails,
  allOwnedNFTs,
  tokens,
} from "../account/loadETHAccountDetails";
import ConnectWalletPage from "../components/ConnectWalletPage";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PolygonBridgeInitial from "../components/PolygonBridgeInitial";
import PolygonBridgeConfirm from "../components/PolygonBridgeConfirm";
import { matchRoutes } from "react-router-dom";
import { Ethereum, Polygon, Goerli, Mumbai } from "@thirdweb-dev/chains";
import { PolygonNetwork } from "../components/PolygonNetwork";
import { TokenProps } from "../components/AssetOverviewSidebar";

function PolygonBridge(props: TokenProps) {
  useTitle("FOTF | The Bridge");
  // const sdk = useSDK();
  // const provider = sdk?.getProvider();
  // const address = useAddress();
  // const [, switchNetwork] = useNetwork(); // Switch to desired chain
  // const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  // const { tokens, error, isLoadingAI, isLoadingBirthCerts, isLoadingOneOfOne, isLoadingStaked, isLoadingTed, isLoadingTeddy, honeyBalance, leftNavOpen, rightNavOpen} = props;
  // console.log(tokens);
  // // console.log(isLoading);
  // // console.log(error);
  // // console.log(honeyBalance);

  // const AllTokens = tokens.AllTokens.tokens;
  // const tedNFTs = tokens.Teds?.tokens;
  // const teddyNFTs = tokens.Teddies?.tokens;
  // //const aiTedNFTs: string | any[] = [];
  // const aiTedNFTs = tokens.AITeds?.tokens;
  // const stakedTeddiesIDs = tokens.StakedTeddiesIDs?.tokens;

  // var teddyCount = 0;
  // if (stakedTeddiesIDs && teddyNFTs) {
  //   teddyCount  = teddyNFTs?.length + stakedTeddiesIDs?.length;
  // } else if (teddyNFTs) {
  //   teddyCount = teddyNFTs?.length;
  // } else if (stakedTeddiesIDs) {
  //   teddyCount = stakedTeddiesIDs?.length;
  // }

  // const theme = useTheme();
  // const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  // const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  // const [isSmallScreen, setSmallScreen] = useState(false);

  // const leftDrawerWidth = isSmallScreen ? "0px" : "260px";
  // const rightDrawerWidth = isSmallScreen ? "0px" : "340px";

  // const [open, setOpen] = useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleToggle = () => {
  //   setOpen(!open);
  // };


  // useEffect(() => {
  //   if (isMediumLarge || isMobile) {
  //     setSmallScreen(true);
  //   } else {
  //     setSmallScreen(false);
  //   }
  // }, [isMediumLarge, isMobile]);

  // const [collection, setCollection] = useState("");
  // const [advance, setAdvance] = useState(false);



  //////////////////////////////////////////////

  return (
    //  <Box className={isSmallScreen ? "bridge-inner-container-mobile" :"bridge-inner-container"}>
    //   {address && !isSmallScreen && (
    //     <Box className={isSmallScreen ? "header-mobile" : "header"}>
    //       <Box className={isSmallScreen ? "header-row-mobile" : "header-row"}>
    //         <Typography
    //           className={isSmallScreen ? "bridge-header-mobile" : "bridge-header"}
    //         >
    //           Polygon Bridge
    //         </Typography>
    //       </Box>
    //     </Box>
    //   )}
    //   {address ? (
    //     <Box>
    //       {error ? (
    //         <div>
    //           <p>NFTs not found - error</p>
    //         </div>
    //       ) : (
    //         <Box
    //           className="gallery"
    //           sx={{
    //             zIndex: "0",
    //             paddingLeft: "10px",
    //             backgroundColor: "white",
    //             paddingRight: "10px",
    //             marginBottom: "10px",
    //             width: "100%",
    //             height: "100%",
    //             overflowY: "auto"
    //           }}
    //         >
    //           {tokens ? (
    //             <Box sx={{ width: "100%", height: "100%", display: "flex", zIndex: "2" }}>
    //                <ThirdwebProvider activeChain={Polygon}
    //                 // <ThirdwebProvider activeChain={Mumbai}
    //                   supportedChains={[Ethereum, Polygon]}>
    //                {advance 
    //                   ? <PolygonBridgeConfirm setCollection={setCollection} setAdvance={setAdvance} collection={collection} tokens={tokens} leftNavOpen={leftNavOpen} rightNavOpen={rightNavOpen}/>
    //                   : <PolygonBridgeInitial setCollection={setCollection} setAdvance={setAdvance} tokens={tokens} error={error} isLoadingTed={isLoadingTed} isLoadingTeddy={isLoadingTeddy} isLoadingStaked={isLoadingStaked} isLoadingAI={isLoadingAI} isLoadingBirthCerts={isLoadingBirthCerts} isLoadingOneOfOne={isLoadingOneOfOne} leftNavOpen={leftNavOpen} rightNavOpen={rightNavOpen} />
    //                   }
    //                 </ThirdwebProvider>
    //             </Box>
               
                
    //           ) : (
    //             <p>Loading...</p>
    //           )}
    //         </Box>
    //       )}

    //       {/* <Backdrop
    //         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //         open={isLoadingAI || isLoadingBirthCerts || isLoadingStaked || isLoadingTed || isLoadingTeddy}
    //         onClick={handleClose}
    //       >
    //         <CircularProgress color="inherit" />
    //       </Backdrop> */}
    //     </Box>
    //   ) : (
    //     <ConnectWalletPage />
    //   )}
    // </Box>
    <div></div>
  );
}

export default PolygonBridge;
