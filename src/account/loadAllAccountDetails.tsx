import { useSDK, useAddress, useOwnedNFTs, useContract } from "@thirdweb-dev/react";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, BigNumber, ethers } from "ethers";
import { useState, useMemo, useCallback, useEffect } from "react";
  
interface StakedTokens {
    address: string;
    tokenId: BigNumber;
  }

  interface allOwnedNFTs {
    tokens: {
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
      }
    }, 
    loading: boolean;
    honeyBalance: BigNumber
  }
  
  const initialState: allOwnedNFTs = {
    loading: false,
    honeyBalance: 0,
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
        }
      }, 
  };
  
 
  
  
     
/////////////// Load All NFTs ///////////////////////

export const loadAllAccountDetails = async (
    
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
}
  
      // FIND THE TOKENS THAT ARE CURRENTLY BEING STAKED ON THE CONTRACT
      const stakingContract = GenosNFTStaking__factory.connect(
        addresses[NetworkId.MAINNET].STAKING_CONTRACT, // the address of the contract on Mainnet
        provider
      );
      const tokensInStakingContract = await stakingContract.getStakedTokens(
        address
      );
  
      let userStakedTokens: StakedToken[] = [];
      let tokenIds: any[] = [];
  
      tokensInStakingContract.forEach((e) => {
        let s: StakedToken = {
          addressOfStaker: e.staker,
          tokenId: e.tokenId,
        };
        userStakedTokens.push(s);
        tokenIds.push(e.tokenId.toNumber());
      });
  
      // Create a list of stakedTokens using INFTMETADATA Interface
      let stakedTokens: INFTMetadata[] = [];
      for (const tokenId of tokenIds) {
        let nftToken: INFTMetadata = {
          tokenId: "",
          image: "",
          description: "",
          title: "",
          attributes: [],
          tokenType: "",
          external_url: ""
        };
  
        // Fetch metadata for a particular NFT:
        const response = await alchemy.nft.getNftMetadata(
          addresses[NetworkId.MAINNET].NFT_CONTRACT,
          tokenId
        );
  
        nftToken.tokenId = response.tokenId;
        nftToken.description = response.description;
        nftToken.title = response.title;
        nftToken.attributes = response.rawMetadata?.attributes;
        nftToken.tokenType = response.tokenType;
  
        let src = response.rawMetadata?.image;
        if(src){
          if(response.title.includes('Fury')){
            nftToken.image =
              `https://furyofthefur.s3.amazonaws.com/${nftToken.tokenId}.png`;
          } else {
            // Recreate string for ipfs
            nftToken.image =
            "https://ipfs.io/ipfs/" + src?.substring(6, src.length);
          }
        } else nftToken.image = "";
            
        stakedTokens.push(nftToken);
        console.log(nftToken);
      }
  
      // Reward token balance
      const rewardsToken = IERC20__factory.connect(
        addresses[NetworkId.MAINNET].REWARDTOKEN, // the address of the contract on Mainnet
        provider
      );
  
      let balance = ethers.utils.formatEther(
        await rewardsToken.balanceOf(address)
      );
  
      return {
        balances: {
          nft: {
            address: addresses[NetworkId.MAINNET].FOTF,
            tokens: tokens,
          },
          nftToStake: {
            address: addresses[NetworkId.MAINNET].NFT_CONTRACT,
            tokens: stakeableNftTokens,
          },
          staking: userStakedTokens,
          stakedNFTs: {
            address: addresses[NetworkId.MAINNET].NFT_CONTRACT,
            tokens: stakedTokens,
          },
          rewardToken: balance,
        },
      };
    }
  );
  
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
  
  const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
      fetchAccountSuccess(state, action) {
        setAll(state, action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadAccountDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(loadAccountDetails.fulfilled, (state, action) => {
          setAll(state, action.payload);
          state.loading = false;
        })
        .addCase(loadAccountDetails.rejected, (state, { error }) => {
          state.loading = false;
          console.log(error);
        });
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
    },
  });
  
  export default accountSlice.reducer;
  
  export const { fetchAccountSuccess } = accountSlice.actions;
  
  const baseInfo = (state: AppState) => state.account;
  
  export const getAccountState = createSelector(baseInfo, (account) => account);