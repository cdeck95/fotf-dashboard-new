import { useTheme, useMediaQuery } from "@mui/material";
import { ConnectWallet, MediaRenderer, ThirdwebNftMedia, useNFT, useNFTs, useOwnedNFTs } from "@thirdweb-dev/react";
import { useTitle } from "./hooks/useTitle";
import "./styles/Home.css";
import { useContractRead, useContract, Web3Button, useContractWrite, useAddress } from "@thirdweb-dev/react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import teddyABI from "./ABIs/teddyABI.json";
import tedABI from "./ABIs/tedABI.json";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";

 
function App() {
  useTitle("FOTF | Staking");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const address = useAddress();
  const [contract, setContract] = useState<SmartContract<BaseContract>>();
  //const { data: contract } = useContract(process.env.FOTF_CONTRACT);
  //const { data: contract } = useContract(process.env.NFT_CONTRACT);
  const [NFTs, setNFTs] = useState<NFT[]>();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState<any>(false);

  const ownedNFTs = useOwnedNFTs(contract, address).data;
  console.log(ownedNFTs);

  // const LoadTokens = () => {    
  //   console.log("loading NFTs..."); 
  //   const tokens = useOwnedNFTs(contract, address).data;
  //   setNFTs(tokens);
  // }

  const LoadContract = async () => {
    setLoading(true);
    console.log("loading contract..."); 
    try{
      console.log(contract);
      console.log(process.env.FOTF_CONTRACT);
      const contractIn = await sdk?.getContractFromAbi("0x06bdc702fb8af5af8067534546e0c54ea4243ea9", tedABI);
      console.log(`contract loaded...`); 
      console.log(contractIn);
      setContract(contractIn);
      setIsError(false);
    } catch (e) {
      console.log(e); 
      setIsError(true)
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!contract) {
      LoadContract();
    }
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   try {
  //     if (address && contract) {
  //       LoadTokens();
  //    }
  //   } catch (e) {
  //     console.log(e);
  //     setIsError(true);
  //   }
  //   setLoading(false);
  // }, [address]);

 // function GetNFTs(){
   // const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);
    

    //setNFTs(ownedNFTs);
    //setIsError(false);
 // }

  const [open, setOpen] = useState(false);
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
          { isError ? <div><p>NFT not found - error</p></div> 
          : <div className="gallery">
              {ownedNFTs? 
              <div>
              {/* {data?.map(e => */}
              {ownedNFTs?.map(e =>
                <div className="card">
                  <ThirdwebNftMedia metadata={e.metadata} />
                  <MediaRenderer 
                    src="ipfs://QmV4HC9fNrPJQeYpbW55NLLuSBMyzE11zS1L4HmL6Lbk7X" 
                  />
                </div>
              )}
              </div>
              : <p>Error loading NFTs</p> }
              
          </div>}

        {/* <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}
        </div>
      : <div><p>Connect your wallet</p> </div> 
      }
       
      
      

      </main>
    </div>
  );
}

export default App;
