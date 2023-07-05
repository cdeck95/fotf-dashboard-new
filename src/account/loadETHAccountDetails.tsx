import {
  useSDK,
  useAddress,
  useOwnedNFTs,
  useContract,
  useNFT,
} from "@thirdweb-dev/react";
import { NFT, SmartContract, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { BaseContract, BigNumber, BigNumberish, ethers } from "ethers";
import { useState, useMemo, useCallback, useEffect } from "react";
import teddyABI from "../ABIs/teddyABI.json";
import tedABI from "../ABIs/tedABI.json";
import stakingABI from "../ABIs/stakingABI.json";
import honeyABI from "../ABIs/honeyABI.json";
import aiABI from "../ABIs/aiABI.json";
import birthCertsABI from "../ABIs/birthCertsABI.json";
import oneOfOneABI from "../ABIs/oneOfOneABI.json";
import { LoadStakedTeddy } from "./loadStakedTeddy";
import { IDictionary } from "../views/TheFactory";


interface StakedTokens {
  address: string;
  tokenId: BigNumber;
}

export interface tokens {
  OneofOnes?: {
    address: string;
    tokens: NFT[];
  };
  BirthCertificates?: {
    address: string;
    tokens: NFT[];
  };
  AllTokens: {
    address: string;
    tokens: NFT[];
  };
}

export interface allOwnedNFTs {
  tokens: tokens;
  isLoadingBirthCerts: boolean,
  isLoadingOneOfOne: boolean,
  errorBirthCerts: boolean,
  errorOneOfOne: boolean,
  hasWalletClaimedETHHoney: boolean,
  // honeyBalance: string;
}

export const initialState: allOwnedNFTs = {
  isLoadingBirthCerts: false,
  isLoadingOneOfOne: false,
  errorBirthCerts: false,
  errorOneOfOne: false,
  hasWalletClaimedETHHoney: true,
  // honeyBalance: "0",
  tokens: {
    OneofOnes: {
      address: "",
      tokens: [],
    },
    BirthCertificates: {
      address: "",
      tokens: [],
    },
    AllTokens: {
      address: "",
      tokens: [],
    },
  },
};

// const FOTF_CONTRACT = "0x06bdc702fb8af5af8067534546e0c54ea4243ea9";
// const TEDDY_CONTRACT = "0x4aB1337970E889Cf5E425A7267c51db183028cf4";
// const STAKING_CONTRACT = "0x15829C851C3117f662C5A9E369bC3A4dBbeaFEBF";
const REWARD_TOKEN = "0x6ca0269dca415313256cfecD818F32c5AfF0A518";
// const AI_MINT = "0x1C6d280280f7f8d139659E314d738bdD466741Ba";
const BIRTH_CERTIFICATE_CONTRACT = "0xFC182BB64a3283f880861E065463356de92FBEcb";
const ONE_OF_ONE_CONTRACT = "0x76b9D178fc4AdDaC0A2B6366d4DD44b4F900C168";

// async function AddStakedTokens(
//   contract_TEDDY: SmartContract,
//   tokenIDs: string[]
// ) {
//   tokenIDs.forEach((tokenID) => {
//     console.log(tokenID);
//     const { data: stakedTeddy, isLoading: isLoadingStakedTeddy, error: errorStakedTeddy } = await useNFT(contract_TEDDY, BigNumber.from(tokenID));
//   }
//   // const {
//   //   data: allStakedNFTs,
//   //   error: errorStaked,
//   //   isLoading: isLoadingStaked,
//   // } = useOwnedNFTs(contract_TEDDY, STAKING_CONTRACT);
//   console.log(allStakedNFTs);
//   console.log(errorStaked);
//   console.log(isLoadingStaked);

//   console.log("adding staked tokens");
//   console.log(allStakedNFTs);
//   const tokens: NFT[] = [];
//   allStakedNFTs?.map((token) => {
//     console.log(token.owner);
//     if (tokenIDs.includes(token.owner)) {
//       console.log(`${token.metadata.id} is staked}`);
//       tokens.push(token);
//     }
//   });
//   return tokens;
// }

/////////////// Load All NFTs ///////////////////////

export function LoadETHAccountDetails(): allOwnedNFTs {
  const allOwnedNFTs: allOwnedNFTs = initialState;
  
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();

  // const [contract_FOTF, setContractFOTF] =
  //   useState<SmartContract<BaseContract>>();
  // const [contract_STAKING, setContractStaking] =
  //   useState<SmartContract<BaseContract>>();
  const [contract_REWARDS, setContractRewards] =
    useState<SmartContract<BaseContract>>();
  // const [contract_AI, setContractAI] = useState<SmartContract<BaseContract>>();
  const [contract_BIRTHCERTS, setContractBirthCerts] =
    useState<SmartContract<BaseContract>>();
  const [contract_OneOfOne, setContractOneOfOne] =
    useState<SmartContract<BaseContract>>();

  // const [honey, setHoney] = useState<string>();
  // const [stakedNFTs, setStakedNFTs] = useState<NFT[]>();

  // const {
  //   data: tedNFTs,
  //   error: errorTed,
  //   isLoading: isLoadingTed,
  // } = useOwnedNFTs(contract_FOTF, address);
  // console.log(tedNFTs);

  // const {contract: tedContract } = useContract(FOTF_CONTRACT);

  // const {
  //   data: tedNFTs2,
  //   error: errorTed2,
  //   isLoading: isLoadingTed2,
  // } = useOwnedNFTs(tedContract, address);
  // console.log(tedNFTs2);
  // console.log(errorTed2);
  // console.log(isLoadingTed2);

  //allOwnedNFTs.isLoadingTed = isLoadingTed;

  // const { contract: contract_BIRTH } = useContract(BIRTH_CERTIFICATE_CONTRACT);
  const {
    data: birthCertsNFTs,
    error: errorBirthCerts,
    isLoading: isLoadingBirthCerts,
  } = useOwnedNFTs(contract_BIRTHCERTS, address);
  console.log(birthCertsNFTs);
  console.log(errorBirthCerts);
  console.log(isLoadingBirthCerts);

  allOwnedNFTs.isLoadingBirthCerts = isLoadingBirthCerts; 
  if(errorBirthCerts){
    allOwnedNFTs.errorBirthCerts = true;
  } else {
    allOwnedNFTs.errorBirthCerts = false;
  }

  const { contract: contract_OneOfOneNative } = useContract(ONE_OF_ONE_CONTRACT);
  console.log(contract_OneOfOneNative);
  const {
    data: oneOfOneNFTs,
    error: errorOneOfOne,
    isLoading: isLoadingOneOfOne,
  } = useOwnedNFTs(contract_OneOfOneNative, address);

  // const {
  //   data: oneOfOneNFTs,
  //   error: errorOneOfOne,
  //   isLoading: isLoadingOneOfOne,
  // } = useOwnedNFTs(contract_OneOfOne, address);
  console.log(contract_OneOfOne);
  console.log(oneOfOneNFTs);
  console.log(errorOneOfOne);
  console.log(isLoadingOneOfOne);

  allOwnedNFTs.isLoadingOneOfOne = isLoadingOneOfOne;
  if(errorOneOfOne){
    allOwnedNFTs.errorOneOfOne = true;
  } else {
    allOwnedNFTs.errorOneOfOne = false;
  }

  // const { contract: contract_TEDDY } = useContract(TEDDY_CONTRACT);
  // const {
  //   data: teddyNFTs,
  //   error: errorTeddy,
  //   isLoading: isLoadingTeddy,
  // } = useOwnedNFTs(contract_TEDDY, address);
  // console.log(teddyNFTs);
  // console.log(errorTeddy);
  // console.log(isLoadingTeddy);

  // allOwnedNFTs.isLoadingTeddy = isLoadingTeddy;

  // // const { contract: contract_STAKING } = useContract(STAKING_CONTRACT);
  // const [stakedTokenIDs, setStakedTokenIDs] = useState<any>([]);

  // const stakedTeddy = LoadStakedTeddy(stakedTokenIDs[0]);
  // if(stakedTeddy){
  //   console.log(stakedTeddy);
  //   teddyNFTs?.push(stakedTeddy!);  
  // }
   

  // const stakedTeddys: NFT[] = useMemo(() => {
  //   const stakedTeddysTmp: NFT[] = [];
  //   try {
  //     if(typeof stakedTokenIDs == 'undefined' || typeof teddyNFTs == 'undefined'){
  //       console.log('stakedTokenIDs or teddyNFTs are undefined');
  //     } else {
  //       console.log(stakedTokenIDs);
  //       stakedTokenIDs.forEach((tokenID: string) => {
  //         console.log(tokenID);
  //         const stakedTeddy = LoadStakedTeddy(parseInt(tokenID));
  //         console.log(stakedTeddy);
  //         // stakedTeddys?.push(stakedTeddy!);
  //         if(stakedTeddy){
  //           stakedTeddysTmp.push(stakedTeddy!);  
  //         } 
  //       });
  //     }
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  //   return stakedTeddysTmp;
  // }, [stakedTokenIDs, teddyNFTs]);
  // console.log(stakedTeddys);

  // const {
  //   data: aiNFTs,
  //   error: errorAI,
  //   isLoading: isLoadingAI,
  // } = useOwnedNFTs(contract_AI, address);
  // console.log(aiNFTs);
  // console.log(errorAI);
  // console.log(isLoadingAI);

 // allOwnedNFTs.isLoadingAI = isLoadingAI;

  const nftArray: tokens = useMemo(() => {
    if (address) {
      const returnNFTs: NFT[] = [];
      // tedNFTs?.forEach((token) => {
      //   console.log(token);
      //   returnNFTs?.push(token);
      // });
      // teddyNFTs?.forEach((token) => {
      //   console.log(token);
      //   returnNFTs?.push(token);
      // });
      // stakedTeddys?.forEach((token) => {
      //   console.log(token);
      //   returnNFTs?.push(token);
      // });
      // aiNFTs?.forEach((token) => {
      //   console.log(token);
      //   returnNFTs?.push(token);
      // });

      oneOfOneNFTs?.forEach((token) => {
        console.log(token);
        returnNFTs?.push(token);
      });

      birthCertsNFTs?.forEach((token) => {
        console.log(token);
        returnNFTs?.push(token);
      });
    
      return {
        OneofOnes: {
          address: address!,
          tokens: oneOfOneNFTs!,
        },
        BirthCertificates: {
          address: address!,
          tokens: birthCertsNFTs!,
        },
        AllTokens: {
          address: address!,
          tokens: returnNFTs!,
        },
      };
    } else {
      return initialState.tokens;
    }
  }, [address, oneOfOneNFTs, birthCertsNFTs]);

  const LoadContractBirthCerts = useCallback(async () => {
    try {
      const contractIn = await sdk?.getContractFromAbi(
        BIRTH_CERTIFICATE_CONTRACT,
        birthCertsABI
      );
      console.log(contractIn);
      setContractBirthCerts(contractIn);
    } catch (e) {
      console.log(e);
    }
  }, [sdk]);

  const LoadContractOneOfOne = useCallback(async () => {
    try {
      const contractIn = await sdk?.getContractFromAbi(
        ONE_OF_ONE_CONTRACT,
        oneOfOneABI
      );
      console.log(contractIn);
      setContractOneOfOne(contractIn);
    } catch (e) {
      console.log(e);
    }
  }, [sdk]);

  const LoadContractRewards = useCallback(async () => {
    try {
      const contractIn = await sdk?.getContractFromAbi(REWARD_TOKEN, honeyABI);
      setContractRewards(contractIn);
    } catch (e) {
      console.log(e);
    }
  }, [sdk]);

  useEffect(() => {
    try {
      if (!contract_REWARDS) {
        LoadContractRewards();
      }
      if (!contract_BIRTHCERTS) {
        LoadContractBirthCerts();
      }
      if (!contract_OneOfOne) {
        LoadContractOneOfOne();
      }
    } catch (e) {
      console.log(e);
      console.log("Error!");
    }
  }, [sdk, address, contract_REWARDS, contract_BIRTHCERTS, contract_OneOfOne, LoadContractRewards, LoadContractBirthCerts, LoadContractOneOfOne]);
  
  allOwnedNFTs.tokens = nftArray;

  const [hasWalletClaimedETHHoney, setHasWalletClaimedETHHoney] = useState<boolean>(true);

  const checkEthHoneyBridge = useMemo(async () => {
    try {
      const requestJSON: IDictionary = {
        "wallet": address!
      };
      const json = JSON.stringify(requestJSON, null, 2);
      console.log(json);
      const response = await fetch(`https://h7ke8qc4ng.execute-api.us-east-1.amazonaws.com/Prod/hasWalletClaimedETHHoney`, {
        method: 'POST',
        body: json,
      });
      console.log(response);
      if(response.status !== 200){
        console.log("error");
        setHasWalletClaimedETHHoney(true);
      }
      const data = await response.text();
      console.log(data);
      if(data === "True"){
        setHasWalletClaimedETHHoney(true);
      } else {
        setHasWalletClaimedETHHoney(false);
      }
    } catch (e) {
      console.log(e);
      console.log("Error!");
      setHasWalletClaimedETHHoney(true);
    }
  }, [address]);

  useEffect(() => {
    if(address){
      const temp = checkEthHoneyBridge;
    }
  }, [address, checkEthHoneyBridge]);

  allOwnedNFTs.hasWalletClaimedETHHoney = hasWalletClaimedETHHoney;

  return allOwnedNFTs;
}


