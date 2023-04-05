import {  Box, ImageList } from "@mui/material";
import { ConnectWallet, ThirdwebNftMedia, useContract, useNFT, useOwnedNFTs } from "@thirdweb-dev/react";
import { useTitle } from "./hooks/useTitle";
import "./styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import TheFactory from "./components/TheFactory";
import LeftDrawer from "./components/LeftDrawer";
import RightDrawer from "./components/RightDrawer";


function App() {
  useTitle("FOTF | Dashboard");
  //const theme = useTheme();
  //const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
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

  
  return (
    <div className="container">
      <LeftDrawer/>
      {address
      ? <Box sx={{
        marginLeft: "260px",
        marginRight: "260px",
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "white",
      }}>
          <Box >
            <p>Wallet Connected</p>
            {/* <TheFactory/> */}
          </Box>
        </Box>
       : <div><p>Connect your wallet</p> </div> 
      }
      <RightDrawer/>
     
    </div>
  );
}

export default App;
