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
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import Carousel from 'react-material-ui-carousel'
import enctrLogo from '../assets/ENCTR_Symbol_Dark.svg';
import onlyBurnsLogo from '../assets/OnlyBurns_Title_in_8K.svg';
import polygonLogo from '../assets/polygon-logo.png';
import thirdWebLogo from '../assets/thirdweb.png';
import accLogo from '../assets/accLogo.jpg';
import PartnerItem from './PartnerItem';

function PermanentDrawerRight() {
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
  const backgroundColorGlobal = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  console.log(backgroundColorGlobal);
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
  const drawerWidth = 340;

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  var partnersList = [
    {
      name: "Enctr",
      description: "The next generation of deFi",
      image: enctrLogo,
      partnerLink: "https://enctr.gg/"
    },
    {
      name: "NFT Supply",
      description: "Placeholder Text",
      image: enctrLogo,
      partnerLink: "https://enctr.gg/"
    },
    {
      name: "OnlyBurns",
      description: "Placeholder Text",
      image: onlyBurnsLogo,
      partnerLink: "https://onlyburns.com/"
    },
    {
      name: "Polygon Labs",
      description: "Placeholder Text",
      image: polygonLogo,
      partnerLink: "https://polygon.technology"
    }, 
    {
      name: "ThirdWeb",
      description: "The complete web3 sdk.",
      image: thirdWebLogo,
      partnerLink: "https://thirdweb.com/"
    },
    {
      name: "A.C.C NFTs",
      description: "Placeholder Text",
      image: accLogo,
      partnerLink: "https://www.oaccnft.com/"
    }
]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    console.log(isDarkMode);
  };

  const openNotifications = () => {
    console.log("open notifications");
  };

  const openCurrencyExchange = () => {
    console.log("open currency exchange");
  };
  

  return (
    <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, display: 'flex', justifyContent: "space-between"}}>       
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
        <Toolbar sx={{ marginLeft: "0px !important", marginRight: "0px !important", paddingLeft: "7px !important", paddingRight: "7px !important"}}>
          <div className="optionsRow">
            <div onClick={openCurrencyExchange} className="center-flexbox">
            {/* <ListItem key={"GraphicTemplates"} sx={{ padding: 0, margin: 0}} disablePadding onClick={() => openCurrencyExchange}>
              <ListItemButton sx={{ padding: 0, margin: 0}}>
                <ListItemIcon sx={{ padding: 0, margin: 0}}> */}
                  <CurrencyExchangeOutlinedIcon fontSize='small' className="pointer-icon"/>
                {/* </ListItemIcon>
              </ListItemButton>
            </ListItem> */}
            </div>
            <div onClick={toggleDarkMode} className="center-flexbox">
              {isDarkMode? <DarkModeOutlinedIcon fontSize='small' className="pointer-icon"/> : <LightModeOutlinedIcon fontSize='small' className="pointer-icon"/>}
            </div>
            <div onClick={openNotifications} className="center-flexbox">
              <NotificationsOutlinedIcon fontSize='small' className="pointer-icon"/>  
            </div>
            <ConnectWallet accentColor="#000000" colorMode="dark" className="connectWalletOverride"/>
          </div>
        </Toolbar>
        <Box className="info-card">
          <Box className="row-even">
            <div className="info-card__title">What is Fury of the Fur?</div>
            <Button 
            href="https://docs.furyofthefur.com" className="learnMoreBtn">
              Learn More
            </Button>
          </Box>
          <div className="info-card__description">Fury of the Fur is a story-driven collection run by Sneaky Bird Labs. Abandoned by the founders, like the teddy bears of our youth, FOTF has risen back up. Full 4k resolution, Merchandise, Storyboards, Comics and more are available with your Ted.<br></br>
          <br></br>
          But Tedy's aren't just a PFP. They are a community representing the best parts of Web3 and NFTs. Left behind by their founders, the FOTF community rallied and saved the project.
          </div>
        </Box>
        <Box className="info-card">
          <Box className="row-even">
            <div className="info-card__title">Our Partners</div>
            <Button 
              href="https://docs.furyofthefur.com" className="learnMoreBtn">
                View Full Benefits
              </Button>
          </Box>
          <Carousel autoPlay>
            {
                partnersList.map( (item, i) => <PartnerItem key={i} item={item} /> )
            }
          </Carousel>
        </Box>
      </Drawer>
    </Box>
  );
}

export default PermanentDrawerRight;