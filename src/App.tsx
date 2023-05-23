import {
  Box,
  IconButton,
  ImageList,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ConnectWallet,
  ThirdwebNftMedia,
  ThirdwebProvider,
  useContract,
  useNFT,
  useNetwork,
  useNetworkMismatch,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useTitle } from "./hooks/useTitle";
import "./styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
  LoadETHAccountDetails,
  allOwnedNFTs,
  initialState,
} from "./account/loadETHAccountDetails";
import GraphicTemplates from "./views/GraphicTemplates";
import ConnectWalletPage from "./components/ConnectWalletPage";
import PolygonBridge from "./views/PolygonBridge";
import { MainnetNetwork } from "./components/MainnetNetwork";
import { Ethereum, Polygon } from "@thirdweb-dev/chains";
import { LoadPolygonAccountDetails } from "./account/loadPolygonAccountDetails";
import AITedMint from "./views/AITedMint";
import TedMint from "./views/TedMint";
import TeddyMint from "./views/TeddyMint";

export const LeftDrawerWidthPX = "260px";
export const LeftDrawerWidth = 260;

function App() {
  useTitle("FOTF | Dashboard");
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
            "&:disabled": {
              backgroundColor: "grey",
            },
          },
        },
      },
    },
  });

  //const themeMui = useTheme();
  //const isMediumLarge = useMediaQuery(themeMui.breakpoints.down("lg"));
  //const isMobile = !useMediaQuery(themeMui.breakpoints.up("md"));
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);

  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress(); // Get connected wallet address
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  
  const [navOpen, setNavOpen] = useState(true);
  const [rightNavOpen, setRightNavOpen] = useState(true);
  const [isBridgePage, setIsBridgePage] = useState(false);
  const [allOwnedNFTsArray, setAllOwnedNFTsArray] = useState<any>([]);

  // const ethTokenProps = LoadETHAccountDetails();

  const polygonTokenProps = LoadPolygonAccountDetails();

  // const {
  //   tokens,
  //   // isLoadingTed,
  //   // isLoadingTeddy,
  //   // isLoadingStaked,
  //   // isLoadingAI,
  //   isLoadingBirthCerts,
  //   isLoadingOneOfOne,
  //   errorBirthCerts,
  //   errorOneOfOne,
  //   // error,
  //   honeyBalance,
  // } = tokenProps;

  // console.log(tokens);
  // console.log(isLoadingBirthCerts);
  // console.log(isLoadingOneOfOne);
  // console.log(errorBirthCerts);
  // console.log(errorOneOfOne);
  // console.log(honeyBalance);

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
    if (address) {
      // LoadAllAccountDetails();
      //setAllOwnedNFTsArray(LoadAllAccountDetails());
    }
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
  
  const location = useLocation();  
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => { 

    const lowercasePath = location.pathname.toLowerCase();
 
    switch (lowercasePath) {
      case "/":
        setPageTitle("Dashboard");
        break;
      case "/thefactory":
        setPageTitle("The Factory");
        break;
      case "/buildateddy":
        setPageTitle("Build A Teddy");
        break;
      case "/traitswapteds":
        setPageTitle("Trait Swap Teds");
        break;
      case "/graphictemplates":
        setPageTitle("Graphic Templates");
        break;
      case "/honeyexchange":
        setPageTitle("Honey Exchange");
        break;
      case "/tedmint":
        setPageTitle("Ted Mint");
        break;
      case "/teddymint":
        setPageTitle("Teddy Mint");
        break;
      case "/aitedmint":
        setPageTitle("AI Ted Mint");
        break;
      case "/teddystaking":
        setPageTitle("Teddy Staking");
        break;
      case "/tedclaims":
        setPageTitle("Ted Claims");
        break;
      case "/bridge":
        setPageTitle("Polygon Bridge");
        setIsBridgePage(true);
        break;
      default:
        setPageTitle("404 - Page not found");
    }
  }, [location.pathname]);

  

  return (
    <Box className="app-container" sx={{ position: "relative", overflowY: "auto" }}>
      <ThemeProvider theme={theme}>
        {isSmallScreen && (
          <Box
            sx={{
              position: "fixed",
              top: "0",
              backgroundColor: "Black",
              height: "60px",
              width: "100%",
              zIndex: "2 !important",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                zIndex: "2 !important",
              }}
            >
              {address && <Typography
                sx={{
                  color: "White",
                  marginLeft: "10px",
                  marginTop: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "2rem",
                  zIndex: "2 !important",
                }}
              >
               {pageTitle}
              </Typography>
            }
            </Box>
          </Box>
        )}

        <Box
          sx={{
            marginLeft: navOpen ? LeftDrawerWidthPX : "0px",
            marginRight: rightNavOpen ? "340px" : "0px",
            marginTop: isSmallScreen ? "60px" : "20px",
            backgroundColor: "white",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {address ? (
            <Routes>
              {/* <Route path="/" element={<Dashboard tokens={tokens}
                    error={error}
                    isLoadingTed={isLoadingTed}
                    isLoadingTeddy={isLoadingTeddy}
                    isLoadingStaked={isLoadingStaked}
                    isLoadingAI={isLoadingAI}
                    isLoadingBirthCerts={isLoadingBirthCerts}
                    isLoadingOneOfOne={isLoadingOneOfOne}
                    honeyBalance={honeyBalance}
                    leftNavOpen={navOpen}
                    rightNavOpen={rightNavOpen} />} /> */}
              <Route path="/" element={<Dashboard tokenProps={polygonTokenProps} leftNavOpen={navOpen} rightNavOpen={rightNavOpen}/>} />
              <Route path="/HoneyExchange" element={<HoneyExchange />} />
              <Route path="/TeddyStaking" element={<TeddyStaking />} />
              <Route path="/TedClaims" element={<TedClaims />} />{" "}
              <Route path="/TedMint" element={<TedMint />} />{" "}
              <Route path="/TeddyMint" element={<TeddyMint />} />{" "}
              <Route path="/AITedMint" element={<AITedMint />} />{" "}
              {/* <Route
                path="/Bridge"
                element={
                  <PolygonBridge
                    tokenProps={polygonTokenProps} leftNavOpen={navOpen} rightNavOpen={rightNavOpen} 
                  />
                }
              /> */}
              <Route
                path="/TheFactory"
                element={<TheFactory tokenProps={polygonTokenProps} leftNavOpen={navOpen} rightNavOpen={rightNavOpen}  />}
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
                zIndex: "2 !important",
              }}
            >
              {address && !isBridgePage && (
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
            <RightDrawer
              tokenProps={polygonTokenProps}
              navOpen={rightNavOpen}
              setNavOpen={setRightNavOpen}
              // tokens={tokens}
              // error={error}
              // isLoadingTed={isLoadingTed}
              // isLoadingTeddy={isLoadingTeddy}
              // isLoadingStaked={isLoadingStaked}
              // isLoadingAI={isLoadingAI}
              // isLoadingBirthCerts={isLoadingBirthCerts}
              // isLoadingOneOfOne={isLoadingOneOfOne}
              // honeyBalance={honeyBalance}
            />
          ) : (
            <Box
              sx={{
                position: "fixed",
                top: "5px",
                right: "5px",
                backgroundColor: "transparent",
                zIndex: "2 !important",
              }}
            >
              {!navOpen && (
                <IconButton
                  color="inherit"
                  aria-label="open right drawer"
                  onClick={() => handleRightNavOpen()}
                  size="large"
                  sx={{ zIndex: "2 !important" }}
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
