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
import GridViewIcon from '@mui/icons-material/GridView';
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShopIcon from '@mui/icons-material/Shop';

function LeftDrawer() {
  const drawerWidth = 240;
  const navigate = useNavigate();
  
  const loadPage = (page: string) => {
    switch(page) {
      case "Dashboard":
        navigate("/");
        break;
      case "Documents":
        navigate("/Documents");
        break;
      case "Downloads":
        navigate("/Downloads");
        break;
      case "Shop":
        navigate("/Shop");
        break;
      case "Factory":
        navigate("/Factory");
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
                <GridViewIcon/>
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Documents"} disablePadding onClick={() => loadPage("Documents")}>
            <ListItemButton>
              <ListItemIcon>
                <DescriptionIcon/>
              </ListItemIcon>
              <ListItemText primary={"Documents"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Downloads"} disablePadding onClick={() => loadPage("Downloads")}>
            <ListItemButton>
              <ListItemIcon>
                <FileDownloadIcon/>
              </ListItemIcon>
              <ListItemText primary={"Downloads"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Shop"} disablePadding onClick={() => loadPage("Shop")}>
            <ListItemButton>
              <ListItemIcon>
                <ShopIcon/>
              </ListItemIcon>
              <ListItemText primary={"Shop"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <h3>
          Economy
        </h3>
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default LeftDrawer;