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


const FOTF_CONTRACT="0x06bdc702fb8af5af8067534546e0c54ea4243ea9";
const TEDDY_CONTRACT="0x4aB1337970E889Cf5E425A7267c51db183028cf4";
const STAKING_CONTRACT="0x15829C851C3117f662C5A9E369bC3A4dBbeaFEBF";
const REWARD_TOKEN="0x6ca0269dca415313256cfecD818F32c5AfF0A518";

function App() {
  useTitle("FOTF | Staking");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const address = useAddress();
  const [contract_FOTF, setContractFOTF] = useState<SmartContract<BaseContract>>();
  const [contract_TEDDY, setContractTeddy] = useState<SmartContract<BaseContract>>();
  const [contract_STAKING, setContractStaking] = useState<SmartContract<BaseContract>>();
  const [contract_REWARDS, setContractRewards] = useState<SmartContract<BaseContract>>();


  const { data: ownedNFTs, error, isLoading }  = useOwnedNFTs(contract_FOTF, address);
  //const { data: ownedNFTs, error, isLoading }  = useOwnedNFTs(contract_TEDDY, address);
  //const { data: ownedNFTs, error, isLoading }  = useOwnedNFTs(contract_STAKING, address);
  //const { data: ownedNFTs, error, isLoading }  = useOwnedNFTs(contract_REWARDS, address);



  const LoadContractFOTF = async () => {
    try{
      const contractIn = await sdk?.getContractFromAbi(FOTF_CONTRACT, tedABI);
      setContractFOTF(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }

  const LoadContractTeddy = async () => {
    try{
      const contractIn = await sdk?.getContractFromAbi(TEDDY_CONTRACT, tedABI);
      setContractTeddy(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }

  const LoadContractStaking = async () => {
    try{
      const contractIn = await sdk?.getContractFromAbi(STAKING_CONTRACT, tedABI);
      setContractStaking(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }

  const LoadContractRewards = async () => {
    try{
      const contractIn = await sdk?.getContractFromAbi(REWARD_TOKEN, tedABI);
      setContractRewards(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }

  useEffect(() => {
    try {
      if (!contract_FOTF) {
        LoadContractTeddy();
      }
      if (!contract_TEDDY) {
        LoadContractFOTF();
      }
      if (!contract_STAKING) {
        LoadContractStaking();
      }
      if (!contract_REWARDS) {
        LoadContractRewards();
      }
    } catch (e) {
      console.log(e);
      console.log("Error!");
    }
    
  }, [ownedNFTs, contract_FOTF, contract_TEDDY, contract_STAKING, contract_REWARDS]);

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
          { error ? <div><p>NFT not found - error</p></div> 
          : <div className="gallery">
              {ownedNFTs?
              <div>
             
              {ownedNFTs?.map(e =>
                <div key={e.metadata.id} className="card">
                  <ThirdwebNftMedia metadata={e.metadata} />
                </div>
              )}
              </div>
              : <p>Loading...</p> }
              
          </div>}

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        </div>
      : <div><p>Connect your wallet</p> </div> 
      }
       
      
      

      </main>
    </div>
  );
}

export default App;
