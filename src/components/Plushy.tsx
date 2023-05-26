import { Box, Button, CircularProgress, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import {
  ThirdwebProvider,
  coinbaseWallet,
  localWallet,
  metamaskWallet,
  safeWallet,
  useAddress,
  walletConnect,
} from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import { LoadETHAccountDetails } from "../account/loadETHAccountDetails";
import { PolygonProps, PolygonPropsNoNav } from "../views/Dashboard";
import NFTList from "./NFTList";
import LoadingDialog from "./LoadingDialog";
import plushy from "../assets/plushy.jpg";
import { useState, useEffect } from "react";

function Plushy() {

    const theme = useTheme();
    const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
    const isLarge = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXL = !useMediaQuery(theme.breakpoints.down("xl"));
    const isFullScreen = useMediaQuery(theme.breakpoints.up(1800));
    const [isSmallScreen, setSmallScreen] = useState(false);
    console.log(`Mobile:  ${isMobile}`);
    console.log(`Small:  ${isSmall}`);
    console.log(`Medium:  ${isMedium}`);
    console.log(`Medium-Large:  ${isMediumLarge}`);
    console.log(`Large:  ${isLarge}`);
    console.log(`XL:  ${isXL}`);
    console.log(`Is 1920:  ${isFullScreen}`);

    useEffect(() => {
        if (!isMobile && isMediumLarge) {
          setSmallScreen(true);
        } else {
          setSmallScreen(isMobile);
        }
      }, [isMobile, isMediumLarge, isSmallScreen]);

    return (
        <Box className="row-between" sx={{height: "auto", width: "100%", marginBottom: isSmallScreen? "15px": "0px", paddingTop: isSmallScreen? "7.5px": "0px", paddingBottom: isSmallScreen? "7.5px": "0px", paddingLeft: "10px", paddingRight: "10px", backgroundColor: "#fff", borderRadius: "10px"}}>
            <Box className="half-col">
                <img src={plushy} alt="Plushies" className={isSmallScreen ? "plushyImage-mobile" : "plushyImage"}/>
            </Box>
            <Box className="half-col" sx={{paddingLeft: "5px"}}>
                <Typography className={isSmallScreen ? "page-header-small-mobile" : "page-header-small"}> 
                    Ted Plushy Launch
                </Typography>
                <Typography sx={{fontSize: "1rem"}}>
                    <span className="accent-text">$44.99</span> Collectors Box Edition Pre-Order
                </Typography>
                <Typography sx={{fontSize: "1rem"}}>
                    <span className="accent-text">$9.99</span> / Individual Teddy Plushy Pre-Order
                </Typography>
                <Typography className="small-text">
                    Who doesn't love a Teddy Bear? Stitched with large eyes, large face, tiny ears, non-toxic soft and silky plush fabric, soft huggable body and machine washable.
                </Typography>
                <Button className="dashboard-button" variant="contained" color="primary" onClick={() => window.open("https://shopfotf.com/")}>
                    Get Your Plushy
                </Button>
            </Box>
        </Box>
    );
}

export default Plushy;
