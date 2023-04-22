import {  Box, IconButton, ImageList, ThemeProvider, createTheme, useMediaQuery, useTheme } from "@mui/material";
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
import MenuIcon from '@mui/icons-material/Menu';


function App() {
  useTitle("FOTF | Dashboard");
  const themeMui = useTheme();
  const isMobile = !useMediaQuery(themeMui.breakpoints.up("md"));
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
  const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-background-color');
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');

  const [navOpen, setNavOpen] = useState(true);
  const [rightNavOpen, setRightNavOpen] = useState(true);

  const handleOpen = (): void => {
    setNavOpen(true);
    console.log(navOpen);
    console.log("setNavOpen is true")
  };

  const handleRightNavOpen = (): void => {
    setRightNavOpen(true);
    console.log(rightNavOpen);
    console.log("setRightNavOpen is true")
  };

  useEffect(() => {
    setNavOpen(!isMobile);
    setRightNavOpen(!isMobile);
  }, [isMobile]);

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
            backgroundColor: sidebarBackgroundColor,
            overflowX: 'hidden',
            overflowY: 'hidden',
            '&:hover': {
              overflowY: 'auto',
            },
            '&::-webkit-scrollbar': {
              display: 'none',
            },
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
    <Box className="app-container">
      <ThemeProvider theme={theme}>
        <Box sx={{
          marginLeft: navOpen ? "240px" : "20px",
          marginRight: rightNavOpen ? "340px" : "20px",
          backgroundColor: "white",
          height: "100%"
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
          {navOpen
          ? <LeftDrawer navOpen={navOpen} setNavOpen={setNavOpen}/>
          : <Box sx={{position: "fixed", top: 5, left: 5}}>
              <IconButton color="inherit" aria-label="open drawer" onClick={() => handleOpen()} size="large"> <MenuIcon /> </IconButton>
            </Box>
          }
          {rightNavOpen
          ? <RightDrawer navOpen={rightNavOpen} setNavOpen={setRightNavOpen} /> 
          : <Box sx={{position: "fixed", top: 5, right: 5, backgroundColor: "transparent"}}>
              <IconButton color="inherit" aria-label="open right drawer" onClick={() => handleRightNavOpen()} size="large"> 
                <MenuIcon /> 
              </IconButton>
            </Box>
          }
           
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
