

import { Box, CircularProgress, Typography } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { NFT, ThirdwebProvider, coinbaseWallet, localWallet, metamaskWallet, safeWallet, useAddress, walletConnect } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import { LoadETHAccountDetails, tokens } from "../account/loadETHAccountDetails";
import { PolygonProps } from "../views/Dashboard";
import { useEffect, useState } from "react";
import { Ethereum, Polygon, Mumbai } from "@thirdweb-dev/chains";


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

function AssetOverviewBothNetworks(props: PolygonProps) {
  //const { tokens, isLoadingTed, isLoadingTeddy, isLoadingStaked, isLoadingAI, isLoadingBirthCerts, isLoadingOneOfOne, error, honeyBalance } = props
  const { tokens, isLoadingTed, isLoadingTeddy, isLoadingAI, errorTed, errorTeddy, errorAI, maticBalance, needsFunds } = props.tokenProps;
  const { leftNavOpen, rightNavOpen } = props;
  console.log(tokens);
  console.log(isLoadingTed);
  console.log(isLoadingTeddy);
  console.log(isLoadingAI);
  console.log(errorTed);
  console.log(errorTeddy);
  console.log(errorAI);
  console.log(maticBalance);
  console.log(needsFunds);

  const {honeyBalance, isLoadingOneOfOne, isLoadingBirthCerts, tokens: ethTokens } = LoadETHAccountDetails(); 
  console.log(honeyBalance);
  console.log(isLoadingOneOfOne);
  console.log(isLoadingBirthCerts);
  console.log(ethTokens);


  const tedNFTs = tokens.Teds?.tokens;
  const teddyNFTs = tokens.Teddies?.tokens;
  const aiTedNFTs = tokens.AITeds?.tokens;
  // const traitTokens = tokens.TraitSwapTokens?.tokens;

  const oneOfOnes = ethTokens.OneofOnes?.tokens;
  const birthCerts = ethTokens.BirthCertificates?.tokens;

  const [allOwnedNFTs, setAllOwnedNFTs] = useState<NFT[]>([]);
  // const [teddyCount, setTeddyCount] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {

    var tokenCountTmp = 0;
  //  var allOwnedNFTTmp: NFT[] = [];

    tedNFTs?.forEach((nft) => {
     // allOwnedNFTTmp.push(nft);
      tokenCountTmp++;
    });

    teddyNFTs?.forEach((nft) => {
     // allOwnedNFTTmp.push(nft);
      tokenCountTmp++;
    });

    aiTedNFTs?.forEach((nft) => {
    //  allOwnedNFTTmp.push(nft);
      tokenCountTmp++;
    }); 

    if (oneOfOnes) {
      tokenCountTmp = tokenCountTmp + oneOfOnes?.length;
    }

    if (birthCerts) {
      tokenCountTmp = tokenCountTmp + birthCerts?.length;
    }

    setTokenCount(tokenCountTmp);
   // setAllOwnedNFTs(allOwnedNFTTmp);

     // if (traitTokens) {
  //   tokenCount = tokenCount + traitTokens?.length;
  // }

  }, [tedNFTs, teddyNFTs, aiTedNFTs, oneOfOnes, birthCerts]);
 
 

  return (
  <Box className="info-card">
        <Box className="row-between">
          <Box className="info-card__title">Asset Overview</Box>
          <Typography className="learnMore">
            {tokenCount} total tokens
          </Typography>
        </Box>
        <Box className="row-around">
          <Box className="col-no-space">
            {isLoadingTed 
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="asset-numbers">{tedNFTs?.length}</Typography>
            }
            <Typography className="aseet-type">Teds</Typography>
          </Box>
          <Box className="col-no-space">
            {isLoadingTeddy 
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="asset-numbers">{teddyNFTs?.length}</Typography>
            }
            <Typography className="aseet-type">Teddies</Typography>
          </Box>
          <Box className="col-no-space">
            {isLoadingAI
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="asset-numbers">{aiTedNFTs?.length}</Typography>
            }
            <Typography className="aseet-type">AI Teds</Typography>
          </Box>
        </Box>
        <Box className="row-center-margin">
          <Typography className="honeyBalanceBlack">{honeyBalance}</Typography>
          <Typography className="honeyBalance"> $HNY</Typography>
        </Box>
        <Box className="row-around">
          <Box className="col-no-space">
          {isLoadingOneOfOne
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="asset-numbers"> {oneOfOnes?.length}</Typography>
          }
            <Typography className="aseet-type">One of Ones</Typography>
          </Box>
          <Box className="col-no-space">
          {isLoadingBirthCerts
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="asset-numbers"> {birthCerts?.length}</Typography>
          }
            <Typography className="aseet-type">Birth Certificates</Typography>
          </Box>
          <Box className="col-no-space">
            <Typography className="asset-numbers">
              {/* {traitTokens?.length} */} 0
            </Typography>
            <Typography className="aseet-type">Trait Tokens</Typography>
          </Box>
        </Box>
      </Box>
        );
    }
    
    export default AssetOverviewBothNetworks;