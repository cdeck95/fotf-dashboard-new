import {
  Box,
  ImageList,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ConnectWallet,
  ThirdwebNftMedia,
  ThirdwebProvider,
  coinbaseWallet,
  localWallet,
  metamaskWallet,
  safeWallet,
  useContract,
  useNFT,
  useNetwork,
  useNetworkMismatch,
  useOwnedNFTs,
  walletConnect,
} from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import LeftDrawer from "../components/LeftDrawer";
import RightDrawer from "../components/RightDrawer";
import { Home } from "@mui/icons-material";
import { Routes, Route } from "react-router-dom";
import ConnectWalletPage from "../components/ConnectWalletPage";
import { LoadETHAccountDetails } from "../account/loadETHAccountDetails";
import { MainnetNetwork } from "../components/MainnetNetwork";
import AssetOverviewSidebar, {
  TokenProps,
} from "../components/AssetOverviewSidebar";
import { PolygonAccountDetails } from "../account/loadPolygonAccountDetails";
import { PolygonNetwork } from "../components/PolygonNetwork";
import AssetOverview from "../components/AssetOverview";
import { Ethereum, Polygon } from "@thirdweb-dev/chains";
import HoneyEarnings from "../components/HoneyEarnings";
import FuryTedsDashboard from "../components/FuryTedsDashboard";
import TeddiesDashboard from "../components/TeddiesDashboard";
import HoneyDashboard from "../components/HoneyDashboard";
import Plushy from "../components/Plushy";
import ComingSoon from "./ComingSoon";

export interface PolygonProps {
  tokenProps: PolygonAccountDetails;
  leftNavOpen: boolean;
  rightNavOpen: boolean;
  showMismatch: boolean;
}

export interface PolygonPropsNoNav {
  tokenProps: PolygonAccountDetails;
}

function Dashboard(props: PolygonProps) {
  useTitle("FOTF | Dashboard");
  //const { tokens, error, isLoadingAI, isLoadingBirthCerts, isLoadingOneOfOne, isLoadingStaked, isLoadingTed, isLoadingTeddy, honeyBalance, leftNavOpen, rightNavOpen} = props;

  const { leftNavOpen, rightNavOpen } = props;
  const {
    tokens,
    isLoadingTed,
    isLoadingTeddy,
    isLoadingAI,
    errorTed,
    errorTeddy,
    errorAI,
    maticBalance,
    needsFunds,
  } = props.tokenProps;
  const showMismatch = props.showMismatch;
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress(); // Get connected wallet address
  // const [, switchNetwork] = useNetwork(); // Switch to desired chain
  // const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  // const [showMismatch, setShowMismatch] = useState(false);

  // const { tokens, isLoadingTed, error, honeyBalance } = LoadAllAccountDetails();

  useEffect(() => {
    if (isMediumLarge || isMobile) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }

    // if (
    //   isMismatched &&
    //   (!isSmallScreen || (isSmallScreen && !rightNavOpen && !leftNavOpen))
    // ) {
    //   setShowMismatch(true);
    // } else {
    //   setShowMismatch(false);
    // }
  }, [isMediumLarge, isMobile, isSmallScreen, leftNavOpen, rightNavOpen]);

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
  }, [
    tokens,
    tokens.Teds,
    tokens.Teddies,
    tokens.Teds?.tokens,
    tokens.Teddies?.tokens,
  ]);

  return (
    <Box className={isSmallScreen? "inner-container-mobile" : "inner-container"} sx={{zIndex: "1 !important", position: "relative"}}>
      {address ? (
        <Box>
            <Box
              sx={{
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                zIndex: "1 !important",
                overflowY: "auto",
              }}
            >
              <Box className="dashboard-inner-container">
                <Box className="row-left" sx={{ height: "fit-content" }}>
                  {!isSmallScreen && <Typography className="page-header-small">
                    Dashboard
                  </Typography>}
                </Box>
                <Box className={isSmallScreen? "column-center-full-container" : "first-row-space-around-dashboard"}>
                  <ThirdwebProvider
                    key={"ethThirdWebProviderDashboard"}
                    supportedWallets={[
                      metamaskWallet(),
                      coinbaseWallet(),
                      walletConnect(),
                      localWallet(),
                      safeWallet(),
                    ]}
                    activeChain={Ethereum}
                    supportedChains={[Polygon, Ethereum]}
                  >
                    <Box className={isSmallScreen? "column-center-full" : "col-large-dashboard"}>
                      <HoneyEarnings
                        totalHNYEarnings={totalHNYEarnings}
                        totalTeddiesEarnings={totalTeddiesEarnings}
                        totalFuryTedsEarnings={totalFuryTedsEarnings}
                      />
                    </Box>
                    <Box className={isSmallScreen? "column-center-full" : "col-large-dashboard"}>
                      <AssetOverview
                        tokenProps={props.tokenProps}
                        forSidebar={isSmallScreen? true : false}
                      />
                    </Box>
                  </ThirdwebProvider>
                </Box>
                <Box className={isSmallScreen? "column-center-full-container" : "row-space-around-dashboard"}>
                  <Box className={isSmallScreen? "column-center-full" : "col-large-dashboard"}>
                    <FuryTedsDashboard tokenProps={props.tokenProps} />
                  </Box>
                  <Box className={isSmallScreen? "column-center-full" : "col-large-dashboard"}>
                    <TeddiesDashboard tokenProps={props.tokenProps} />
                  </Box>
                </Box>
                <Box className={isSmallScreen? "column-center-full-container" : "row-space-around-dashboard"}>
                  <Box className={isSmallScreen? "column-center-full" : "col-large-dashboard"}>
                    <HoneyDashboard />
                  </Box>
                  <Box className={isSmallScreen? "column-center-full" : "col-large-dashboard"}>
                    <Plushy />
                  </Box>
                </Box>
              </Box>
            </Box>
        </Box>
      ) : (
        <ConnectWalletPage />
      )}
      
    </Box>
  );
}

export default Dashboard;
