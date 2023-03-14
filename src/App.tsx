import { useTheme, useMediaQuery, Box, ImageList } from "@mui/material";
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
import stakingABI from "./ABIs/stakingABI.json";
import honeyABI from "./ABIs/honeyABI.json";
import aiABI from "./ABIs/aiABI.json";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';


const FOTF_CONTRACT="0x06bdc702fb8af5af8067534546e0c54ea4243ea9";
const TEDDY_CONTRACT="0x4aB1337970E889Cf5E425A7267c51db183028cf4";
const STAKING_CONTRACT="0x15829C851C3117f662C5A9E369bC3A4dBbeaFEBF";
const REWARD_TOKEN="0x6ca0269dca415313256cfecD818F32c5AfF0A518";
const AI_MINT="0x1C6d280280f7f8d139659E314d738bdD466741Ba";

function App() {
  useTitle("FOTF | Staking");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();
  const [contract_FOTF, setContractFOTF] = useState<SmartContract<BaseContract>>();
  const [contract_TEDDY, setContractTeddy] = useState<SmartContract<BaseContract>>();
  const [contract_STAKING, setContractStaking] = useState<SmartContract<BaseContract>>();
  const [contract_REWARDS, setContractRewards] = useState<SmartContract<BaseContract>>();
  const [contract_AI, setContractAI] = useState<SmartContract<BaseContract>>();
 
  const [NFTs, setNFTs] = useState<NFT[]>();

  const { data: ownedNFTs, error, isLoading }  = useOwnedNFTs(contract_FOTF, address);

  const ownedNFTs2  = useOwnedNFTs(contract_TEDDY, address).data;
  console.log(ownedNFTs2);
  const ownedNFTs3  = useOwnedNFTs(contract_STAKING, address).data;
  console.log(ownedNFTs3);

  const honey  = useOwnedNFTs(contract_REWARDS, address).data;
  console.log(honey);

  const ownedNFTs5  = useOwnedNFTs(contract_AI, address).data;
  console.log(ownedNFTs5);

 
  let allOwnedNFTs: NFT[] = []; 
  ownedNFTs?.forEach(token => {
    console.log(token);
    allOwnedNFTs?.push(token);
  });
  ownedNFTs2?.forEach(token => {
    console.log(token);
    allOwnedNFTs?.push(token);
  });
  ownedNFTs3?.forEach(token => {
    console.log(token);
    allOwnedNFTs?.push(token);
  });
  
  ownedNFTs5?.forEach(token => {
    console.log(token);
    allOwnedNFTs?.push(token);
  });

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
      const contractIn = await sdk?.getContractFromAbi(TEDDY_CONTRACT, teddyABI);
      setContractTeddy(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }

  const LoadContractStaking = async () => {
    try{
      const contractIn = await sdk?.getContractFromAbi(STAKING_CONTRACT, stakingABI);
      setContractStaking(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }

  const LoadContractRewards = async () => {
    try{
      const contractIn = await sdk?.getContractFromAbi(REWARD_TOKEN, honeyABI);
      setContractRewards(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }

  const LoadContractAI = async () => {
    try{
      const contractIn = await sdk?.getContractFromAbi(AI_MINT, aiABI);
      setContractAI(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }

  const LoadHoney = async () => {
    try{
      const honeyBalance = await sdk?.wallet.balance(REWARD_TOKEN);
      console.log(honeyBalance);
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
      if (!contract_AI) {
        LoadContractAI();
      }
      if (allOwnedNFTs){
        setNFTs(allOwnedNFTs);
      }
      if (contract_REWARDS){
        LoadHoney();
      }
    } catch (e) {
      console.log(e);
      console.log("Error!");
    }
    
  }, [ownedNFTs, contract_FOTF, contract_TEDDY, contract_STAKING, contract_REWARDS, contract_AI]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const add = () => {
    console.log("adding...");
  }

  const star = () => {
    console.log("staring...");
  }

  
  return (
    <div className="container">
      <Box className="connect">
        <ConnectWallet accentColor="#000000" colorMode="dark"/>
      </Box>
      <main className="main">
      {address
      ? <div>
          { error ? <div><p>NFT not found - error</p></div> 
          : <div className="gallery">
              {ownedNFTs?
              <div>
                <ImageList cols={3} gap={20}>
                {allOwnedNFTs?.map(e =>
              //  {NFTs?.map(e =>
                <div key={e.metadata.id} className="card">
                  <StarBorderIcon onClick={star} sx={{ position: "absolute", top: "15px", right: "15px", zIndex: "100 !important'" }}/>
                  <ThirdwebNftMedia metadata={e.metadata} style={{ 
                    borderRadius: "10px", objectFit: "fill", marginBottom: "10px"
                     }}/>
                  <Box className="column-container">
                    <div className="large-left-column">
                      <h3 className="metadata-title">{e.metadata.name}</h3>
                      <h4 className="metadata">Last Transfer: 03/11/2023</h4>

                    </div>
                    <div className="small-right-column">
                      <ControlPointIcon onClick={add}/>
                    </div>
                  </Box>
                  
                  
                </div>
              )}
              </ImageList>
              </div>
              : <p>Loading...</p> }
             </div>
            }

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

      <Box sx={{ position: "fixed", bottom: "0px", left: "50%"}}>
        <p>honey</p>
      </Box>
       
      
      

      </main>
    </div>
  );
}

export default App;
