import {  Box, Typography } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import { loadAllAccountDetails } from "../account/loadAllAccountDetails";


function AssetOverview() {

  const { tokens, isLoading, error, honeyBalance } = loadAllAccountDetails();
  console.log(tokens);
  console.log(isLoading);
  console.log(error);
  console.log(honeyBalance);

  const allOwnedNFTs = tokens.AllTokens.tokens;
  const tedNFTs = tokens.Teds.tokens;
  const teddyNFTs = tokens.Teddies.tokens;
  const aiTedNFTs = tokens.AITeds.tokens;

  return (
    <Box className="info-card">
    <Box className="row-even">
      <div className="info-card__title">Asset Overview</div>
      <Typography 
        className="learnMoreBtn">
        Est Value. 6 ETH
        </Typography>
    </Box>
  </Box>
  );
  
}

export default AssetOverview;