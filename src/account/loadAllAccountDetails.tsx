import { useSDK, useAddress, useOwnedNFTs, useContract } from "@thirdweb-dev/react";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, BigNumber, BigNumberish, ethers } from "ethers";
import { useState, useMemo, useCallback, useEffect } from "react";
import teddyABI from "../ABIs/teddyABI.json";
import tedABI from "../ABIs/tedABI.json";
import stakingABI from "../ABIs/stakingABI.json";
import honeyABI from "../ABIs/honeyABI.json";
import aiABI from "../ABIs/aiABI.json";
  
interface StakedTokens {
    address: string;
    tokenId: BigNumber;
  }

  interface tokens {
    Teds: {
      address: string;
      tokens: NFT[];
    },
    Teddies: {
      address: string;
      tokens: NFT[];
    },
    AITeds: {
      address: string;
      tokens: NFT[];
    },
    OneofOnes: {
      address: string;
      tokens: NFT[];
    },
    BirthCertificates: {
      address: string;
      tokens: NFT[];
    },
    TraitSwapTokens: {
      address: string;
      tokens: NFT[];
    },
    AllTokens: {
      address: string;
      tokens: NFT[];
    }
  }

  export interface allOwnedNFTs {
    tokens: tokens;
    isLoading: boolean;
    error: boolean;
    honeyBalance: string;
  }
  
  const initialState: allOwnedNFTs = {
    isLoading: false,
    error: false,
    honeyBalance: "0",
    tokens: {
        Teds: {
          address: "",
          tokens: []
        },
        Teddies: {
          address: "",
          tokens: []
        },
        AITeds: {
          address: "",
          tokens: []
        },
        OneofOnes: {
          address: "",
          tokens: []
        },
        BirthCertificates: {
          address: "",
          tokens: []
        },
        TraitSwapTokens: {
          address: "",
          tokens: []
        },
        AllTokens: {
          address: "",
          tokens: []
        }
      }, 
  };
  
 
const FOTF_CONTRACT="0x06bdc702fb8af5af8067534546e0c54ea4243ea9";
const TEDDY_CONTRACT="0x4aB1337970E889Cf5E425A7267c51db183028cf4";
const STAKING_CONTRACT="0x15829C851C3117f662C5A9E369bC3A4dBbeaFEBF";
const REWARD_TOKEN="0x6ca0269dca415313256cfecD818F32c5AfF0A518";
const AI_MINT="0x1C6d280280f7f8d139659E314d738bdD466741Ba";

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
  
     
/////////////// Load All NFTs ///////////////////////

