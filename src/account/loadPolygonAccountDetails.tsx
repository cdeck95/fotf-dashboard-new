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
import { get } from "http";

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
  isLoadingTedContract: boolean;
  isLoadingTeddyContract: boolean;
  isLoadingAITedContract: boolean;
  isLoadingHoneyContract: boolean;
  isLoadingHoneyExchangeContract: boolean;
  tedContract: SmartContract<BaseContract> | undefined;
  teddyContract: SmartContract<BaseContract> | undefined;
  aiTedContract: SmartContract<BaseContract> | undefined;
  honeyContract: SmartContract<BaseContract> | undefined;
  honeyExchangeContract: SmartContract<BaseContract> | undefined;
  isLoadingTed: boolean;
  isLoadingTeddy: boolean;
  isLoadingAI: boolean;
  isLoadingHoney: boolean;
  isLoadingHoneyExchange: boolean;
  errorTed: any;
  errorTeddy: any;
  errorAI: any;
  errorHoney: any;
  maticBalance: string;
  honeyBalance: string;
  needsFunds: boolean;
  exchangeRate: BigNumber;
  honeyJarPrice: BigNumber;
  honeyPotPrice: BigNumber;
  honeyStashPrice: BigNumber;
  buyHoneyJar?: Function;
  buyHoneyPot?: Function;
  buyHoneyStash?: Function;
  buyHnyWithMATIC?: Function;
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
  testbridgeTeds?: Function;
  testbridgeTeddies?: Function;
  testbridgeAITeds?: Function;
  bridgeTeds?: Function;
  bridgeTeddies?: Function;
  bridgeAITeds?: Function;
}

