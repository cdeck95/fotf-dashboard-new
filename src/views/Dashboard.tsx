import { Box, ImageList, useMediaQuery, useTheme } from "@mui/material";
import {
  ConnectWallet,
  ThirdwebNftMedia,
  useContract,
  useNFT,
  useNetwork,
  useNetworkMismatch,
  useOwnedNFTs,
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
import { LoadAllAccountDetails } from "../account/loadAllAccountDetails";
import { MainnetNetwork } from "../components/MainnetNetwork";

function Dashboard() {
  useTitle("FOTF | Dashboard");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress(); // Get connected wallet address
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network

  const { tokens, isLoadingTed, error, honeyBalance } = LoadAllAccountDetails();

  return (
    <Box className="inner-container">
      {address ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {isMismatched && (<MainnetNetwork/>)}
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isMismatched}
          >
            {/* <CircularProgress color="inherit" /> */}
          </Backdrop>
          <h1 className={isMobile ? "comingSoon-Mobile" : "comingSoon"}>
            Dashboard
          </h1>
        </Box>
      ) : (
        <ConnectWalletPage />
      )}
    </Box>
  );
}

export default Dashboard;
