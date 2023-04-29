import {  Box, ImageList, useMediaQuery, useTheme } from "@mui/material";
import { ConnectWallet, ThirdwebNftMedia, useContract, useNFT, useOwnedNFTs } from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import teddyABI from "../ABIs/teddyABI.json";
import tedABI from "../ABIs/tedABI.json";
import stakingABI from "../ABIs/stakingABI.json";
import honeyABI from "../ABIs/honeyABI.json";
import aiABI from "../ABIs/aiABI.json";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, BigNumber, ethers } from "ethers";
import { NumericFormat } from 'react-number-format';
import NFTList from "../components/NFTList";
import "../styles/Dashboard.css";
import { LoadAllAccountDetails, allOwnedNFTs } from "../account/loadAllAccountDetails";

interface TheFactoryProps {
  allOwnedNFTs: allOwnedNFTs;
}

function TheFactory(props: TheFactoryProps) {
  useTitle("FOTF | The Factory");
  // const { tokens, isLoading, error, honeyBalance } = LoadAllAccountDetails();
  const allOwnedNFTs = props.allOwnedNFTs;
  const {tokens, isLoading, error, honeyBalance } = allOwnedNFTs;
  console.log(tokens);
  console.log(isLoading);
  console.log(error);
  console.log(honeyBalance);

  const AllTokens = tokens.AllTokens.tokens;
  const tedNFTs = tokens.Teds.tokens;
  const teddyNFTs = tokens.Teddies.tokens;
  const aiTedNFTs = tokens.AITeds.tokens;

  // const theme = useTheme();
  // const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  // const isLarge = !useMediaQuery(theme.breakpoints.up("lg"));
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();
  // const [contract_FOTF, setContractFOTF] = useState<SmartContract<BaseContract>>();
  // const [contract_STAKING, setContractStaking] = useState<SmartContract<BaseContract>>();
  // const [contract_REWARDS, setContractRewards] = useState<SmartContract<BaseContract>>();
  // const [contract_AI, setContractAI] = useState<SmartContract<BaseContract>>();
  // const [honey, setHoney] = useState<string>();
  // const [stakedNFTs, setStakedNFTs] = useState<NFT[]>();
  
  // const { data: tedNFTs, error, isLoading }  = useOwnedNFTs(contract_FOTF, address);

  // const { contract: contract_TEDDY } = useContract(TEDDY_CONTRACT);
  
 
  // const {data: teddyNFTs, error: errorTeddy, isLoading: isLoadingTeddy} = useOwnedNFTs(contract_TEDDY, address);
  // console.log(teddyNFTs);
  // console.log(errorTeddy);
  // console.log(isLoadingTeddy);

  // const {data: aiNFTs, error: errorAI, isLoading: isLoadingAI}  = useOwnedNFTs(contract_AI, address);
  // console.log(aiNFTs);
  // console.log(errorAI);
  // console.log(isLoadingAI);
  
  // const allOwnedNFTs: NFT[] = useMemo(() => {
  //   const returnNFTs: NFT[] = [];
  //   tedNFTs?.forEach(token => {
  //     console.log(token);
  //     returnNFTs?.push(token);
  //   });
  //   teddyNFTs?.forEach(token => {
  //     console.log(token);
  //     returnNFTs?.push(token);
  //   });
  //   stakedNFTs?.forEach(token => {
  //     console.log(token);
  //     returnNFTs?.push(token);
  //   });
  //   aiNFTs?.forEach(token => {
  //     console.log(token);
  //     returnNFTs?.push(token);
  //   });
    
  //   return returnNFTs;
  // }, [tedNFTs, teddyNFTs, aiNFTs, stakedNFTs]); 
  

  // const LoadStakedTokens = useCallback(async () => {
  //   let tokensToReturn: NFT[] = [];
  //   try{
  //     const data: StakedTokens[] = await contract_STAKING?.call(
  //       "getStakedTokens", // Name of your function as it is on the smart contract
  //       // Arguments to your function, in the same order they are on your smart contract
  //      address
  //     );
  //     console.log(data);
  //     const tokenIDs: string[] = [];
  //     data.forEach(token => {
  //       tokenIDs.push(token.tokenId.toString());
  //     });
      
  //     tokensToReturn = await AddStakedTokens(contract_TEDDY!, tokenIDs);
  //     console.log(tokensToReturn);
  //     setStakedNFTs(tokensToReturn);
  //   } catch (e) {
  //     console.log(e); 
  //   }
  // }, [address, contract_STAKING, contract_TEDDY]);

  

  // const LoadContractFOTF = useCallback(async () => {
  //   try{
  //     const contractIn = await sdk?.getContractFromAbi(FOTF_CONTRACT, tedABI);
  //     setContractFOTF(contractIn);
  //   } catch (e) {
  //     console.log(e); 
  //   }
  // }, [sdk]);

  // const LoadContractStaking = useCallback(async () => {
  //   try{
  //     const contractIn = await sdk?.getContractFromAbi(STAKING_CONTRACT, stakingABI);
  //     console.log(contractIn);
  //     setContractStaking(contractIn);
  //   } catch (e) {
  //     console.log(e); 
  //   }
  // }, [sdk]);

  // const LoadContractRewards = useCallback(async () => {
  //   try{
  //     const contractIn = await sdk?.getContractFromAbi(REWARD_TOKEN, honeyABI);
  //     setContractRewards(contractIn);
  //   } catch (e) {
  //     console.log(e); 
  //   }
  // }, [sdk]);

  // const LoadContractAI = useCallback(async () => {
  //   try{
  //     const contractIn = await sdk?.getContractFromAbi(AI_MINT, aiABI);
  //     setContractAI(contractIn);
  //   } catch (e) {
  //     console.log(e); 
  //   }
  // }, [sdk]);

  // const LoadHoney = useCallback(async () => {
  //   try{
  //     const data:BigNumber = await contract_REWARDS?.call(
  //       "balanceOf", // Name of your function as it is on the smart contract
  //       // Arguments to your function, in the same order they are on your smart contract
  //      address
  //     );
  //     const honeyTMP = parseFloat(ethers.utils.formatEther(data)).toFixed(3);
  //     setHoney(honeyTMP.toString());
  //   } catch (e) {
  //     console.log(e); 
  //   }
  // }, [address, contract_REWARDS]);

  // useEffect(() => {
  //   try {
  //     if (!contract_FOTF) {
  //       LoadContractFOTF();
  //     }
  //     if (!contract_REWARDS) {
  //       LoadContractRewards();
  //     }
  //     if (!contract_AI) {
  //       LoadContractAI();
  //     }
  //     if (!contract_STAKING) {
  //       LoadContractStaking();
  //     }
  //     // else {
  //     //   LoadStakedTokens();
  //     // }
  //     if(contract_TEDDY) {
  //       LoadStakedTokens();
  //     }
  //     if (contract_REWARDS){
  //       LoadHoney();
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     console.log("Error!");
  //   }
    
  // }, [sdk, address]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  

  //////////// Header ///////////////////////////

  interface IDictionary {
    [index:string]: string;
  }

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: { preventDefault: () => void; target: { value: SetStateAction<string>; }; }) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  
  try {
    if (searchInput.length > 0) {
    if(searchInput.match("[0-9]+")) {
      AllTokens.filter((token: NFT) => {
        console.log(token.metadata.id.match(searchInput));
        return token.metadata.id.match(searchInput);
    });
    } else {
      //filter on attributes
      
    }
  }
  } catch (error) {
    console.log(error);
    setSearchInput("");
  }

  //////////////////////////////////////////////

  return (
    <Box className="factory-inner-container">
      <Box className="header">
        <Box className="header-row">
          <h3>The Factory</h3>
          <input
            type="text"
            className="factory-search"
            placeholder="Search for Ted, Teddy or AI Token ID"
            onChange={handleSearch}
            value={searchInput} />
        </Box>
      </Box>
      {address
      ? <div>
          { error ? <div><p>NFT not found - error</p></div> 
          : <Box className="gallery" sx={{ paddingLeft: "10px", paddingBottom: "75px", backgroundColor: "white", paddingRight: "10px" }}>
              {allOwnedNFTs
              ? <NFTList tokens={AllTokens} searchText={searchInput} />
              : <p>Loading...</p> }
             </Box>
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
      <Box sx={{width: "100%", position: "fixed", bottom: "0px", left: "0px", height: "70px", backgroundColor: "#FED100"}}>
        <p className="stats">Not working yet</p>
        <div className="row">
          <NumericFormat value={honeyBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' HNY'} />
          <p className="stats">{tedNFTs?.length} Fury Teds</p>
          <p className="stats">{teddyNFTs?.length} Teddys</p>
          {/* <p className="stats">{stakedTeddies?.length} Staked Teddys</p> */}
          <p className="stats">{aiTedNFTs?.length} AI Teds</p>
        </div>
      </Box>
    </Box>  
  );
}

export default TheFactory;