export const initialState: PolygonAccountDetails = {
  isLoadingTedContract: false,
  isLoadingTeddyContract: false,
  isLoadingAITedContract: false,
  tedContract: undefined,
  teddyContract: undefined,
  aiTedContract: undefined,
  honeyContract: undefined,
  honeyExchangeContract: undefined,
  isLoadingHoneyContract: false,
  isLoadingHoneyExchangeContract: false,
  isLoadingTed: false,
  isLoadingTeddy: false,
  isLoadingAI: false,
  isLoadingHoney: false,
  isLoadingHoneyExchange: false,
  errorTed: false,
  errorTeddy: false,
  errorAI: false,
  errorHoney: false,
  maticBalance: "0",
  needsFunds: false,
  honeyBalance: "0",
  exchangeRate: BigNumber.from(-10),
  honeyJarPrice: BigNumber.from(-10),
  honeyPotPrice: BigNumber.from(-10),
  honeyStashPrice: BigNumber.from(-10),
  buyHoneyJar: undefined,
  buyHoneyPot: undefined,
  buyHoneyStash: undefined,
  buyHnyWithMATIC: undefined,
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

export const TED_POLYGON_CONTRACT =
  "0x047Be3F987854136eC872932c24a26Dcd0fD3a42";
export const TEDDIES_POLYGON_CONTRACT =
  "0x747cC82CDDF9fE91ae69C2f723844d8E31D31e26";
export const AITEDS_POLYGON_CONTRACT =
  "0xDAA7Ba5cFd5f3A46E8180F19B5c930130e156723";
export const HONEY_CONTRACT = "0xd8495F616fDCD9710b76c19Ab81cCf98f12c5A2B";
export const HONEY_EXCHANGE_CONTRACT =
  "0x2ddd30D6CBE87565538873440811f2EcA5E4d1A2";
/////

const TED_TEST_CONTRACT = "0xe33149c3002e23d06871aa338ba3E9Dea759270B";
const TEDDY_TEST_CONTRACT = "0x3EF08292226c54110d1166274E35680Ce6a2BD99";
const AI_TED_TEST_CONTRACT = "0x03b304E0db3e85a971A641F8559b9b4C0734C10a";

/////////////// Load All NFTs ///////////////////////

export function LoadPolygonAccountDetails(): PolygonAccountDetails {
  const allOwnedNFTs: PolygonAccountDetails = initialState;

  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();
  const [honey, setHoney] = useState<string>();

  const { contract: honeyPolygonContract, isLoading: isLoadingHoneyContract } =
    useContract(HONEY_CONTRACT);
  console.log(honeyPolygonContract);

  allOwnedNFTs.isLoadingHoneyContract = isLoadingHoneyContract;
  allOwnedNFTs.honeyContract = honeyPolygonContract;

  const LoadHoney = useCallback(async () => {
    try {
      const data: BigNumber = await honeyPolygonContract?.call(
        "balanceOf", // Name of your function as it is on the smart contract
        // Arguments to your function, in the same order they are on your smart contract
        [address]
      );
      const honeyTMP = parseFloat(ethers.utils.formatEther(data)).toFixed(3);
      setHoney(honeyTMP.toString());
    } catch (e) {
      console.log(e);
    }
  }, [address, honeyPolygonContract]);

  useEffect(() => {
    if (honeyPolygonContract) {
      LoadHoney();
    }
  }, [LoadHoney, honeyPolygonContract]);

  if (honey) {
    allOwnedNFTs.honeyBalance = honey;
  }

  const { contract: tedPolygonContract, isLoading: isLoadingTedContract } =
    useContract(TED_POLYGON_CONTRACT);
  console.log(tedPolygonContract);

  allOwnedNFTs.isLoadingTedContract = isLoadingTedContract;
  allOwnedNFTs.tedContract = tedPolygonContract;

  const {
    contract: teddiesPolygonContract,
    isLoading: isLoadingTeddyContract,
  } = useContract(TEDDIES_POLYGON_CONTRACT);
  console.log(teddiesPolygonContract);

  allOwnedNFTs.isLoadingTeddyContract = isLoadingTeddyContract;
  allOwnedNFTs.teddyContract = teddiesPolygonContract;

  const { contract: aiTedsPolygonContract, isLoading: isLoadingAITedContract } =
    useContract(AITEDS_POLYGON_CONTRACT);
  console.log(aiTedsPolygonContract);

  allOwnedNFTs.isLoadingAITedContract = isLoadingAITedContract;
  allOwnedNFTs.aiTedContract = aiTedsPolygonContract;

  //////////////////////// TEST //////////////////////////
  const { contract: TEST_tedPolygonContract } = useContract(TED_TEST_CONTRACT);
  console.log(TEST_tedPolygonContract);

  const { contract: TEST_teddyPolygonContract } =
    useContract(TEDDY_TEST_CONTRACT);
  console.log(TEST_teddyPolygonContract);

  const { contract: TEST_aiTedPolygonContract } =
    useContract(AI_TED_TEST_CONTRACT);
  console.log(TEST_aiTedPolygonContract);

  /////////////// Load Polygon Teds ///////////////////////
  const {
    data: tedNFTs,
    isLoading: isLoadingTed,
    error: errorTed,
  } = useOwnedNFTs(tedPolygonContract, address);
  console.log(tedNFTs);
  console.log(isLoadingTed);
  console.log(errorTed);
  allOwnedNFTs.tokens.Teds!.address = useAddress()!;
  allOwnedNFTs.tokens.Teds!.tokens = tedNFTs!;
  allOwnedNFTs.isLoadingTed = isLoadingTed;
  allOwnedNFTs.errorTed = errorTed;

  // tedNFTs?.forEach(async (nft) => {
  //   const response = await fetch(`https://api.opensea.io/api/v1/asset/0x047Be3F987854136eC872932c24a26Dcd0fD3a42/${nft.metadata.id}/?force_update=true`, {
  //     method: 'GET'
  //     });
  //     console.log(response.status);
  //     console.log(response.statusText);
  //     console.log(response.body);
  //  });

  /////////////// Load Polygon Teddies ///////////////////////

  const {
    data: teddyNFTs,
    isLoading: isLoadingTeddy,
    error: errorTeddy,
  } = useOwnedNFTs(teddiesPolygonContract, address);
  console.log(teddyNFTs);
  console.log(isLoadingTeddy);
  console.log(errorTeddy);
  allOwnedNFTs.tokens.Teddies!.address = useAddress()!;
  allOwnedNFTs.tokens.Teddies!.tokens = teddyNFTs!;
  allOwnedNFTs.isLoadingTeddy = isLoadingTeddy;
  allOwnedNFTs.errorTeddy = errorTeddy;

  // teddyNFTs?.forEach(async (nft) => {
  //   const response = await fetch(`https://api.opensea.io/api/v1/asset/0x747cC82CDDF9fE91ae69C2f723844d8E31D31e26/${nft.metadata.id}/?force_update=true`, {
  //     method: 'GET'
  //     });
  //     console.log(response.status);
  //     console.log(response.statusText);
  //     console.log(response.body);
  //  });

  /////////////// Load Polygon AI Teds ///////////////////////

  const {
    data: aiTedNFTs,
    isLoading: isLoadingAI,
    error: errorAI,
  } = useOwnedNFTs(aiTedsPolygonContract, address);
  console.log(aiTedNFTs);
  console.log(isLoadingAI);
  console.log(errorAI);
  allOwnedNFTs.tokens.AITeds!.address = useAddress()!;
  allOwnedNFTs.tokens.AITeds!.tokens = aiTedNFTs!;
  allOwnedNFTs.isLoadingAI = isLoadingAI;
  allOwnedNFTs.errorAI = errorAI;

  // aiTedNFTs?.forEach(async (nft) => {
  //   const response = await fetch(`https://api.opensea.io/api/v1/asset/0xdaa7ba5cfd5f3a46e8180f19b5c930130e156723/${nft.metadata.id}/?force_update=true`, {
  //     method: 'GET'
  //     });
  //     console.log(response.status);
  //     console.log(response.statusText);
  //     console.log(response.body);
  //  });

  /////////////// Load Polygon MATIC Balance ///////////////////////

  const [maticBalance, setMaticBalance] = useState<string>();
  const [needsFunds, setNeedsFunds] = useState<boolean>(false);

  const LoadMaticBalance = useMemo(async () => {
    try {
      // const polygonSDK = new ThirdwebSDK("polygon");
      // const maticBalance = await polygonSDK?.wallet.balance("0x0000000000000000000000000000000000001010");
      if(address) {
        const maticBalanceRaw = await sdk?.getBalance(address!);
        console.log(`Matic: ${maticBalanceRaw?.displayValue}`);
        if (maticBalanceRaw) {
          const maticBalanceString = parseFloat(
            ethers.utils.formatEther(maticBalanceRaw!.value)
          ).toFixed(3);
          if (maticBalanceString === maticBalance) {
            console.log("matic balance hasnt changed");
            return;
          } else {
            setMaticBalance(maticBalanceString);
            if (parseInt(maticBalanceString) < 5) {
              setNeedsFunds(true);
            } else {
              setNeedsFunds(false);
            }
          }
        } else {
          setMaticBalance("0.000");
          setNeedsFunds(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [sdk, address, maticBalance]);

  allOwnedNFTs.maticBalance = maticBalance!;
  allOwnedNFTs.needsFunds = needsFunds;
  allOwnedNFTs.setNeedsFunds = setNeedsFunds;

  /////////////// Load Honey Exchange ///////////////////////

  const {
    contract: honeyExchangeContract,
    isLoading: isLoadingHoneyExchangeContract,
  } = useContract(HONEY_EXCHANGE_CONTRACT);
  console.log(honeyExchangeContract);
  console.log(isLoadingHoneyExchangeContract);

  allOwnedNFTs.honeyExchangeContract = honeyExchangeContract;
  allOwnedNFTs.isLoadingHoneyExchangeContract = isLoadingHoneyExchangeContract;

  /////////////// Load Honey Exchange Functions ///////////////////////

  const [exchangeRate, setExchangeRate] = useState<BigNumber>(BigNumber.from(-10));
  const [honeyJarPrice, setHoneyJarPrice] = useState<BigNumber>(BigNumber.from(-10));
  const [honeyPotPrice, setHoneyPotPrice] = useState<BigNumber>(BigNumber.from(-10));
  const [honeyStashPrice, setHoneyStashPrice] = useState<BigNumber>(BigNumber.from(-10));


  // const getExchangeRate = async () => {
  //   try {
  //     const exchangeRate = await honeyExchangeContract?.call("exchangeRate");
  //     console.log(exchangeRate);
  //     setExchangeRate(BigNumber.from(exchangeRate));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // const getHoneyJarPrice = async () => {
  //   try {
  //     const honeyJarPrice = await honeyExchangeContract?.call("honeyJarPrice");
  //     console.log(honeyJarPrice);
  //     setHoneyJarPrice(BigNumber.from(honeyJarPrice));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // const getHoneyPotPrice = async () => {
  //   try {
  //     const honeyPotPrice = await honeyExchangeContract?.call("honeyPotPrice");
  //     console.log(honeyPotPrice);
  //     setHoneyPotPrice(BigNumber.from(honeyPotPrice));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // const getHoneyStashPrice = async () => {
  //   try {
  //     const honeyStashPrice = await honeyExchangeContract?.call(
  //       "honeyStashPrice"
  //     );
  //     console.log(honeyStashPrice);
  //     setHoneyStashPrice(BigNumber.from(honeyStashPrice));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async function buyHoneyJar() {
    try {
      const buyHoneyJarResults = await honeyExchangeContract?.call(
        "buyHoneyJar",
        [],
        {
          value: honeyJarPrice,
        }
      );
      console.log(buyHoneyJarResults);
      return buyHoneyJarResults;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      if (e.message.includes("Reason: user rejected transaction")) {
        return "User denied transaction signature.";
      } else {
        alert("Something went wrong, please try again");
        return e.message;
      }
    }
  }

  async function buyHoneyPot() {
    try {
      const buyHoneyPotResults = await honeyExchangeContract?.call(
        "buyHoneyPot",
        [],
        {
          value: honeyPotPrice,
        }
      );
      console.log(buyHoneyPotResults);
      return buyHoneyPotResults;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      if (e.message.includes("Reason: user rejected transaction")) {
        return "User denied transaction signature.";
      } 
      else if (e.message.includes("Reason: You have insufficient funds in your account to execute this transaction.")) {
        alert("You have insufficient funds in your account to execute this transaction.")
        return "You have insufficient funds in your account to execute this transaction.";
      }
      else {
        alert("Something went wrong, please try again");
        return e.message;
      }
    }
  }

  async function buyHoneyStash() {
    try {
      const buyHoneyStashResults = await honeyExchangeContract?.call(
        "buyHoneyStash",
        [],
        {
          value: honeyStashPrice,
        }
      );
      console.log(buyHoneyStashResults);
      return buyHoneyStashResults;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      if (e.message.includes("Reason: user rejected transaction")) {
        return "User denied transaction signature.";
      } 
      else if (e.message.includes("Reason: You have insufficient funds in your account to execute this transaction.")) {
        alert("You have insufficient funds in your account to execute this transaction.")
        return "You have insufficient funds in your account to execute this transaction.";
      }
      else {
        alert("Something went wrong, please try again");
        return e.message;
      }
    }
  }

  async function buyHnyWithMATIC() {
    try {
      const buyHnyWithMATICResults = await honeyExchangeContract?.call(
        "buyHnyWithMATIC"
      );
      console.log(buyHnyWithMATICResults);
      return buyHnyWithMATICResults;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      if (e.message.includes("Reason: user rejected transaction")) {
        return "User denied transaction signature.";
      } else {
        alert("Something went wrong, please try again");
        return e.message;
      }
    }
  }

  useEffect(() => {
    if(!honeyExchangeContract){
      return;
    }

    const getExchangeRate = async () => {
      const rate = await honeyExchangeContract?.call("exchangeRate");
      setExchangeRate(rate);
    };

    const getHoneyJarPrice = async () => {
      const price = await honeyExchangeContract?.call("honeyJarPrice");
      setHoneyJarPrice(price);
    };

    const getHoneyPotPrice = async () => {
      const price = await honeyExchangeContract?.call("honeyPotPrice");
      setHoneyPotPrice(price);
    };
    
    const getHoneyStashPrice = async () => {
      const price = await honeyExchangeContract?.call("honeyStashPrice");
      setHoneyStashPrice(price);
    };

    if(exchangeRate.toString() === "-10"){
      getExchangeRate();
    }
    if(honeyJarPrice.toString() === "-10"){
      getHoneyJarPrice();
    }
    if(honeyPotPrice.toString() === "-10"){
      getHoneyPotPrice();
    }
    if(honeyStashPrice.toString() === "-10"){
      getHoneyStashPrice();
    }
  }, [honeyExchangeContract, exchangeRate, honeyJarPrice, honeyPotPrice, isLoadingHoneyExchangeContract, honeyStashPrice]);
  
  
  allOwnedNFTs.buyHoneyJar = buyHoneyJar;
  allOwnedNFTs.buyHoneyPot = buyHoneyPot;
  allOwnedNFTs.buyHoneyStash = buyHoneyStash;
  allOwnedNFTs.buyHnyWithMATIC = buyHnyWithMATIC;
  allOwnedNFTs.exchangeRate = exchangeRate;
  allOwnedNFTs.honeyJarPrice = honeyJarPrice;
  allOwnedNFTs.honeyPotPrice = honeyPotPrice;
  allOwnedNFTs.honeyStashPrice = honeyStashPrice;


  /////////////// Load Bridge Functions ///////////////////////
  async function bridgeTeds() {
    try {
      const bridgeResults = await tedPolygonContract?.call("fotfbridge");
      console.log(bridgeResults);
      return bridgeResults;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      if (e.message.includes("Reason: user rejected transaction")) {
        return "User denied transaction signature.";
      } else if (
        e.message.includes("Reason: Address has already bridged tokens")
      ) {
        return "You have already bridged Teds";
      } else if (e.message.includes("Reason: Address is not whitelisted")) {
        return "You are not whitelisted to bridge Teds";
      } else {
        alert("Something went wrong, please try again");
        return e.message;
      }
    }
  }

  async function testbridgeTeds() {
    try {
      const bridgeResults = await TEST_tedPolygonContract?.call("fotfbridge");
      console.log(bridgeResults);
      return bridgeResults;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      if (e.message.includes("Reason: user rejected transaction")) {
        return "User denied transaction signature.";
      } else if (
        e.message.includes("Reason: Address has already bridged tokens")
      ) {
        return "You have already bridged Teds";
      } else if (e.message.includes("Reason: Address is not whitelisted")) {
        return "You are not whitelisted to bridge Teds";
      } else {
        alert("Something went wrong, please try again");
        return e.message;
      }
    }
  }

  async function testbridgeTeddies() {
    try {
      const bridgeResults = await TEST_teddyPolygonContract?.call(
        "teddybridge"
      );
      console.log(bridgeResults);
      return bridgeResults;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      if (e.message.includes("Reason: user rejected transaction")) {
        return "User denied transaction signature.";
      } else if (
        e.message.includes("Reason: Address has already bridged tokens")
      ) {
        return "You have already bridged Teddies";
      } else if (e.message.includes("Reason: Address is not whitelisted")) {
        return "You are not whitelisted to bridge Teddies";
      } else {
        alert("Something went wrong, please try again");
        return e.message;
      }
    }
  }

  async function testbridgeAITeds() {
    try {
      const bridgeResults = await TEST_aiTedPolygonContract?.call("aibridge");
      console.log(bridgeResults);
      return bridgeResults;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      if (e.message.includes("Reason: user rejected transaction")) {
        return "User denied transaction signature.";
      } else if (
        e.message.includes("Reason: Address has already bridged tokens")
      ) {
        return "You have already bridged AI Teds";
      } else if (e.message.includes("Reason: Address is not whitelisted")) {
        return "You are not whitelisted to bridge AI Teds";
      } else {
        alert("Something went wrong, please try again");
        return null;
      }
    }
  }

  async function bridgeTeddies() {
    try {
      const bridgeResults = await teddiesPolygonContract?.call("teddybridge");
      console.log(bridgeResults);
      return bridgeResults;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      if (e.message.includes("Reason: user rejected transaction")) {
        return "User denied transaction signature.";
      } else if (
        e.message.includes("Reason: Address has already bridged tokens")
      ) {
        return "You have already bridged Teddies";
      } else if (e.message.includes("Reason: Address is not whitelisted")) {
        return "You are not whitelisted to bridge Teddies";
      } else {
        alert("Something went wrong, please try again");
        return e.message;
      }
    }
  }

  async function bridgeAITeds() {
    try {
      const bridgeResults = await aiTedsPolygonContract?.call("aibridge");
      console.log(bridgeResults);
      return bridgeResults;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      if (e.message.includes("Reason: user rejected transaction")) {
        return "User denied transaction signature.";
      } else if (
        e.message.includes("Reason: Address has already bridged tokens")
      ) {
        return "You have already bridged AI Teds";
      } else if (e.message.includes("Reason: Address is not whitelisted")) {
        return "You are not whitelisted to bridge AI Teds";
      } else {
        alert("Something went wrong, please try again");
        return e.message;
      }
    }
  }
  allOwnedNFTs.testbridgeTeds = testbridgeTeds;
  allOwnedNFTs.testbridgeTeddies = testbridgeTeddies;
  allOwnedNFTs.testbridgeAITeds = testbridgeAITeds;
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
