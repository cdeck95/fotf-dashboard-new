import {
    useSDK,
    useAddress,
    useOwnedNFTs,
    useContract,
    useNFT,
  } from "@thirdweb-dev/react";
  import { NFT, SmartContract } from "@thirdweb-dev/sdk";
  import { BaseContract, BigNumber, BigNumberish, ethers } from "ethers";

  
const FOTF_CONTRACT = "0x06bdc702fb8af5af8067534546e0c54ea4243ea9";
const TEDDY_CONTRACT = "0x4aB1337970E889Cf5E425A7267c51db183028cf4";
const STAKING_CONTRACT = "0x15829C851C3117f662C5A9E369bC3A4dBbeaFEBF";
const REWARD_TOKEN = "0x6ca0269dca415313256cfecD818F32c5AfF0A518";
const AI_MINT = "0x1C6d280280f7f8d139659E314d738bdD466741Ba";
const BIRTH_CERTIFICATE_CONTRACT = "0xFC182BB64a3283f880861E065463356de92FBEcb";
const ONE_OF_ONE_CONTRACT = "0x76b9D178fc4AdDaC0A2B6366d4DD44b4F900C168";
  
export function LoadStakedTeddy(tokenID: number): NFT {
    const sdk = useSDK();
    const provider = sdk?.getProvider();
    const address = useAddress();
    if(typeof tokenID == 'undefined'){
      tokenID = -10;
    }

    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
    const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
    const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");
    // tokenID = 917;
    const { contract: contract_TEDDY } = useContract(TEDDY_CONTRACT);    
    console.log(contract_TEDDY);
    // const { contract: contract_TEDDY } = useContract(STAKING_CONTRACT);

    console.log(tokenID);
    const { data: stakedTeddy, isLoading, error } = useNFT(contract_TEDDY, tokenID);
    console.log(stakedTeddy);
    console.log(isLoading);
    console.log(error);
    if (error) {
        console.log(error);
    }
    
    return stakedTeddy!;
}