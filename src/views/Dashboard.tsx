import {  Box, ImageList } from "@mui/material";
import { ConnectWallet, ThirdwebNftMedia, useContract, useNFT, useOwnedNFTs } from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import LeftDrawer from "../components/LeftDrawer";
import RightDrawer from "../components/RightDrawer";
import { Home } from "@mui/icons-material";
import { Routes, Route } from "react-router-dom";


function Dashboard() {
  useTitle("FOTF | Dashboard");
  //const theme = useTheme();
  //const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();

  return (
    <Box className="inner-container">
      {address
      ?  <Box  sx={{ height: "100%", display: "flex", 
      justifyContent: "center", alignItems: "center", width:"100%"}}>
      <h1 className="comingSoon">Dashboard</h1>
      </Box>
      : <Box  sx={{ height: "100%", display: "flex", 
      justifyContent: "center", alignItems: "center", width:"100%"}}>
      <h1 className="comingSoon"><span className="comingSoonBlack">Connect Your</span> Wallet</h1>
      </Box>
      }
    </Box>
  );
}

export default Dashboard;
