import {  Box, ImageList } from "@mui/material";
import { ConnectWallet, ThirdwebNftMedia, useContract, useNFT, useOwnedNFTs } from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import teddyABI from "../ABIs/teddyABI.json";
import tedABI from "../ABIs/tedABI.json";
import stakingABI from "../ABIs/stakingABI.json";
import honeyABI from "../ABIs/honeyABI.json";
import aiABI from "../ABIs/aiABI.json";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, BigNumber, ethers } from "ethers";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { NumericFormat } from 'react-number-format';


const FOTF_CONTRACT="0x06bdc702fb8af5af8067534546e0c54ea4243ea9";
const TEDDY_CONTRACT="0x4aB1337970E889Cf5E425A7267c51db183028cf4";
const STAKING_CONTRACT="0x15829C851C3117f662C5A9E369bC3A4dBbeaFEBF";
const REWARD_TOKEN="0x6ca0269dca415313256cfecD818F32c5AfF0A518";
const AI_MINT="0x1C6d280280f7f8d139659E314d738bdD466741Ba";

interface StakedTokens {
  address: string;
  tokenId: BigNumber;
}

async function AddStakedTokens(contract_TEDDY: SmartContract, tokenIDs: string[]) {
  //const { data: stakedTeddy, isLoading: isLoadingStakedTeddy, error: errorStakedTeddy } = await useNFT(contract_STAKING, BigNumber.from(tokenID));
  const {data: allStakedNFTs, error: errorStaked, isLoading: isLoadingStaked} = useOwnedNFTs(contract_TEDDY, STAKING_CONTRACT);
  console.log(allStakedNFTs);
  console.log(errorStaked);
  console.log(isLoadingStaked);

  console.log("adding staked tokens")
  console.log(allStakedNFTs);
  const tokens: NFT[] = [];
  allStakedNFTs?.map(token => {
    console.log(token.owner);
    if(tokenIDs.includes(token.owner)){
      console.log(`${token.metadata.id} is staked}`)
      tokens.push(token);
    }
  });
  return tokens;   
}

