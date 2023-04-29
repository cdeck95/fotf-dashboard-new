import {  Box } from "@mui/material";
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

  return (
    <Box  sx={{ display: "flex", 
    justifyContent: "center", alignItems: "center" }}>
      <h1 className="comingSoon"><span className="comingSoonBlack">Coming</span> Soon</h1>
    </Box>
  );
  
}

export default AssetOverview;