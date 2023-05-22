import { Box, CircularProgress, Typography } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { NFT, ThirdwebProvider, coinbaseWallet, localWallet, metamaskWallet, safeWallet, useAddress, walletConnect } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import { LoadETHAccountDetails, tokens } from "../account/loadETHAccountDetails";
import { PolygonProps } from "../views/Dashboard";
import { useEffect, useState } from "react";
import { Ethereum, Polygon, Mumbai } from "@thirdweb-dev/chains";
import AssetOverviewBothNetworks from "./AssetOverviewBothNetworks";


export interface TokenProps {
  tokens: tokens;
  error: boolean;
  isLoadingTed: boolean,
  isLoadingTeddy: boolean,
  isLoadingAI: boolean,
  isLoadingBirthCerts: boolean,
  isLoadingOneOfOne: boolean,
  isLoadingStaked: boolean,
  honeyBalance: string;
  leftNavOpen: boolean;
  rightNavOpen: boolean;
}

function AssetOverviewSidebar(props: PolygonProps) {
  //const { tokens, isLoadingTed, isLoadingTeddy, isLoadingStaked, isLoadingAI, isLoadingBirthCerts, isLoadingOneOfOne, error, honeyBalance } = props
  // const { tokens, isLoadingTed, isLoadingTeddy, isLoadingAI, errorTed, errorTeddy, errorAI, maticBalance, needsFunds } = props.tokenProps;
  // const { leftNavOpen, rightNavOpen } = props;
  // console.log(tokens);
  // console.log(isLoadingTed);
  // console.log(isLoadingTeddy);
  // console.log(isLoadingAI);
  // console.log(errorTed);
  // console.log(errorTeddy);
  // console.log(errorAI);
  // console.log(maticBalance);
  // console.log(needsFunds);

  


  // const tedNFTs = tokens.Teds?.tokens;
  // const teddyNFTs = tokens.Teddies?.tokens;
  // const aiTedNFTs = tokens.AITeds?.tokens;
  // // const traitTokens = tokens.TraitSwapTokens?.tokens;

  // const oneOfOnes = ethTokens.OneofOnes?.tokens;
  // const birthCerts = ethTokens.BirthCertificates?.tokens;

  // const [allOwnedNFTs, setAllOwnedNFTs] = useState<NFT[]>([]);
  // // const [teddyCount, setTeddyCount] = useState(0);
  // const [tokenCount, setTokenCount] = useState(0);

  // useEffect(() => {

  //   var tokenCountTmp = 0;
  // //  var allOwnedNFTTmp: NFT[] = [];

  //   tedNFTs?.forEach((nft) => {
  //    // allOwnedNFTTmp.push(nft);
  //     tokenCountTmp++;
  //   });

  //   teddyNFTs?.forEach((nft) => {
  //    // allOwnedNFTTmp.push(nft);
  //     tokenCountTmp++;
  //   });

  //   aiTedNFTs?.forEach((nft) => {
  //   //  allOwnedNFTTmp.push(nft);
  //     tokenCountTmp++;
  //   }); 

  //   if (oneOfOnes) {
  //     tokenCountTmp = tokenCountTmp + oneOfOnes?.length;
  //   }

  //   if (birthCerts) {
  //     tokenCountTmp = tokenCountTmp + birthCerts?.length;
  //   }

  //   setTokenCount(tokenCountTmp);
  //  // setAllOwnedNFTs(allOwnedNFTTmp);

  //    // if (traitTokens) {
  // //   tokenCount = tokenCount + traitTokens?.length;
  // // }

  // }, [tedNFTs, teddyNFTs, aiTedNFTs, oneOfOnes, birthCerts]);
 
 

  return (
    <ThirdwebProvider  key={"ethThirdWebProvider"} supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect(), localWallet(), safeWallet()]}
                                activeChain={Ethereum}
                                supportedChains={[Polygon, Ethereum]}>
      <AssetOverviewBothNetworks tokenProps={props.tokenProps} leftNavOpen={props.leftNavOpen} rightNavOpen={props.rightNavOpen} />
    </ThirdwebProvider>
  );
}

export default AssetOverviewSidebar;