export function LoadAllAccountDetails() : allOwnedNFTs  {
// export const loadAllAccountDetails = () => {
    const allOwnedNFTs: allOwnedNFTs = initialState; 
    allOwnedNFTs.isLoading = true;

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
    

    
    const nftArray: tokens = useMemo(() => {
      if (address) {
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

        
    
        return {
          Teds: {
            address: address!,
            tokens: tedNFTs!
          },
          Teddies: {
            address: address!,
            tokens: teddyNFTs!
          },
          AITeds: {
            address: address!,
            tokens: aiNFTs!
          },
          OneofOnes: {
            address: address!,
            tokens: []
          },
          BirthCertificates: {
            address: address!,
            tokens: []
          },
          TraitSwapTokens: {
            address: "",
            tokens: []
          }, 
          AllTokens: {
            address: address!,
            tokens: returnNFTs!
          }
        }
      } else {
        return initialState.tokens;
      }
      
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


  if(error || errorTeddy || errorAI) {
    allOwnedNFTs.error = true;
  } else {
    allOwnedNFTs.error = false;
  }
  allOwnedNFTs.isLoading = false;
  allOwnedNFTs.tokens = nftArray;
  if (honey){
    allOwnedNFTs.honeyBalance = honey;
  } 
  return allOwnedNFTs;
}
  
  //     // FIND THE TOKENS THAT ARE CURRENTLY BEING STAKED ON THE CONTRACT
  //     const stakingContract = GenosNFTStaking__factory.connect(
  //       addresses[NetworkId.MAINNET].STAKING_CONTRACT, // the address of the contract on Mainnet
  //       provider
  //     );
  //     const tokensInStakingContract = await stakingContract.getStakedTokens(
  //       address
  //     );
  
  //     let userStakedTokens: StakedToken[] = [];
  //     let tokenIds: any[] = [];
  
  //     tokensInStakingContract.forEach((e) => {
  //       let s: StakedToken = {
  //         addressOfStaker: e.staker,
  //         tokenId: e.tokenId,
  //       };
  //       userStakedTokens.push(s);
  //       tokenIds.push(e.tokenId.toNumber());
  //     });
  
  //     // Create a list of stakedTokens using INFTMETADATA Interface
  //     let stakedTokens: INFTMetadata[] = [];
  //     for (const tokenId of tokenIds) {
  //       let nftToken: INFTMetadata = {
  //         tokenId: "",
  //         image: "",
  //         description: "",
  //         title: "",
  //         attributes: [],
  //         tokenType: "",
  //         external_url: ""
  //       };
  
  //       // Fetch metadata for a particular NFT:
  //       const response = await alchemy.nft.getNftMetadata(
  //         addresses[NetworkId.MAINNET].NFT_CONTRACT,
  //         tokenId
  //       );
  
  //       nftToken.tokenId = response.tokenId;
  //       nftToken.description = response.description;
  //       nftToken.title = response.title;
  //       nftToken.attributes = response.rawMetadata?.attributes;
  //       nftToken.tokenType = response.tokenType;
  
  //       let src = response.rawMetadata?.image;
  //       if(src){
  //         if(response.title.includes('Fury')){
  //           nftToken.image =
  //             `https://furyofthefur.s3.amazonaws.com/${nftToken.tokenId}.png`;
  //         } else {
  //           // Recreate string for ipfs
  //           nftToken.image =
  //           "https://ipfs.io/ipfs/" + src?.substring(6, src.length);
  //         }
  //       } else nftToken.image = "";
            
  //       stakedTokens.push(nftToken);
  //       console.log(nftToken);
  //     }
  
  //     // Reward token balance
  //     const rewardsToken = IERC20__factory.connect(
  //       addresses[NetworkId.MAINNET].REWARDTOKEN, // the address of the contract on Mainnet
  //       provider
  //     );
  
  //     let balance = ethers.utils.formatEther(
  //       await rewardsToken.balanceOf(address)
  //     );
  
  //     return {
  //       balances: {
  //         nft: {
  //           address: addresses[NetworkId.MAINNET].FOTF,
  //           tokens: tokens,
  //         },
  //         nftToStake: {
  //           address: addresses[NetworkId.MAINNET].NFT_CONTRACT,
  //           tokens: stakeableNftTokens,
  //         },
  //         staking: userStakedTokens,
  //         stakedNFTs: {
  //           address: addresses[NetworkId.MAINNET].NFT_CONTRACT,
  //           tokens: stakedTokens,
  //         },
  //         rewardToken: balance,
  //       },
  //     };
  //   }
  // );
  
  // export const getBalances = createAsyncThunk(
  //   "account/getBalances",
  //   async ({
  //     address,
  //     networkID,
  //     provider,
  //   }: IBaseAddressAsyncThunk): Promise<IUserBalances> => {
  //     let nftBalance = 0;
  
  //     // All of the tokens that the NFT app is tracking
  //     let tokens: string[] = [];
  
  //     return {
  //       balances: {
  //         nft: {
  //           address: "",
  //           tokens: {
  //             tokenId: "",
  //             image: "",
  //           },
  //         },
  //       },
  //     };
  //   }
  // );
  
  // const accountSlice = createSlice({
  //   name: "account",
  //   initialState,
  //   reducers: {
  //     fetchAccountSuccess(state, action) {
  //       setAll(state, action.payload);
  //     },
  //   },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(loadAccountDetails.pending, (state) => {
  //         state.loading = true;
  //       })
  //       .addCase(loadAccountDetails.fulfilled, (state, action) => {
  //         setAll(state, action.payload);
  //         state.loading = false;
  //       })
  //       .addCase(loadAccountDetails.rejected, (state, { error }) => {
  //         state.loading = false;
  //         console.log(error);
  //       });
      // .addCase(getBalances.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(getBalances.fulfilled, (state, action) => {
      //   setAll(state, action.payload);
      //   state.loading = false;
      // })
      // .addCase(getBalances.rejected, (state, { error }) => {
      //   state.loading = false;
      //   console.log(error);
      // });
  //   },
  // });
  
  // export default accountSlice.reducer;
  
  // export const { fetchAccountSuccess } = accountSlice.actions;
  
  // const baseInfo = (state: AppState) => state.account;
  
  // export const getAccountState = createSelector(baseInfo, (account) => account);