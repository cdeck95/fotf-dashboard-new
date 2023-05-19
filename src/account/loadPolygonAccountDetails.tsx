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
  
  
  export interface tokens {
    Teds?: {
      address: string;
      tokens: NFT[];
    };
    Teddies?: {
      address: string;
      tokens: NFT[];
    };
    AITeds?: {
      address: string;
      tokens: NFT[];
    };
  }
  
  export interface PolygonAccountDetails {
    tokens: tokens;
    isLoadingTed: boolean,
    isLoadingTeddy: boolean,
    isLoadingAI: boolean,
    errorTed: any;
    errorTeddy: any;
    errorAI: any;
    maticBalance: string;
    needsFunds: boolean;
    CanIBridgeTedsFlag: boolean;
    CanIBridgeTedsAmount: BigNumber;
    CanIBridgeTeds?: Function;
    CanIBridgeTeddiesFlag: boolean;
    CanIBridgeTeddiesAmount: BigNumber;
    CanIBridgeTeddies?: Function;
    CanIBridgeAITedsFlag: boolean;
    CanIBridgeAITedsAmount: BigNumber;
    CanIBridgeAITeds?: Function;
    hasBridgedTeds: boolean;
    hasBridgedTeddies: boolean;
    hasBridgedAITeds: boolean;
    setNeedsFunds?: React.Dispatch<React.SetStateAction<boolean>>;
    // testbridgeTeds?: Function;
    bridgeTeds?: Function;
    bridgeTeddies?: Function;
    bridgeAITeds?: Function;
  }
  
  export const initialState: PolygonAccountDetails = {
    isLoadingTed: false,
    isLoadingTeddy: false,
    isLoadingAI: false,
    errorTed: false,
    errorTeddy: false,
    errorAI: false,
    maticBalance: "0",
    needsFunds: false,
    CanIBridgeTedsFlag: false,
    CanIBridgeTedsAmount: BigNumber.from(0),
    CanIBridgeTeddiesFlag: false,
    CanIBridgeTeddiesAmount: BigNumber.from(0),
    CanIBridgeAITedsFlag: false,
    CanIBridgeAITedsAmount: BigNumber.from(0),
    hasBridgedTeds: false,
    hasBridgedTeddies: false,
    hasBridgedAITeds: false,
    tokens: {
      Teds: {
        address: "",
        tokens: [],
      },
      Teddies: {
        address: "",
        tokens: [],
      },
      AITeds: {
        address: "",
        tokens: [],
      },
    },
  };
  
  const TED_POLYGON_CONTRACT = "0x047Be3F987854136eC872932c24a26Dcd0fD3a42";
  const TEDDIES_POLYGON_CONTRACT = "0x747cC82CDDF9fE91ae69C2f723844d8E31D31e26";
  const AITEDS_POLYGON_CONTRACT = "0xDAA7Ba5cFd5f3A46E8180F19B5c930130e156723";
  /////
  
  
  const TED_TEST_CONTRACT = "0xe33149c3002e23d06871aa338ba3E9Dea759270B";
  
  /////////////// Load All NFTs ///////////////////////
  
  export function LoadPolygonAccountDetails(): PolygonAccountDetails {
    const allOwnedNFTs: PolygonAccountDetails = initialState;
    
    const sdk = useSDK();
    const provider = sdk?.getProvider();
    const address = useAddress();

    const {contract: tedPolygonContract } = useContract(TED_POLYGON_CONTRACT);
    console.log(tedPolygonContract);

    const {contract: TEST_tedPolygonContract } = useContract(TED_TEST_CONTRACT);
    console.log(TEST_tedPolygonContract);

    const {contract:  teddiesPolygonContract } = useContract(TEDDIES_POLYGON_CONTRACT);
    console.log(teddiesPolygonContract);

    const {contract:  aiTedsPolygonContract } = useContract(AITEDS_POLYGON_CONTRACT);
    console.log(aiTedsPolygonContract);

    /////////////// Load Polygon Teds ///////////////////////
    const { data: tedNFTs, isLoading: isLoadingTed, error: errorTed } = useOwnedNFTs(tedPolygonContract, address);
    console.log(tedNFTs);
    console.log(isLoadingTed);
    console.log(errorTed);
    allOwnedNFTs.tokens.Teds!.address = useAddress()!;
    allOwnedNFTs.tokens.Teds!.tokens = tedNFTs!;
    allOwnedNFTs.isLoadingTed = isLoadingTed;
    allOwnedNFTs.errorTed = errorTed;

    /////////////// Load Polygon Teddies ///////////////////////

    const { data: teddyNFTs, isLoading: isLoadingTeddy, error: errorTeddy } = useOwnedNFTs(teddiesPolygonContract, address);
    console.log(teddyNFTs);
    console.log(isLoadingTeddy);
    console.log(errorTeddy);
    allOwnedNFTs.tokens.Teddies!.address = useAddress()!;
    allOwnedNFTs.tokens.Teddies!.tokens = teddyNFTs!;
    allOwnedNFTs.isLoadingTeddy = isLoadingTeddy;
    allOwnedNFTs.errorTeddy = errorTeddy;

    /////////////// Load Polygon AI Teds ///////////////////////

    const { data: aiTedNFTs, isLoading: isLoadingAI, error: errorAI } = useOwnedNFTs(aiTedsPolygonContract, address);
    console.log(aiTedNFTs);
    console.log(isLoadingAI);
    console.log(errorAI);
    allOwnedNFTs.tokens.AITeds!.address = useAddress()!;
    allOwnedNFTs.tokens.AITeds!.tokens = aiTedNFTs!;
    allOwnedNFTs.isLoadingAI = isLoadingAI;
    allOwnedNFTs.errorAI = errorAI;
    
    const [maticBalance, setMaticBalance] = useState<string>();
    const [needsFunds, setNeedsFunds] = useState<boolean>(false);

    const LoadMaticBalance = useMemo(async () => {
        try {
          // const polygonSDK = new ThirdwebSDK("polygon");
          // const maticBalance = await polygonSDK?.wallet.balance("0x0000000000000000000000000000000000001010");
          const maticBalanceRaw = await sdk?.getBalance(address!);
          console.log(`Matic: ${maticBalanceRaw?.displayValue}`);
          if(maticBalanceRaw){
            const maticBalanceString = parseFloat(ethers.utils.formatEther(maticBalanceRaw!.value)).toFixed(3);
            if(maticBalanceString === maticBalance){
              console.log("matic balance hasnt changed");
              return;
            } else {
              setMaticBalance(maticBalanceString);
              if(parseInt(maticBalanceString) < 5){
                setNeedsFunds(true);
              } else {
                setNeedsFunds(false);
              }
            }
          } else {
            setMaticBalance("0.000");
            setNeedsFunds(true);
          }
        } catch (e) {
          console.log(e);
        }
      }, [sdk, address, maticBalance]);
  
    allOwnedNFTs.maticBalance = maticBalance!;
    allOwnedNFTs.needsFunds = needsFunds;
    allOwnedNFTs.setNeedsFunds = setNeedsFunds;

    async function bridgeTeds (){
        try {
            const bridgeResults = await tedPolygonContract?.call(
              "fotfbridge"
            );
            console.log(bridgeResults);
            return bridgeResults;
          } catch (e) {
            console.log(e);
            return null;
          }
    }

  //   async function testbridgeTeds (){
  //     try {
  //         const bridgeResults = await TEST_tedPolygonContract?.call(
  //           "fotfbridge"
  //         );
  //         console.log(bridgeResults);
  //         return bridgeResults;
  //       } catch (e) {
  //         console.log(e);
  //         return null;
  //       }
  // }

    async function bridgeTeddies (){
        try {
            const bridgeResults = await teddiesPolygonContract?.call(
              "teddybridge"
            );
            console.log(bridgeResults);
            return bridgeResults;
          } catch (e) {
            console.log(e);
            return null;
          }
    }

    async function bridgeAITeds (){
        try {
            const bridgeResults = await aiTedsPolygonContract?.call(
              "aibridge"
            );
            console.log(bridgeResults);
            return bridgeResults;
          } catch (e) {
            console.log(e);
            return null;
          }
    }
    // allOwnedNFTs.testbridgeTeds = testbridgeTeds;
    allOwnedNFTs.bridgeTeds = bridgeTeds;
    allOwnedNFTs.bridgeTeddies = bridgeTeddies;
    allOwnedNFTs.bridgeAITeds = bridgeAITeds;

    const CanIBridgeTeds = useCallback(async () => {
        try {
          const canIBridge = await tedPolygonContract?.call(
            "canibridge", // Name of your function as it is on the smart contract
            // Arguments to your function, in the same order they are on your smart contract
            [address]
          );
          console.log(canIBridge);
          allOwnedNFTs.CanIBridgeTedsFlag = canIBridge[0];
          allOwnedNFTs.CanIBridgeTedsAmount = canIBridge[1];
        } catch (e) {
          console.log(e);
        }
      }, [address, allOwnedNFTs, tedPolygonContract]);
      
      const CanIBridgeTeddies = useCallback(async () => {
        try {
          const canIBridge = await teddiesPolygonContract?.call(
            "canibridge", // Name of your function as it is on the smart contract
            // Arguments to your function, in the same order they are on your smart contract
            [address]
          );
          console.log(canIBridge);
          allOwnedNFTs.CanIBridgeTeddiesFlag = canIBridge[0];
          allOwnedNFTs.CanIBridgeTeddiesAmount = canIBridge[1];
        } catch (e) {
          console.log(e);
        }
      }, [address, allOwnedNFTs, teddiesPolygonContract]);

      const CanIBridgeAITeds = useCallback(async () => {
        try {
          const canIBridge = await aiTedsPolygonContract?.call(
            "canibridge", // Name of your function as it is on the smart contract
            // Arguments to your function, in the same order they are on your smart contract
            [address]
          );
          console.log(canIBridge);
          allOwnedNFTs.CanIBridgeAITedsFlag = canIBridge[0];
          allOwnedNFTs.CanIBridgeAITedsAmount = canIBridge[1];
        } catch (e) {
          console.log(e);
        }
      }, [address, aiTedsPolygonContract, allOwnedNFTs]);     

      allOwnedNFTs.CanIBridgeTeds = CanIBridgeTeds;
      allOwnedNFTs.CanIBridgeTeddies = CanIBridgeTeddies;
      allOwnedNFTs.CanIBridgeAITeds = CanIBridgeAITeds;
      
    return allOwnedNFTs;
  }
  