function TheFactory() {
  useTitle("FOTF | The Factory");
  //const theme = useTheme();
  //const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();
  const [contract_FOTF, setContractFOTF] = useState<SmartContract<BaseContract>>();
  const [contract_STAKING, setContractStaking] = useState<SmartContract<BaseContract>>();
  const [contract_REWARDS, setContractRewards] = useState<SmartContract<BaseContract>>();
  const [contract_AI, setContractAI] = useState<SmartContract<BaseContract>>();
  const [honey, setHoney] = useState<string>();
  const [stakedNFTs, setStakedNFTs] = useState<NFT[]>();
  
  const { data: tedNFTs, error, isLoading }  = useOwnedNFTs(contract_FOTF, address);

  const { contract: contract_TEDDY } = useContract(TEDDY_CONTRACT);
  
 
  const {data: teddyNFTs, error: errorTeddy, isLoading: isLoadingTeddy} = useOwnedNFTs(contract_TEDDY, address);
  console.log(teddyNFTs);
  console.log(errorTeddy);
  console.log(isLoadingTeddy);

  // const { contract: contract_STAKING } = useContract(STAKING_CONTRACT);

  const {data: aiNFTs, error: errorAI, isLoading: isLoadingAI}  = useOwnedNFTs(contract_AI, address);
  console.log(aiNFTs);
  console.log(errorAI);
  console.log(isLoadingAI);
  
  const allOwnedNFTs: NFT[] = useMemo(() => {
    const returnNFTs: NFT[] = [];
    tedNFTs?.forEach(token => {
      console.log(token);
      returnNFTs?.push(token);
    });
    teddyNFTs?.forEach(token => {
      console.log(token);
      returnNFTs?.push(token);
    });
    stakedNFTs?.forEach(token => {
      console.log(token);
      returnNFTs?.push(token);
    });
    aiNFTs?.forEach(token => {
      console.log(token);
      returnNFTs?.push(token);
    });
    
    return returnNFTs;
  }, [tedNFTs, teddyNFTs, aiNFTs, stakedNFTs]); 
  

  const LoadStakedTokens = useCallback(async () => {
    let tokensToReturn: NFT[] = [];
    try{
      const data: StakedTokens[] = await contract_STAKING?.call(
        "getStakedTokens", // Name of your function as it is on the smart contract
        // Arguments to your function, in the same order they are on your smart contract
       address
      );
      console.log(data);
      const tokenIDs: string[] = [];
      data.forEach(token => {
        tokenIDs.push(token.tokenId.toString());
      });
      
      tokensToReturn = await AddStakedTokens(contract_TEDDY!, tokenIDs);
      console.log(tokensToReturn);
      setStakedNFTs(tokensToReturn);
    } catch (e) {
      console.log(e); 
    }
  }, [address, contract_STAKING, contract_TEDDY]);

  

  const LoadContractFOTF = useCallback(async () => {
    try{
      const contractIn = await sdk?.getContractFromAbi(FOTF_CONTRACT, tedABI);
      setContractFOTF(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }, [sdk]);

  const LoadContractStaking = useCallback(async () => {
    try{
      const contractIn = await sdk?.getContractFromAbi(STAKING_CONTRACT, stakingABI);
      console.log(contractIn);
      setContractStaking(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }, [sdk]);

  const LoadContractRewards = useCallback(async () => {
    try{
      const contractIn = await sdk?.getContractFromAbi(REWARD_TOKEN, honeyABI);
      setContractRewards(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }, [sdk]);

  const LoadContractAI = useCallback(async () => {
    try{
      const contractIn = await sdk?.getContractFromAbi(AI_MINT, aiABI);
      setContractAI(contractIn);
    } catch (e) {
      console.log(e); 
    }
  }, [sdk]);

  const LoadHoney = useCallback(async () => {
    try{
      const data:BigNumber = await contract_REWARDS?.call(
        "balanceOf", // Name of your function as it is on the smart contract
        // Arguments to your function, in the same order they are on your smart contract
       address
      );
      const honeyTMP = parseFloat(ethers.utils.formatEther(data)).toFixed(3);
      setHoney(honeyTMP.toString());
    } catch (e) {
      console.log(e); 
    }
  }, [address, contract_REWARDS]);

  useEffect(() => {
    try {
      if (!contract_FOTF) {
        LoadContractFOTF();
      }
      if (!contract_REWARDS) {
        LoadContractRewards();
      }
      if (!contract_AI) {
        LoadContractAI();
      }
      if (!contract_STAKING) {
        LoadContractStaking();
      }
      // else {
      //   LoadStakedTokens();
      // }
      if(contract_TEDDY) {
        LoadStakedTokens();
      }
      if (contract_REWARDS){
        LoadHoney();
      }
    } catch (e) {
      console.log(e);
      console.log("Error!");
    }
    
  }, [sdk, address]);

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
    <Box className="inner-container">
      {address
      ? <div>
          { error ? <div><p>NFT not found - error</p></div> 
          : <div className="gallery">
              {allOwnedNFTs?
              <div>
                <ImageList cols={3} gap={20}>
                {allOwnedNFTs?.map(e =>
                <div key={e.metadata.id} className="card">
                  <StarBorderIcon onClick={star} sx={{ position: "absolute", top: "15px", right: "15px", zIndex: "100 !important'" }}/>
                  <ThirdwebNftMedia metadata={e.metadata} style={{ 
                    borderRadius: "10px", objectFit: "cover", marginBottom: "10px"
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

      <Box sx={{width: "100%", position: "fixed", bottom: "0px", height: "70px", backgroundColor: "#FED100"}}>
        <div className="row">
          <NumericFormat value={honey} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' HNY'} />
          <p className="stats">{tedNFTs?.length} Fury Teds</p>
          <p className="stats">{teddyNFTs?.length} Teddys</p>
          {/* <p className="stats">{stakedTeddies?.length} Staked Teddys</p> */}
          <p className="stats">{aiNFTs?.length} AI Teds</p>
        </div>
      </Box>
    </Box>
  );
}

export default TheFactory;