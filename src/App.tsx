import { useTheme, useMediaQuery } from "@mui/material";
import { ConnectWallet, ThirdwebNftMedia, useNFT, useNFTs, useOwnedNFTs } from "@thirdweb-dev/react";
import { useTitle } from "./hooks/useTitle";
import "./styles/Home.css";
import { useContractRead, useContract, Web3Button, useContractWrite, useAddress } from "@thirdweb-dev/react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";



function Home() {
  useTitle("FOTF | Staking");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const { data: contract } = useContract(process.env.REACT_APP_NFT_CONTRACT);
  const address = useAddress()
  const { data, isLoading, error } = useNFTs(contract, {
    // For example, to only return the first 50 NFTs in the collection
    count: 50,
    start: 0,
  })
  //const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);

  const [open, setOpen] = useState(isLoading);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://thirdweb.com/">thirdweb</a>!
        </h1>

        <div className="connect">
          <ConnectWallet accentColor="#FED100" colorMode="dark"/>
        </div>
    
      {address
      ? <div>
          { error ? <div>NFT not found - error</div> 
          : <div className="gallery">
              {data?.map(e =>
              // {ownedNFTs?.map(e =>
                <div className="card">
                  <ThirdwebNftMedia metadata={e.metadata} />
                </div>
              )}
          </div>}

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        </div>
      : <p>Connect your wallet</p>
      }
       
      
      

      </main>
    </div>
  );
}

export default Home;
