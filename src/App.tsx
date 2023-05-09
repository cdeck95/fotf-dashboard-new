import {
  Box,
  IconButton,
  ImageList,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ConnectWallet,
  ThirdwebNftMedia,
  useContract,
  useNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useTitle } from "./hooks/useTitle";
import "./styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
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
import MenuIcon from "@mui/icons-material/Menu";
import {
  LoadAllAccountDetails,
  allOwnedNFTs,
  initialState,
} from "./account/loadAllAccountDetails";
import GraphicTemplates from "./views/GraphicTemplates";
import ConnectWalletPage from "./components/ConnectWalletPage";
import PolygonBridge from "./components/PolygonBridge";

export const LeftDrawerWidthPX = "260px";
export const LeftDrawerWidth = 260;


function App() {
  useTitle("FOTF | Dashboard");
  const themeMui = useTheme();
  const isMobile = !useMediaQuery(themeMui.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(themeMui.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);

  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();
  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--secondary-color");
  const sidebarBackgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--sidebar-background-color");
  const accentColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--accent-color");

  const [navOpen, setNavOpen] = useState(true);
  const [rightNavOpen, setRightNavOpen] = useState(true);

  const [allOwnedNFTsArray, setAllOwnedNFTsArray] = useState<any>([]);

  const { tokens, isLoading, error, honeyBalance } = allOwnedNFTsArray;

  console.log(tokens);
  console.log(isLoading);
  console.log(error);
  console.log(honeyBalance);

  const handleOpen = (): void => {
    setNavOpen(true);
    console.log(navOpen);
    console.log("setNavOpen is true");
  };

  const handleRightNavOpen = (): void => {
    setRightNavOpen(true);
    console.log(rightNavOpen);
    console.log("setRightNavOpen is true");
  };

  useEffect(() => {
    // if(address) {
    //   LoadAllAccountDetails();
    //   //setAllOwnedNFTsArray(LoadAllAccountDetails());
    // }
  }, [address]);

  useEffect(() => {
    if (!isMobile && isMediumLarge) {
      setNavOpen(false);
      setRightNavOpen(false);
      setSmallScreen(true);
    } else {
      setNavOpen(!isMobile);
      setRightNavOpen(!isMobile);
      setSmallScreen(isMobile);
    }
  }, [isMobile, isMediumLarge]);

  const theme = createTheme({
    typography: {
      fontFamily: ["Bebas Neue", "Roboto", "Helvetica", "Arial"].join(","),
      fontSize: 16,
      fontWeightLight: 300,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: sidebarBackgroundColor,
            overflowX: "hidden",
            overflowY: "hidden",
            "&:hover": {
              overflowY: "auto",
            },
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            marginLeft: "20px",
            marginRight: "20px",
            opacity: 0.65,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            padding: 15,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            color: accentColor,
            "&:hover": {
              backgroundColor: accentColor,
              color: primaryColor,
            },
          },
        },
      },
    },
  });

  return (
    <Box className="app-container" sx={{ position: "relative" }}>
      <ThemeProvider theme={theme}>
        {isSmallScreen && (
          <Box
            sx={{
              position: "fixed",
              top: "0",
              backgroundColor: "Black",
              height: "60px",
              width: "100%",
              zIndex: "1 !important",
            }}
          ></Box>
        )}

        <Box
          sx={{
            marginLeft: navOpen ? LeftDrawerWidthPX : "0px",
            marginRight: rightNavOpen ? "340px" : "0px",
            marginTop: isSmallScreen ? "60px" : "0px",
            backgroundColor: "white",
            height: "100%",
          }}
        >
          {address ? (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/HoneyExchange" element={<HoneyExchange />} />
              <Route path="/TeddyStaking" element={<TeddyStaking />} />
              <Route path="/TedClaims" element={<TedClaims />} />{" "}
              <Route path="/Bridge" element={<PolygonBridge />} />

              <Route
                path="/TheFactory"
                element={<TheFactory allOwnedNFTs={allOwnedNFTsArray} />}
              />
              <Route path="/BuildATeddy" element={<BuildATeddy />} />
              <Route path="/TraitSwapTeds" element={<TraitSwapTeds />} />
              <Route path="/GraphicTemplates" element={<GraphicTemplates />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <ConnectWalletPage />
          )}

        <LeftDrawer navOpen={navOpen} setNavOpen={setNavOpen} />

          {navOpen ? (
            <Box></Box>
            
          ) : (
            <Box
              sx={{
                position: "fixed",
                top: "5px",
                left: "5px",
                backgroundColor: "transparent",
                zIndex: "1 !important",
              }}
            >
              {address && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => handleOpen()}
                  size="large"
                >
                  <MenuIcon sx={{ color: "White" }} />
                </IconButton>
              )}
            </Box>
          )}
          {rightNavOpen ? (
            <RightDrawer navOpen={rightNavOpen} setNavOpen={setRightNavOpen} />
          ) : (
            <Box
              sx={{
                position: "fixed",
                top: "5px",
                right: "5px",
                backgroundColor: "transparent",
                zIndex: "1 !important",
              }}
            >
              {!navOpen && (
                <IconButton
                  color="inherit"
                  aria-label="open right drawer"
                  onClick={() => handleRightNavOpen()}
                  size="large"
                  sx={{ zIndex: "1" }}
                >
                  <MenuIcon sx={{ color: "White" }} />
                </IconButton>
              )}
            </Box>
          )}
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
