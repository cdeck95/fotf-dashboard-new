import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import "../styles/globals.css";
import fotfAppLogo from "../assets/FOTF_App.png";
import theHubLogo from "../assets/hub_icon.png";
import { useNavigate } from "react-router-dom";
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type NavProps = {
  setNavOpen: Function;
  navOpen: boolean;
};

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
const backgroundColorGlobal = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
const drawerWidth = 240;

function LeftDrawer(props: NavProps) {
  const { navOpen, setNavOpen } = props;
  const navigate = useNavigate();
  const themeMui = useTheme();
  const isMobile = !useMediaQuery(themeMui.breakpoints.up("md"));
  const [activePage, setActivePage] = React.useState("Dashboard");
  
  const loadPage = (page: string) => {
    switch(page) {
      case "Dashboard":
        navigate("/");
        setActivePage("Dashboard");
        break;
      case "Documents":
        window.open("https://docs.furyofthefur.com");
        break;
      case "Downloads": 
        window.open("https://drive.google.com/drive/folders/1_FHhUhooWOXxfJoNaS1YBKgvMLMjsCPN?usp=sharing");
        break;
      case "Shop":
        window.open("https://shopfotf.com");
        break;
      case "HoneyExchange":
        navigate("/HoneyExchange");
        setActivePage("HoneyExchange");
        break;
      case "TedClaims":
        navigate("/TedClaims");
        setActivePage("TedClaims");
        break;
      case "TeddyStaking":
        navigate("/TeddyStaking");
        setActivePage("TeddyStaking");
        break;
      case "BuildATeddy":
        navigate("/BuildATeddy");
        setActivePage("BuildATeddy");
        break;
      case "TraitSwapTeds":
        navigate("/TraitSwapTeds");
        setActivePage("TraitSwapTeds");
        break;
      case "TheFactory":
        navigate("/TheFactory");
        setActivePage("TheFactory");
        break;
      case "Hub":
        navigate("/");
        break;
      default:
        navigate("/");
        break;
    }
  }

  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: navOpen ? drawerWidth : 0,
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            overflowY: "hidden",
            overflowX: "hidden",
            border: "none",
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
          }, 
        },
        }}
        open={navOpen}
        variant="permanent"
        anchor="left">
        <Toolbar>
        <Box sx={{paddingTop: "10px", position: "relative"}}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
              <img src={fotfAppLogo} alt="FOTF Logo" onClick={() => loadPage("Dashboard")} className={isMobile? "mainLogo-Mobile": "mainLogo"}/>  
              {isMobile
                ?<IconButton onClick={() => setNavOpen(false)} size="large">
                    <ChevronLeftIcon style={{ fill: "black" }} />
                  </IconButton>
                : <div></div>
              }
            </Box>
          </Box>
        </Toolbar>
       <List>
          <ListItem key={"Dashboard"} disablePadding onClick={() => loadPage("Dashboard")}>
            <ListItemButton selected={activePage==="Dashboard"}>
              <ListItemIcon>
                <GridViewOutlinedIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Documents"} disablePadding onClick={() => loadPage("Documents")}>
            <ListItemButton selected={activePage==="Documents"}>
              <ListItemIcon>
                <DescriptionOutlinedIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={"Documents"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Downloads"} disablePadding onClick={() => loadPage("Downloads")}>
            <ListItemButton selected={activePage==="Downloads"}>
              <ListItemIcon>
                <FileDownloadOutlinedIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={"Downloads"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Shop"} disablePadding onClick={() => loadPage("Shop")}>
            <ListItemButton selected={activePage==="Shop"}>
              <ListItemIcon>
                <ShopOutlinedIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={"Shop"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Typography sx={{ marginTop: "10px", paddingLeft: "18px"}}>
          Economy
        </Typography>
        <List>
          <ListItem key={"HoneyExchange"} disablePadding onClick={() => loadPage("HoneyExchange")}>
            <ListItemButton selected={activePage==="HoneyExchange"}>
              <ListItemIcon>
                <CurrencyExchangeOutlinedIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={"$HNY Exchange"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"TeddyStaking"} disablePadding onClick={() => loadPage("TeddyStaking")}>
            <ListItemButton selected={activePage==="TeddyStaking"}>
              <ListItemIcon>
                <SwapHorizOutlinedIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={"Teddy Staking"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"TedClaims"} disablePadding onClick={() => loadPage("TedClaims")}>
            <ListItemButton selected={activePage==="TedClaims"}>
              <ListItemIcon>
                 <RequestQuoteOutlinedIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={"Ted Claims"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Typography sx={{ marginTop: "10px", paddingLeft: "18px"}}>
          Utility
        </Typography>
        <List>
          <ListItem key={"BuildATeddy"} disablePadding onClick={() => loadPage("BuildATeddy")}>
            <ListItemButton selected={activePage==="BuildATeddy"}>
              <ListItemIcon>
                <ConstructionOutlinedIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={"Build A Teddy"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"TraitSwapTeds"} disablePadding onClick={() => loadPage("TraitSwapTeds")}>
            <ListItemButton selected={activePage==="TraitSwapTeds"}>
              <ListItemIcon>
                <EditOutlinedIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={"Trait Swap Teds"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"GraphicTemplates"} disablePadding onClick={() => loadPage("GraphicTemplates")}>
            <ListItemButton selected={activePage==="GraphicTemplates"}>
              <ListItemIcon>
                <ImageOutlinedIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={"Graphic Templates"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"TheFactory"} disablePadding onClick={() => loadPage("TheFactory")}>
            <ListItemButton selected={activePage==="TheFactory"}>
              <ListItemIcon>
                <PrecisionManufacturingOutlinedIcon fontSize='small'/>
              </ListItemIcon>
              <ListItemText primary={"The Factory"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ cursor: "pointer", border: "solid", marginTop: "25px", 
            borderRadius: "10px", backgroundColor: "#000", alignItems: "center", 
            marginLeft: "auto",  marginRight: "auto", marginBottom: "25px", width: "200px", 
            height: "200px !important", display: "flex", justifyContent: "space-between"}}  
            onClick={() => loadPage("Hub")}>
          <img src={theHubLogo} alt="Visit The Hub" className="hubLogo"/>
          <Box sx={{ flexDirection: "column", display: "flex", justifyContent: "space-between", borderRadius: "10px", paddingRight: "10%"}}>
            <Typography sx={{ color: accentColor, fontSize: "1.75rem", paddingLeft: "5px", justifyContent: "end", alignSelf: "flex-end", marginTop: "10px"}}>
              Visit The Hub
            </Typography>
            <Typography sx={{ color: accentColor, fontSize: "1rem", justifyContent: "end", alignSelf: "flex-end", marginBottom: "10px"}}>
              All things FOTF
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

export default LeftDrawer;