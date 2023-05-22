import { Box } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import { LoadETHAccountDetails } from "../account/loadETHAccountDetails";

function AssetOverview() {
  const { tokens, isLoadingOneOfOne, isLoadingBirthCerts, errorBirthCerts, errorOneOfOne, honeyBalance } = LoadETHAccountDetails();
  console.log(tokens);
  console.log(isLoadingOneOfOne);
  console.log(isLoadingBirthCerts);
  console.log(errorBirthCerts);
  console.log(errorOneOfOne);
  console.log(honeyBalance);

  const allOwnedNFTs = tokens.AllTokens.tokens;
  const birthCertNFTs = tokens.BirthCertificates?.tokens;
  const oneOfOneNFTs = tokens.OneofOnes?.tokens;

  // var teddyCount = 0;
  // if (stakedTeddies && teddyNFTs) {
  //   teddyCount  = teddyNFTs?.length + stakedTeddies?.length;
  // } else if (teddyNFTs) {
  //   teddyCount = teddyNFTs?.length;
  // } else if (stakedTeddies) {
  //   teddyCount = stakedTeddies?.length;
  // }
  
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <h1 className="comingSoon">
        <span className="comingSoonBlack">Coming</span> Soon
      </h1>
    </Box>
  );
}

export default AssetOverview;
