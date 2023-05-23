

import { Box, CircularProgress, Typography } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { NFT, ThirdwebProvider, coinbaseWallet, localWallet, metamaskWallet, safeWallet, useAddress, walletConnect } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import { LoadETHAccountDetails, tokens } from "../account/loadETHAccountDetails";
import { PolygonProps } from "../views/Dashboard";
import { useEffect, useState } from "react";
import { Ethereum, Polygon, Mumbai } from "@thirdweb-dev/chains";
import { PolygonAccountDetails } from "../account/loadPolygonAccountDetails";


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

export interface EthProps {
  tokens: tokens;
  errorOneOfOne: boolean;
  errorBirthCerts: boolean;
  isLoadingOneOfOne: boolean;
  isLoadingBirthCerts: boolean;
  honeyBalance: string;
}

export interface AssetOverviewProps {
  tokenProps: PolygonAccountDetails;
  ethTokenProps: EthProps;
}

function AssetOverviewDashboard(props: AssetOverviewProps) {
  //const { tokens, isLoadingTed, isLoadingTeddy, isLoadingStaked, isLoadingAI, isLoadingBirthCerts, isLoadingOneOfOne, error, honeyBalance } = props
  const { tokens, isLoadingTed, isLoadingTeddy, isLoadingAI, errorTed, errorTeddy, errorAI, maticBalance, needsFunds } = props.tokenProps;

  console.log(tokens);
  console.log(isLoadingTed);
  console.log(isLoadingTeddy);
  console.log(isLoadingAI);
  console.log(errorTed);
  console.log(errorTeddy);
  console.log(errorAI);
  console.log(maticBalance);
  console.log(needsFunds);

  const {honeyBalance, isLoadingOneOfOne, isLoadingBirthCerts, tokens: ethTokens, errorBirthCerts, errorOneOfOne} = props.ethTokenProps;
  console.log(honeyBalance);
  console.log(isLoadingOneOfOne);
  console.log(isLoadingBirthCerts);
  console.log(ethTokens);
  console.log(errorBirthCerts);
  console.log(errorOneOfOne);

  const tedNFTs = tokens.Teds?.tokens;
  const teddyNFTs = tokens.Teddies?.tokens;
  const aiTedNFTs = tokens.AITeds?.tokens;
  //const traitTokens = tokens.TraitSwapTokens?.tokens;
  const traitTokens: NFT[] = [];

  const oneOfOnes = ethTokens.OneofOnes?.tokens;
  const birthCerts = ethTokens.BirthCertificates?.tokens;

  const [allOwnedNFTs, setAllOwnedNFTs] = useState<NFT[]>([]);
  // const [teddyCount, setTeddyCount] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {

    var tokenCountTmp = 0;

    if(tedNFTs){
      tedNFTs?.forEach((nft) => {
        tokenCountTmp++;
      });
    } 

    if(teddyNFTs){
      teddyNFTs?.forEach((nft) => {
        tokenCountTmp++;
      });
    }

    if(aiTedNFTs){
      aiTedNFTs?.forEach((nft) => {
        tokenCountTmp++;
      }); 
    }

    if (oneOfOnes) {
      tokenCountTmp = tokenCountTmp + oneOfOnes?.length;
    }

    if (birthCerts) {
      tokenCountTmp = tokenCountTmp + birthCerts?.length;
    }

    if (traitTokens) {
      tokenCountTmp = tokenCountTmp + traitTokens?.length;
    }

    setTokenCount(tokenCountTmp);

  }, [tedNFTs, teddyNFTs, aiTedNFTs, oneOfOnes, birthCerts, traitTokens]);
 
 

  return (
  <Box className="info-card-dashboard">
        <Box className="row-between">
            <Typography className="page-header-small">
                Asset Overview
            </Typography>
          <Typography className="learnMore">
            {tokenCount} total tokens
          </Typography>
        </Box>
        <Box className="row-around">
          <Box className="col-large-dashboard">
            <Typography className="honeyBalanceBlack-dashboard">{honeyBalance}</Typography>
            <Typography className="honeyBalance-dashboard"> $HNY</Typography>
          </Box>
          <Box className="col-margin">
            {isLoadingTed 
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="asset-numbers-dashboard">{tedNFTs?.length}</Typography>
            }
            <Typography className="asset-type-dashboard">{tedNFTs?.length === 1 ? "Ted" : "Teds"}</Typography>
          </Box>
          <Box className="col-margin">
            {isLoadingTeddy 
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="asset-numbers-dashboard">{teddyNFTs?.length}</Typography>
            }
            <Typography className="asset-type-dashboard">{teddyNFTs?.length === 1 ? "Teddy" : "Teddies"}</Typography>
          </Box>
          
        </Box>
        {/* <Box className="row-center-margin">
          <Typography className="honeyBalanceBlack">{honeyBalance}</Typography>
          <Typography className="honeyBalance"> $HNY</Typography>
        </Box> */}
        <Box className="row-around">
          <Box className="col-margin">
            {isLoadingAI
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="asset-numbers-dashboard">{aiTedNFTs?.length}</Typography>
            }
            <Typography className="asset-type-dashboard">{aiTedNFTs?.length === 1 ? "AI Ted" : "AI Teds"}</Typography>
          </Box>
          <Box className="col-margin">
          {isLoadingOneOfOne
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="asset-numbers-dashboard"> {oneOfOnes?.length}</Typography>
          }
            <Typography className="asset-type-dashboard">{oneOfOnes?.length === 1 ? "One of One" : "One of Ones"}</Typography>
          </Box>
          <Box className="col-margin">
          {isLoadingBirthCerts
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="asset-numbers-dashboard"> {birthCerts?.length}</Typography>
          }
            <Typography className="asset-type-dashboard">{birthCerts?.length === 1 ? "Birth Certificate" : "Birth Certificates"}</Typography>
          </Box>
          <Box className="col-margin">
            <Typography className="asset-numbers-dashboard">
              {traitTokens?.length}
            </Typography>
            <Typography className="asset-type-dashboard">{traitTokens?.length === 1 ? "Trait Token" : "Trait Tokens"}</Typography>
          </Box>
        </Box>
      </Box>
        );
    }
    
    export default AssetOverviewDashboard;