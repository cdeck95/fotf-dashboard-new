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
import { ConnectWallet } from '@thirdweb-dev/react';
import { Button, GlobalStyles, ThemeProvider, createTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LaunchIcon from '@mui/icons-material/Launch';

function PermanentDrawerRight() {
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
  const backgroundColorGlobal = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  console.log(backgroundColorGlobal);
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
  const drawerWidth = 280;

  const [isDarkMode, setIsDarkMode] = React.useState(false);
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>       
      </Box>
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
        anchor="right"
      >
        <Toolbar>
          <div className="col">
            <ConnectWallet accentColor="#000000" colorMode="dark"/>
            <div className="optionsRow">
              <CurrencyExchangeIcon/>
              {isDarkMode? <DarkModeIcon/> : <LightModeIcon/>}
              <NotificationsIcon/>     
            </div>
          </div>
        </Toolbar>
        <Box className="info-card">
          <div className="info-card__title">What is Fury of the Fur?</div>
          <div className="info-card__description">Fury of the Fur is a story-driven collection run by Sneaky Bird Labs. Abandoned by the founders, like the teddy bears of our youth, FOTF has risen back up. Full 4k resolution, Merchandise, Storyboards, Comics and more are available with your Ted.<br></br>
          <br></br>
          But Tedy's aren't just a PFP. They are a communicty representing the best parts of Web3 and NFTs. Left behind by their founders, the FOTF community rallied and saved the project.
          </div>
          <Box className="footer-card">
            <Button variant="contained" color="primary" 
            href="https://docs.furyofthefur.com" className="button-with-icon">
              Learn More &gt;
            </Button>
          </Box>
          
        </Box>
        <Box className="info-card">
          <div className="info-card__title">Our Partners</div>
          <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
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
          <Box className="footer-card">
            <Button variant="contained" color="primary" 
            href="https://docs.furyofthefur.com" className="button-with-icon">
              View Full Benefits &gt;
            </Button>
          </Box>
          
        </Box>
                
      </Drawer>
    </Box>
  );
}

export default PermanentDrawerRight;