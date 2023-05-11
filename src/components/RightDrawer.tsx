import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { ConnectWallet, useAddress, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import Carousel from "react-material-ui-carousel";
import enctrLogo from "../assets/enctrlogo.jpg";
import onlyBurnsLogo from "../assets/onlyburnsapplogo.jpg";
import nftSupply from "../assets/nftsupplycologo.jpg";
import polygonLogo from "../assets/polygonlogo.jpg";
import thirdWebLogo from "../assets/thirdweblogo.jpg";
import accLogo from "../assets/oacclogo.jpg";
import PartnerItem from "./PartnerItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import Notifications from "react-notifications-menu";
import { useEffect, useState } from "react";
import notificationIcon from "../assets/icons8-notification-100.png";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AssetOverview from "./AssetOverview";
import AssetOverviewSidebar from "./AssetOverviewSidebar";

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

const DEFAULT_NOTIFICATION = {
  image:
    "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
  message: "Notification one.",
  detailPage: "/events",
  receivedTime: "12h ago",
};

function PermanentDrawerRight(props: NavProps) {
  const themeMui = useTheme();
  const isMobile = !useMediaQuery(themeMui.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(themeMui.breakpoints.down("lg"));
  const drawerWidth = isMobile ? "100%" : 340;
  const { navOpen, setNavOpen } = props;
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [data, setData] = useState([DEFAULT_NOTIFICATION]);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  var showAssetOverview = false;
  

  // setNavOpen(true);

  var blogTitle = "What is Fury of the Fur?";
  var blogContent = (
    <p className="info-card__description">
      Fury of the Fur is a story-driven collection run by Sneaky Bird Labs.
      Abandoned by the founders, like the teddy bears of our youth, FOTF has
      risen back up. Full 4k resolution, Merchandise, Storyboards, Comics and
      more are available with your Ted.<br></br>
      <br></br>But Tedy's aren't just a PFP. They are a community representing
      the best parts of Web3 and NFTs. Left behind by their founders, the FOTF
      community rallied and saved the project.
    </p>
  );

  console.log(window.location.pathname);

  // useEffect(() => {
  //   setNavOpen(!isMobile);
  // }, [isMobile]);

  switch (window.location.pathname) {
    case "/":
      showAssetOverview = false;
      break;
    case "/TheFactory":
      showAssetOverview = true;
      blogTitle = "What is The Factory!?";
      blogContent = (
        <p className="info-card__description">
          Only the most involved members of the Fury of the Fur community have
          access to The Factory. In order to get in, you must hold one of every
          base asset in the ecosystem.
          <br />
          <br />
          The Factory allows our Holders to burn their Fury Ted, Teddies by
          FOTF, or AI Teds in exchange for $HNY. OR you are able to burn any
          combination of the three (min 1 of each) together with a determined
          amount of $HNY in exchange for an exclusively designed 1 of 1.{" "}
        </p>
      );
      break;
    case "/HoneyExchange":
      showAssetOverview = true;
      blogTitle = "What is The $HNY Exchange?";
      blogContent = (
        <p className="info-card__description">
          The $HNY Exchange is your one stop shop for not only purchasing $HNY,
          at a declared exchange rate, but quickly accessing how much you're
          earning every day.
          <br />
          <br />
          With so many different ways to earn $HNY, and so much being done with
          it, we created the Exchange as a way to keep it all in one, easy to
          access, area.
          <br />
          <br />
          Please note: No physical items purchased with $HNY include shipping.
          Shipping must be paid via fiat through the link given to you after
          purchase.
        </p>
      );
      break;
    case "/Bridge":
      showAssetOverview = true;
      blogTitle = "What is Polygon Bridge?!";
      blogContent = (
        <p className="info-card__description">
          Simply put, it is a gas savings way for Fury of The Fur to exist as the brand we've all pictured.
          Polygon is a Layer 2 Solution, meaning all assets will still exist on the Ethereum Blockchain in 
          some way.
          <br />
          <br />
          With lower gas fees & quicker transactions, Polygon not only allows you to spend less money on 
          fees, but will also allow us to continue focusing on mass adoption of blockchain technologies
          into a full functioning brand.
        </p>
      );
      break;
    case "/bridge":
      showAssetOverview = true;
      blogTitle = "What is Polygon Bridge?!";
      blogContent = (
        <p className="info-card__description">
          Simply put, it is a gas savings way for Fury of The Fur to exist as the brand we've all pictured.
          Polygon is a Layer 2 Solution, meaning all assets will still exist on the Ethereum Blockchain in 
          some way.
          <br />
          <br />
          With lower gas fees & quicker transactions, Polygon not only allows you to spend less money on 
          fees, but will also allow us to continue focusing on mass adoption of blockchain technologies
          into a full functioning brand.
        </p>
      );
      break;
    case "/TeddyStaking":
      showAssetOverview = true;
      blogTitle = "Teddy Staking!?";
      blogContent = (
        <p className="info-card__description">
          Teddies earn $HNY via traditional staking methods. This means sending
          your Teddie out of your wallet, and into a smart contract that will
          maintain ownership and issue rewards for a pre-determined amount of
          time. In this case, there is no time-lock and Teddies can be withdrawn
          at any time.
          <br />
          <br />
          Each Teddy will earn $100 HNY per day while being Staked and, although
          they are no longer in your wallet, you will still be able to interact
          with them via our application.
        </p>
      );
      break;
    case "/TedClaims":
      showAssetOverview = true;
      blogTitle = "What are Ted Claims?";
      blogContent = (
        <p className="info-card__description">
          Fury Teds are the flagship digital collectible that launched Fury of
          the Fur into the world. As our Genesis Collection was created by the
          first team, that left the project, we did write the contract. This
          makes staking a pain in the butt, so we came up with on chain earning.
          <br />
          <br />
          Each Fury Ted earns $50 HNY per day, on chain. The $HNY may only be
          claimed by the current wallet holder and the value resets upon each
          claim. If you're thinking of buying one, check the $HNY Balance first.
        </p>
      );
      break;
    case "/TraitSwapTeds":
      showAssetOverview = true;
      blogTitle = "What is Trait Swapping?";
      blogContent = (
        <p className="info-card__description">
          Exactly as it sounds. Here at Fury of the Fur, we believe in fully
          customizing your ecosystem experience and that starts with your NFTs.
          <br />
          <br />
          Though we do not allow for constant swapping of your DNA or Eyes, you
          are able to swap your Headgear, Clothing and Equipment at any time for
          one{" "}
          <span className="bold-text">
            <strong>Trait Swap Token</strong>
          </span>{" "}
          per Trait. We have also integrated custom names for your NFTs because
          who doesn't like to name their Teddy Bear?
        </p>
      );
      break;
    default:
      showAssetOverview = false;
      break;
  }

  var partnersList = [
    {
      id: 0,
      name: "Enctr",
      description: "The next generation of deFi",
      image: enctrLogo,
      partnerLink: "https://enctr.gg/",
    },
    {
      id: 1,
      name: "NFT Supply",
      description: "Placeholder Text",
      image: nftSupply,
      partnerLink: "https://enctr.gg/",
    },
    {
      id: 2,
      name: "OnlyBurns",
      description: "Placeholder Text",
      image: onlyBurnsLogo,
      partnerLink: "https://onlyburns.com/",
    },
    {
      id: 3,
      name: "Polygon Labs",
      description: "Placeholder Text",
      image: polygonLogo,
      partnerLink: "https://polygon.technology",
    },
    {
      id: 4,
      name: "ThirdWeb",
      description: "The complete web3 sdk.",
      image: thirdWebLogo,
      partnerLink: "https://thirdweb.com/",
    },
    {
      id: 5,
      name: "A.C.C NFTs",
      description: "Placeholder Text",
      image: accLogo,
      partnerLink: "https://www.oaccnft.com/",
    },
  ];

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
    if (isMobile) {
      setNavOpen(false);
    }
  };

  const handleClickLink = () => {
    if (isMobile) {
      setNavOpen(false);
    }
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", zIndex: "100" }}
    >
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      ></Box>
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
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          },
        }}
        open={navOpen}
        variant="permanent"
        anchor="right"
      >
        <Toolbar
          sx={{
            marginLeft: "0px !important",
            marginRight: "0px !important",
            paddingLeft: "7px !important",
            paddingRight: "7px !important",
          }}
        >
          <Box className="optionsRow">
            {/* this might need to be two rows for mobile */}
            {isMobile || isMediumLarge ? (
              <IconButton
                onClick={() => setNavOpen(false)}
                size="small"
                sx={{ margin: 0, padding: 0 }}
              >
                <ChevronLeftIcon style={{ fill: "black" }} />
              </IconButton>
            ) : (
              <div></div>
            )}
            <div onClick={openCurrencyExchange} className="center-flexbox">
              <CurrencyExchangeOutlinedIcon
                fontSize="small"
                className="pointer-icon"
              />
            </div>
            {/* <div onClick={toggleDarkMode} className="center-flexbox">
              {isDarkMode? <DarkModeOutlinedIcon fontSize='small' className="pointer-icon"/> : <LightModeOutlinedIcon fontSize='small' className="pointer-icon"/>}
            </div>
            <div onClick={openNotifications} className="center-flexbox">
              <NotificationsOutlinedIcon fontSize='small' className="pointer-icon"/>  
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
            </div> */}
            <ConnectWallet
              accentColor="#000000"
              colorMode="dark"
              className={
                isMobile
                  ? "connectWalletOverride-Mobile"
                  : "connectWalletOverride"
              }
            />
          </Box>
        </Toolbar>
        <Box className="info-card">
          <Box className="row-between">
            <div className="info-card__title">{blogTitle}</div>
            <Button
              onClick={() => handleClickLink()}
              href="https://docs.furyofthefur.com"
              className="learnMoreBtn"
            >
              Learn More
            </Button>
          </Box>
          <Box className="row-even">{blogContent}</Box>
        </Box>
        {showAssetOverview && <AssetOverviewSidebar />}
        <Box className="info-card">
          <Box className="row-between">
            <div className="info-card__title">Our Partners</div>
            <Button
              onClick={() => handleClickLink()}
              href="https://docs.furyofthefur.com"
              className="learnMoreBtn"
            >
              View Full Benefits
            </Button>
          </Box>
          {/* <Carousel autoPlay sx={{height: "200px"}}>
            {
                partnersList.map( (item, i) => <PartnerItem key={i} item={item} /> )
            }
          </Carousel> */}
          <ImageList
            sx={{
              height: 240,
              textAlign: "center",
              margin: "0",
              paddingTop: "0px",
            }}
            cols={3}
            gap={isMobile ? 8 : 8}
            rowHeight={isMobile ? 110 : 110}
          >
            {/* <ImageList sx={{ width: drawerWidth, height: 240, paddingLeft: "10px", paddingRight: "10px", textAlign: "center", margin: "0", paddingTop: "0px"  }} cols={3} gap={isMobile ? 8 : 8} rowHeight={isMobile? 110: 110}> */}
            {partnersList.map((item) => (
              <ImageListItem
                key={item.id}
                sx={{
                  height: "75px",
                  width: "75px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                }}
                onClick={() => window.open(item.partnerLink)}
              >
                <img
                  src={item.image}
                  srcSet={item.image}
                  alt={item.name}
                  className="partnerLogo"
                  loading="lazy"
                />
                <ImageListItemBar title={item.name} position="below" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Drawer>
    </Box>
  );
}

export default PermanentDrawerRight;
