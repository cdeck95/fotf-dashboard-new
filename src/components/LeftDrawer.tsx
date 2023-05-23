import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "../styles/globals.css";
import fotfAppLogo from "../assets/FOTF_App.png";
import theHubLogo from "../assets/hub_icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Backdrop, IconButton, useMediaQuery, useTheme } from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ShopOutlinedIcon from "@mui/icons-material/ShopOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEffect, useState } from "react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { LeftDrawerWidth } from "../App";
import ConnectingAirportsOutlinedIcon from '@mui/icons-material/ConnectingAirportsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

type NavProps = {
  setNavOpen: Function;
  navOpen: boolean;
};

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--primary-color");
const secondaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--secondary-color");
const backgroundColorGlobal = getComputedStyle(
  document.documentElement
).getPropertyValue("--background-color");
const accentColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--accent-color"
);

function LeftDrawer(props: NavProps) {
  const { navOpen, setNavOpen } = props;
  const navigate = useNavigate();
  const themeMui = useTheme();
  const isMobile = !useMediaQuery(themeMui.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(themeMui.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const [activePage, setActivePage] = React.useState("Dashboard");
  const drawerWidth = navOpen ? LeftDrawerWidth : 0;

  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleMobileClick = () => {
    if (isMobile) {
      setNavOpen(false);
    }
  };

  const [isBridgePage, setIsBridgePage] = useState(false);
  const location = useLocation();  

  useEffect(() => {
    if (!isMobile && isMediumLarge) {
      setSmallScreen(true);
    } else {
      setSmallScreen(isMobile); 
    }
    const lowercasePath = location.pathname.toLowerCase();
    switch (lowercasePath) {
      case "/thefactory":
        setActivePage("TheFactory");
        break;
      case "/honeyexchange":
        setActivePage("HoneyExchange");
        break;
      case "/buildateddy":
        setActivePage("BuildATeddy");
        break;
      case "/tedmint":
        setActivePage("TedMint");
        break;
      case "/teddymint":
        setActivePage("TeddyMint");
        break;
      case "/aitedmint":
        setActivePage("AITedMint");
        break;
      case "/teddyclaims":
        setActivePage("TeddyClaims");
        break;
      case "/tedclaims":
        setActivePage("TedClaims");
        break;
      case "/traitswapteds":
        setActivePage("TraitSwapTeds");
        break;
      case "/bridge":
        setActivePage("PolygonBridge");
        setIsBridgePage(true);
        break;
      default:
        setActivePage("Dashboard");
        break;
    }
  }, [isMobile, isMediumLarge, location.pathname]);

 

  const loadPage = (page: string) => {
    switch (page) {
      case "Dashboard":
        navigate("/");
        setActivePage("Dashboard");
        handleMobileClick();
        break;
      case "Documents":
        window.open("https://docs.furyofthefur.com");
        handleMobileClick();
        break;
      case "Downloads":
        window.open(
          "https://drive.google.com/drive/folders/1_FHhUhooWOXxfJoNaS1YBKgvMLMjsCPN?usp=sharing"
        );
        handleMobileClick();
        break;
      case "Shop":
        window.open("https://shopfotf.com");
        handleMobileClick();
        break;
      case "HoneyExchange":
        navigate("/HoneyExchange");
        setActivePage("HoneyExchange");
        handleMobileClick();
        break;
      case "TedMint":
        navigate("/TedMint");
        setActivePage("TedMint");
        handleMobileClick();
        break;
      case "TeddyMint":
        navigate("/TeddyMint");
        setActivePage("TeddyMint");
        handleMobileClick();
        break;
      case "AITedMint":
        navigate("/AITedMint");
        setActivePage("AITedMint");
        handleMobileClick();
        break;
      case "TedClaims":
        navigate("/TedClaims");
        setActivePage("TedClaims");
        handleMobileClick();
        break;
      case "TeddyClaims":
        navigate("/TeddyClaims");
        setActivePage("TeddyClaims");
        handleMobileClick();
        break;
      case "BuildATeddy":
        navigate("/BuildATeddy");
        setActivePage("BuildATeddy");
        handleMobileClick();
        break;
      case "TraitSwapTeds":
        navigate("/TraitSwapTeds");
        setActivePage("TraitSwapTeds");
        handleMobileClick();
        break;
      case "TheFactory":
        navigate("/TheFactory");
        setActivePage("TheFactory");
        handleMobileClick();
        break;
      case "PolygonBridge":
        navigate("/Bridge");
        setActivePage("PolygonBridge");
        handleMobileClick();
        break;
      case "GraphicTemplates":
        navigate("/GraphicTemplates");
        setActivePage("GraphicTemplates");
        handleMobileClick();
        break;
      case "Hub":
        window.open("https://furyofthefur.com");
        handleMobileClick();
        break;
      default:
        navigate("/");
        handleMobileClick();
        break;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          // "& .MuiDrawer-root": { width: 200, zIndex: -1 },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            // zIndex: -1,
            overflowY: "hidden",
            overflowX: "hidden",
            border: "none",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          },
        }}
        open={navOpen}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Box sx={{ paddingTop: "10px", position: "relative" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <img
                src={fotfAppLogo}
                alt="FOTF Logo"
                onClick={() => loadPage("Dashboard")}
                className={isSmallScreen ? "mainLogo-Mobile" : "mainLogo"}
              />
              {isMobile || isMediumLarge ? (
                <IconButton onClick={() => setNavOpen(false)} size="large">
                  <ChevronLeftIcon style={{ fill: "black" }} />
                </IconButton>
              ) : (
                <div></div>
              )}
            </Box>
          </Box>
        </Toolbar>
        <List>
          <ListItem
            key={"Dashboard"}
            disablePadding
            onClick={() => loadPage("Dashboard")}
          >
            <ListItemButton selected={activePage === "Dashboard"}>
              <ListItemIcon>
                <GridViewOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Documents"}
            disablePadding
            onClick={() => loadPage("Documents")}
          >
            <ListItemButton selected={activePage === "Documents"}>
              <ListItemIcon>
                <DescriptionOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Documents"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Downloads"}
            disablePadding
            onClick={() => loadPage("Downloads")}
          >
            <ListItemButton selected={activePage === "Downloads"}>
              <ListItemIcon>
                <FileDownloadOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Downloads"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Shop"}
            disablePadding
            onClick={() => loadPage("Shop")}
          >
            <ListItemButton selected={activePage === "Shop"}>
              <ListItemIcon>
                <ShopOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Shop"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Typography sx={{ marginTop: "10px", paddingLeft: "18px" }}>
          Minting
        </Typography>
        <List>
          <ListItem
            key={"TedMint"}
            disablePadding
            onClick={() => loadPage("TedMint")}
          >
            <ListItemButton selected={activePage === "TedMint"}>
              <ListItemIcon>
                <LocalOfferOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Fury Ted Mint"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"TeddyMint"}
            disablePadding
            onClick={() => loadPage("TeddyMint")}
          >
            <ListItemButton selected={activePage === "TeddyMint"}>
              <ListItemIcon>
                <LocalOfferOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Teddy Mint"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"AITedMint"}
            disablePadding
            onClick={() => loadPage("AITedMint")}
          >
            <ListItemButton selected={activePage === "AITedMint"}>
              <ListItemIcon>
                <LocalOfferOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"AI Ted Mint"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Typography sx={{ marginTop: "10px", paddingLeft: "18px" }}>
          Economy
        </Typography>
        <List>
          <ListItem
            key={"HoneyExchange"}
            disablePadding
            onClick={() => loadPage("HoneyExchange")}
          >
            <ListItemButton selected={activePage === "HoneyExchange"}>
              <ListItemIcon>
                <CurrencyExchangeOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"$HNY Exchange"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"TedClaims"}
            disablePadding
            onClick={() => loadPage("TedClaims")}
          >
            <ListItemButton selected={activePage === "TedClaims"}>
              <ListItemIcon>
                <RequestQuoteOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Ted Claims"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"TeddyClaims"}
            disablePadding
            onClick={() => loadPage("TeddyClaims")}
          >
            <ListItemButton selected={activePage === "TeddyClaims"}>
              <ListItemIcon>
                <SwapHorizOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Teddy Claims"} />
            </ListItemButton>
          </ListItem>
          
        </List>
        <Divider />
        <Typography sx={{ marginTop: "10px", paddingLeft: "18px" }}>
          Utility
        </Typography>
        <List>
          {/* <ListItem
            key={"BuildATeddy"}
            disablePadding
            onClick={() => loadPage("BuildATeddy")}
          >
            <ListItemButton selected={activePage === "BuildATeddy"}>
              <ListItemIcon>
                <ConstructionOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Build A Teddy"} />
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem
            key={"TraitSwapTeds"}
            disablePadding
            onClick={() => loadPage("TraitSwapTeds")}
          >
            <ListItemButton selected={activePage === "TraitSwapTeds"}>
              <ListItemIcon>
                <EditOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Trait Swap Teds"} />
            </ListItemButton>
          </ListItem> */}
          <ListItem
            key={"TheFactory"}
            disablePadding
            onClick={() => loadPage("TheFactory")}
          >
            <ListItemButton selected={activePage === "TheFactory"}>
              <ListItemIcon>
                <PrecisionManufacturingOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"The Factory"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"GraphicTemplates"}
            disablePadding
            onClick={() => loadPage("GraphicTemplates")}
          >
            <ListItemButton selected={activePage === "GraphicTemplates"}>
              <ListItemIcon>
                <ImageOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Graphic Templates"} />
            </ListItemButton>
          </ListItem>
          {/* <ListItem
            key={"PolygonBridge"}
            disablePadding
            onClick={() => loadPage("PolygonBridge")}
          >
            <ListItemButton selected={activePage === "PolygonBridge"}>
              <ListItemIcon>
                <ConnectingAirportsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Polygon Bridge"} />
            </ListItemButton>
          </ListItem> */}
        </List>
        <Box
          sx={{
            cursor: "pointer",
            border: "solid",
            marginTop: "25px",
            borderRadius: "10px",
            backgroundColor: "#000",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "25px",
            maxWidth: "200px !important",
            width: "200px !important",
            height: "150px !important",
            maxHeight: "150px !important",
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={() => loadPage("Hub")}
        >
          <img src={theHubLogo} alt="Visit The Hub" className="hubLogo" />
          <Box
            sx={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "10px",
              paddingRight: "10%",
            }}
          >
            <Typography
              sx={{
                color: accentColor,
                fontSize: "1.75rem",
                paddingLeft: "5px",
                justifyContent: "end",
                alignSelf: "flex-end",
                marginTop: "10px",
              }}
            >
              Visit The Hub
            </Typography>
            <Typography
              sx={{
                color: accentColor,
                fontSize: "1rem",
                justifyContent: "end",
                alignSelf: "flex-end",
                marginBottom: "10px",
              }}
            >
              All things FOTF
            </Typography>
          </Box>
        </Box>
        {!address && <Backdrop
          sx={{
            color: "#fff",
            width: drawerWidth,
            zIndex: (theme: { zIndex: { drawer: number } }) =>
              theme.zIndex.drawer + 1,
          }}
          open={!address}
          onClick={handleClose}
        >
          {/* <CircularProgress color="inherit" /> */}
        </Backdrop>}
        {isBridgePage && <Backdrop
          sx={{
            color: "#fff",
            width: drawerWidth,
            zIndex: (theme: { zIndex: { drawer: number } }) =>
              theme.zIndex.drawer + 1,
          }}
          open={isBridgePage}
          onClick={handleClose}
        >
          {/* <CircularProgress color="inherit" /> */}
        </Backdrop>}
      </Drawer>
    </Box>
  );
}

export default LeftDrawer;
