import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import "../styles/globals.css";
import GlobalStyles from '@mui/material/GlobalStyles';
import furyLogo from "../assets/fury_logo.jpg";
import teddyLogo from "../assets/teddiesLogo.png";
import teddies from "../assets/teddies.png";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
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

function LeftDrawer() {
  const drawerWidth = 240;
  const navigate = useNavigate();

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
  const backgroundColorGlobal = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');

  
  const loadPage = (page: string) => {
    switch(page) {
      case "Dashboard":
        navigate("/");
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
      case "Factory":
        navigate("/Factory");
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
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          }, 
        }}
        variant="permanent"
        anchor="left">
        <Toolbar>
          <img src={teddyLogo} alt="FOTF Logo" onClick={() => loadPage("Dashboard")} className="mainLogo"/>  
        </Toolbar>
       <List>
          <ListItem key={"Dashboard"} disablePadding onClick={() => loadPage("Dashboard")}>
            <ListItemButton>
              <ListItemIcon>
                <GridViewOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Documents"} disablePadding onClick={() => loadPage("Documents")}>
            <ListItemButton>
              <ListItemIcon>
                <DescriptionOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={"Documents"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Downloads"} disablePadding onClick={() => loadPage("Downloads")}>
            <ListItemButton>
              <ListItemIcon>
                <FileDownloadOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={"Downloads"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Shop"} disablePadding onClick={() => loadPage("Shop")}>
            <ListItemButton>
              <ListItemIcon>
                <ShopOutlinedIcon/>
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
          <ListItem key={"HNYExchange"} disablePadding onClick={() => loadPage("HNYExchange")}>
            <ListItemButton>
              <ListItemIcon>
                <CurrencyExchangeOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={"$HNY Exchange"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"TeddyStaking"} disablePadding onClick={() => loadPage("TeddyStaking")}>
            <ListItemButton>
              <ListItemIcon>
                <SwapHorizOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={"Teddy Staking"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"TedClaims"} disablePadding onClick={() => loadPage("TedClaims")}>
            <ListItemButton>
              <ListItemIcon>
                 <RequestQuoteOutlinedIcon/>
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
            <ListItemButton>
              <ListItemIcon>
                <ConstructionOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={"Build A Teddy"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"TraitSwapTeds"} disablePadding onClick={() => loadPage("TraitSwapTeds")}>
            <ListItemButton>
              <ListItemIcon>
                <EditOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={"Trait Swap Teds"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"GraphicTemplates"} disablePadding onClick={() => loadPage("GraphicTemplates")}>
            <ListItemButton>
              <ListItemIcon>
                <ImageOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={"Graphic Templates"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"TheFactory"} disablePadding onClick={() => loadPage("Factory")}>
            <ListItemButton>
              <ListItemIcon>
                <PrecisionManufacturingOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={"The Factory"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ cursor: "pointer", border: "solid", marginTop: "25px", 
            borderRadius: "10px", backgroundColor: "#000", alignItems: "center", 
            marginLeft: "auto",  marginRight: "auto", width: "200px", 
            height: "100px", display: "flex"}}  
            onClick={() => loadPage("Hub")}>
          <img src={teddies} alt="Visit The Hub" className="hubLogo"/>
          <Box sx={{ flexDirection: "column"}}>
            <Typography sx={{ color: accentColor, fontSize: "20px"}}>
              Visit The Hub
            </Typography>
            <Typography sx={{ color: accentColor, fontSize: "14px", textAlign: "end"}}>
              All things FOTF
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

export default LeftDrawer;