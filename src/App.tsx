import {  Box, ImageList, ThemeProvider, createTheme } from "@mui/material";
import { ConnectWallet, ThirdwebNftMedia, useContract, useNFT, useOwnedNFTs } from "@thirdweb-dev/react";
import { useTitle } from "./hooks/useTitle";
import "./styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import { Routes, Route, Navigate } from "react-router-dom";
import TheFactory from "./views/TheFactory";
import Dashboard from "./views/Dashboard";

import NotFound from "./views/NotFound";
import LeftDrawer from "./components/LeftDrawer";
import RightDrawer from "./components/RightDrawer";
import BuildATeddy from "./views/BuildATeddy";
import TraitSwapTeds from "./views/TraitSwapTeds";
import HoneyExchange from "./views/HoneyExchange";
import TedClaims from "./views/TedClaims";
import TeddyStaking from "./views/TeddyStaking";



function App() {
  useTitle("FOTF | Dashboard");
  //const theme = useTheme();
  //const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
  const backgroundColorGlobal = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');


  const theme = createTheme({
    typography: {
      fontFamily: [
        'Bebas Neue',
        "Roboto",
        "Helvetica",
        "Arial",
      ].join(','),
      fontSize: 16,
      fontWeightLight: 300,
      
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundColorGlobal,
            
          },
          
        }
      },     
      MuiDivider: {
        styleOverrides: {
          root: {
            marginLeft: "20px", 
            marginRight: "20px", 
            opacity: .65
          }
        }
      }, MuiToolbar: {
        styleOverrides: {
          root: {
            padding: 15
          }
        }
      }, MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            color: accentColor,
            "&:hover": {
              backgroundColor: accentColor,
              color: primaryColor,
            }
          }
        }
      },
    },
  });

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <Box sx={{
          marginLeft: "240px",
          marginRight: "280px",
          paddingTop: "20px",
          paddingBottom: "20px",
          backgroundColor: "white",
        }}>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/HoneyExchange" element={<HoneyExchange/>}/>
            <Route path="/TeddyStaking" element={<TeddyStaking/>}/> 
            <Route path="/TedClaims" element={<TedClaims/>}/> 
            <Route path="/TheFactory" element={<TheFactory/>}/>
            <Route path="/BuildATeddy" element={<BuildATeddy/>}/> 
            <Route path="/TraitSwapTeds" element={<TraitSwapTeds/>}/> 
            <Route path="*" element={<NotFound/>}/> 
          </Routes>
          <LeftDrawer/>
          <RightDrawer/>   
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
