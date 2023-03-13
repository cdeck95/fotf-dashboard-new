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

  const { data: ownedNFTs, error, isLoading }  = useOwnedNFTs(contract, address);
  console.log(ownedNFTs);
 
 // const ownedNFTs = ownedNFTsIn;


  const LoadContract = async () => {
    setLoading(true);
    console.log("loading contract..."); 
    try{
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
    try {
      if (!contract) {
        LoadContract();
      }
      if(ownedNFTs){
        ownedNFTs.forEach(token => {
          token.metadata.uri = token.metadata.uri.replace(' ', '%20');
        });
        setNFTs(ownedNFTs);
      //  console.log(ownedNFTs);
      // console.log(NFTs);
      }
    } catch (e) {
      console.log(e);
      console.log("Error!");
    }
    
  }, [ownedNFTs, contract]);

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
              {NFTs?.map(e =>
              // {ownedNFTs?.map(e =>
                <div key={e.metadata.id} className="card">
                  <p>{e.metadata.id}</p>
                  <img src={e.metadata.image!}/>
                  <p>{e.metadata.description}</p>
                  
                    <ThirdwebNftMedia metadata={e.metadata} />
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
