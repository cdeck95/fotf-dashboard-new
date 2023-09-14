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
import { IDictionary } from "../views/HoneyExchange";


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
  unclaimedHoneyBalance: string,
  pendingHoneyAirdrop: boolean;
  loadingUnclaimedHoneyBalance: boolean;
  isLoadingContractTeds: boolean;
  isLoadingNumberOfTedsOwned: boolean;
  // honeyBalance: string;
}

export const initialState: allOwnedNFTs = {
  isLoadingBirthCerts: false,
  isLoadingOneOfOne: false,
  errorBirthCerts: false,
  errorOneOfOne: false,
  hasWalletClaimedETHHoney: true,
  unclaimedHoneyBalance: "0",
  pendingHoneyAirdrop: false,
  loadingUnclaimedHoneyBalance: true,
  isLoadingContractTeds: true,
  isLoadingNumberOfTedsOwned: true,
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

const FOTF_CONTRACT = "0x06bdc702fb8af5af8067534546e0c54ea4243ea9";
// const TEDDY_CONTRACT = "0x4aB1337970E889Cf5E425A7267c51db183028cf4";
const TED_REWARDS = "0x62C7fD0D2eD0d01165C05086Ce62e5E1001c439c";
const STAKING_CONTRACT = "0x15829C851C3117f662C5A9E369bC3A4dBbeaFEBF";
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

  const [contract_REWARDS, setContractRewards] =
    useState<SmartContract<BaseContract>>();
  const [contract_BIRTHCERTS, setContractBirthCerts] =
    useState<SmartContract<BaseContract>>();
  const [contract_OneOfOne, setContractOneOfOne] =
    useState<SmartContract<BaseContract>>();

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

  const { contract: contract_Teds, isLoading: isLoadingTedsContract, error: isErrorTedsContract } = useContract(FOTF_CONTRACT);
  console.log(contract_Teds);
  console.log(isLoadingTedsContract);
  console.log(isErrorTedsContract);

  allOwnedNFTs.isLoadingContractTeds = isLoadingTedsContract;


  const { contract: contract_TedRewards, isLoading: isLoadingTedRewards, error: isErrorTedRewards } = useContract(TED_REWARDS);
  console.log(contract_TedRewards);
  console.log(isLoadingTedRewards);
  console.log(isErrorTedRewards);

  const { contract: contract_TeddyStaking, isLoading: isLoadingTeddyStaking, error: isErrorTeddyStaking} = useContract(STAKING_CONTRACT);
  console.log(contract_TeddyStaking);
  console.log(isLoadingTeddyStaking);
  console.log(isErrorTeddyStaking);


  const nftArray: tokens = useMemo(() => {
    if (address) {
      const returnNFTs: NFT[] = [];

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
  const [pendingHoneyAirdrop, setPendingHoneyAidrop] = useState<boolean>(false);

  const checkEthHoneyBridge = useMemo(async () => {
    if (address) {
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
        if(data === "True" || data === "Pending"){
          setHasWalletClaimedETHHoney(true);
        } else {
          setHasWalletClaimedETHHoney(false);
        }
        if(data === "Pending"){
          setPendingHoneyAidrop(true);
        } else {
          setPendingHoneyAidrop(false);
        }
      } catch (e) {
        console.log(e);
        console.log("Error!");
        setHasWalletClaimedETHHoney(true);
      }
    }
  }, [address]);

  allOwnedNFTs.pendingHoneyAirdrop = pendingHoneyAirdrop;

  // useEffect(() => {
  //   if(address){
  //     const temp = checkEthHoneyBridge;
  //   }
  // }, [address, checkEthHoneyBridge]);

  allOwnedNFTs.hasWalletClaimedETHHoney = hasWalletClaimedETHHoney;

  const [numberOfTedsOwned, setNumberOfTedsOwned] = useState<number>(0);
  const [isLoadingNumberOfTedsOwned, setIsLoadingNumberOfTedsOwned] = useState<boolean>(true);

  const checkNumberOfTedsOwned = useMemo(async () => {
    setIsLoadingNumberOfTedsOwned(true);
    try {
      if(contract_Teds && address){
        const numberOfTeds = await contract_Teds.call("balanceOf", [address!]);
        console.log(numberOfTeds);
        setNumberOfTedsOwned(numberOfTeds);
        setIsLoadingNumberOfTedsOwned(false);
      }
    } catch (e) {
      console.log(e);
      console.log("Error!");
      setIsLoadingNumberOfTedsOwned(false);
    }
  }, [address, contract_Teds]);

  allOwnedNFTs.isLoadingNumberOfTedsOwned = isLoadingNumberOfTedsOwned;

  const [unclaimedHoneyBalance, setUnclaimedHoneyBalance] = useState<string>("0");
  const [loadingUnclaimedHoneyBalance, setLoadingUnclaimedHoneyBalance] = useState<boolean>(false);

  const checkEthHoneyBalance = useMemo(async () => {
    setLoadingUnclaimedHoneyBalance(true);
    if(contract_TedRewards && contract_TeddyStaking && address){
      var totalUnClaimedHoney = 0;
      const tedRewardsPerDay = 50;
      // const numberOfTedsOwned = 2;
      const startDate = new Date("2023-04-06T00:00:00-04:00");
      const startDateString = startDate.toLocaleString("en-US", { timeZone: "America/New_York" });
      console.log(startDateString); // "4/6/2023, 12:00:00 AM"
      const today = new Date();
      const timeDiff = today.getTime() - startDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      console.log(daysDiff); // number of whole days between start date and today

      //Load Teddy Rewards
      const availableRewards = ethers.utils.formatEther(await contract_TeddyStaking!.call("availableRewards", [address!]));
      const availableRewardsInt = Math.round(parseInt(availableRewards));
      console.log(availableRewardsInt);
      console.log(availableRewardsInt.toString());

      //Load Ted Rewards
      const availableRewardsTed = tedRewardsPerDay * numberOfTedsOwned * daysDiff;
      // const availableRewardsIntTed = Math.round(parseInt(availableRewardsTed));
      console.log(availableRewardsTed);
      console.log(availableRewardsTed.toString());

      //add to total
      totalUnClaimedHoney+=availableRewardsInt;
      totalUnClaimedHoney+=availableRewardsTed;

      console.log(totalUnClaimedHoney.toString());

      setUnclaimedHoneyBalance(totalUnClaimedHoney.toString());
      setLoadingUnclaimedHoneyBalance(false);
    }
  }, [address, contract_TedRewards, contract_TeddyStaking, numberOfTedsOwned]);

  allOwnedNFTs.loadingUnclaimedHoneyBalance = loadingUnclaimedHoneyBalance;

  // useEffect(() => {
  //   if(contract_TedRewards && contract_TeddyStaking){
  //     const temp = checkEthHoneyBalance;
  //   }
  // }, [address, checkEthHoneyBalance, contract_TedRewards, contract_TeddyStaking]);

  allOwnedNFTs.unclaimedHoneyBalance = unclaimedHoneyBalance;

  return allOwnedNFTs;
}


