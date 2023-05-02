import {  Box, Typography } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import { LoadAllAccountDetails } from "../account/loadAllAccountDetails";


function AssetOverview() {

  const { tokens, isLoading, error, honeyBalance } = LoadAllAccountDetails();
  console.log(tokens);
  console.log(isLoading);
  console.log(error);
  console.log(honeyBalance);

  const allOwnedNFTs = tokens.AllTokens.tokens;
  const tedNFTs = tokens.Teds.tokens;
  const teddyNFTs = tokens.Teddies.tokens;
  const aiTedNFTs = tokens.AITeds.tokens;

  const oneOfOnes = tokens.OneofOnes.tokens;
  const birthCerts = tokens.BirthCertificates.tokens;
  const traitTokens = tokens.TraitSwapTokens.tokens;


  return (
    <Box className="info-card">
    <Box className="row-even">
      <Box className="info-card__title">
        Asset Overview
      </Box>
      <Typography 
        className="learnMore">
        {allOwnedNFTs.length} total tokens
        </Typography>
    </Box>
    <Box className="row-around">
      <Box className='col-no-space'>
        <Typography className="asset-numbers">{tedNFTs?.length}</Typography>
        <Typography className="aseet-type">Teds</Typography> 
      </Box>
      <Box className='col-no-space'>
        <Typography className="asset-numbers">{teddyNFTs?.length}</Typography>
        <Typography className="aseet-type">Teddies</Typography> 
      </Box>
      <Box className='col-no-space'>
        <Typography className="asset-numbers">{aiTedNFTs?.length}</Typography>
        <Typography className="aseet-type">AI Teds</Typography> 
      </Box>
    </Box>
    <Box className="row-center-margin">
      <Typography className="honeyBalanceBlack">{honeyBalance}</Typography>
      <Typography className="honeyBalance"> $HNY</Typography>
    </Box>
    <Box className="row-around">
      <Box className='col-no-space'>
        <Typography className="asset-numbers">{oneOfOnes?.length}</Typography>
        <Typography className="aseet-type">One of Ones</Typography> 
      </Box>
      <Box className='col-no-space'>
        <Typography className="asset-numbers">{birthCerts?.length}</Typography>
        <Typography className="aseet-type">Birth Certificates</Typography> 
      </Box>
      <Box className='col-no-space'>
        <Typography className="asset-numbers">{traitTokens?.length}</Typography>
        <Typography className="aseet-type">Trait Tokens</Typography> 
      </Box>
    </Box>
  </Box>
  );
  
}

export default AssetOverview;