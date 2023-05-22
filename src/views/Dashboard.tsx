import { Box, ImageList, Typography, useMediaQuery, useTheme } from "@mui/material";
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

export interface PolygonProps {
  tokenProps: PolygonAccountDetails;
  leftNavOpen: boolean;
  rightNavOpen: boolean;
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
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress(); // Get connected wallet address
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  const [showMismatch, setShowMismatch] = useState(false);

  // const { tokens, isLoadingTed, error, honeyBalance } = LoadAllAccountDetails();

  useEffect(() => {
    if (isMediumLarge || isMobile) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }

    if (
      isMismatched &&
      (!isSmallScreen || (isSmallScreen && !rightNavOpen && !leftNavOpen))
    ) {
      setShowMismatch(true);
    } else {
      setShowMismatch(false);
    }
  }, [
    isMediumLarge,
    isMismatched,
    isMobile,
    isSmallScreen,
    leftNavOpen,
    rightNavOpen,
  ]);

  return (
    <Box className="inner-container">
      {address ? (
        <Box
          sx={{
            height: "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box className="dashboard-inner-container">
            <Box className="row-left" sx={{height: "10%"}}>
              <Typography className="page-header">Dashboard</Typography>
            </Box>
            <Box className="row-space-between-dashboard">
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
                <HoneyEarnings />
              </ThirdwebProvider>
              <AssetOverview
                tokenProps={props.tokenProps}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
              />
            </Box>
            <Box className="row-space-between-dashboard">
              <FuryTedsDashboard tokenProps={props.tokenProps} />
              <h4>Teddy Staking</h4>
            </Box>
            <Box className="row-space-between-dashboard">
              <h4>Quick purchases</h4>
              <h4>Plushies</h4>
            </Box>
          </Box>
        </Box>
      ) : (
        <ConnectWalletPage />
      )}
      {showMismatch && <PolygonNetwork />}
      {showMismatch && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showMismatch}
        >
          {/* <CircularProgress color="inherit" /> */}
        </Backdrop>
      )}
    </Box>
  );
}

export default Dashboard;
