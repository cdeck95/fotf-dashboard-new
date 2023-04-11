import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { ConnectWallet } from '@thirdweb-dev/react';
import { Button, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import Notifications from "react-notifications-menu";
import { useState } from 'react';
import notificationIcon from '../assets/icons8-notification-100.png';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

type NavProps = {
  setNavOpen: Function;
  navOpen: boolean;
};

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
const backgroundColorGlobal = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');

const DEFAULT_NOTIFICATION = {
  image:
    "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
  message: "Notification one.",
  detailPage: "/events",
  receivedTime: "12h ago"
};

function PermanentDrawerRight(props: NavProps) {
  const themeMui = useTheme();
  const isMobile = !useMediaQuery(themeMui.breakpoints.up("md"));
  const drawerWidth = isMobile ? 280 : 340;
  const { navOpen, setNavOpen } = props;
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [data, setData] = useState([DEFAULT_NOTIFICATION]);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  
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
    setShowNotification(true);
  };

  const openCurrencyExchange = () => {
    navigate("/HoneyExchange");
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
        anchor="right"
      >
        <Toolbar sx={{ marginLeft: "0px !important", marginRight: "0px !important", paddingLeft: "7px !important", paddingRight: "7px !important"}}>
          <div className="optionsRow">
            {/* this might need to be two rows for mobile */}
            {isMobile
              ?<IconButton onClick={() => setNavOpen(false)} size="small" sx={{margin: 0, padding: 0}}>
                  <ChevronLeftIcon style={{ fill: "black" }} />
                </IconButton>
              : <div></div>
            }
            <div onClick={openCurrencyExchange} className="center-flexbox">
              <CurrencyExchangeOutlinedIcon fontSize='small' className="pointer-icon"/>
            </div>
            <div onClick={toggleDarkMode} className="center-flexbox">
              {isDarkMode? <DarkModeOutlinedIcon fontSize='small' className="pointer-icon"/> : <LightModeOutlinedIcon fontSize='small' className="pointer-icon"/>}
            </div>
            <div onClick={openNotifications} className="center-flexbox">
              {/* <NotificationsOutlinedIcon fontSize='small' className="pointer-icon"/>   */}
              <Notifications
                data={data}
                icon={notificationIcon}
                header={{
                  title: "Notifications",
                  option: { text: "View All", onClick: () => console.log("Clicked") }
                }}
                markAsRead={(data: any) => {
                  console.log(data);
                }}
              />
            </div>
            <ConnectWallet accentColor="#000000" colorMode="dark" className={isMobile? "connectWalletOverride-Mobile" : "connectWalletOverride"}/>
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
          <Box className="row-even">
            <p className="info-card__description">
              Fury of the Fur is a story-driven collection run by Sneaky Bird Labs. Abandoned by the founders, like the teddy bears of our youth, FOTF has risen back up. Full 4k resolution, Merchandise, Storyboards, Comics and more are available with your Ted.<br></br>
              <br></br>
              But Tedy's aren't just a PFP. They are a community representing the best parts of Web3 and NFTs. Left behind by their founders, the FOTF community rallied and saved the project.
              </p>
          </Box>
         
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