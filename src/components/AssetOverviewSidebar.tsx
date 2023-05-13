import { Box, CircularProgress, Typography } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import { LoadAllAccountDetails, tokens } from "../account/loadAllAccountDetails";

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
}

function AssetOverviewSidebar(props: TokenProps) {
  const { tokens, isLoadingTed, isLoadingTeddy, isLoadingStaked, isLoadingAI, isLoadingBirthCerts, isLoadingOneOfOne, error, honeyBalance } = props
  console.log(tokens);
  console.log(isLoadingTed);
  console.log(error);
  console.log(honeyBalance);

  const allOwnedNFTs = tokens.AllTokens.tokens;
  const tedNFTs = tokens.Teds?.tokens;
  const teddyNFTs = tokens.Teddies?.tokens;
  const aiTedNFTs = tokens.AITeds?.tokens;
  const stakedTeddies = tokens.StakedTeddiesIDs?.tokens;

  var teddyCount = 0;
  if (stakedTeddies && teddyNFTs) {
    teddyCount  = teddyNFTs?.length + stakedTeddies?.length;
  } else if (teddyNFTs) {
    teddyCount = teddyNFTs?.length;
  } else if (stakedTeddies) {
    teddyCount = stakedTeddies?.length;
  }

  const oneOfOnes = tokens.OneofOnes?.tokens;
  const birthCerts = tokens.BirthCertificates?.tokens;
  const traitTokens = tokens.TraitSwapTokens?.tokens;

  return (
    <Box className="info-card">
      <Box className="row-between">
        <Box className="info-card__title">Asset Overview</Box>
        <Typography className="learnMore">
          {allOwnedNFTs.length} total tokens
        </Typography>
      </Box>
      <Box className="row-around">
        <Box className="col-no-space">
          {isLoadingTed 
            ? <CircularProgress size="1rem"/> 
            : <Typography className="asset-numbers">{tedNFTs?.length}</Typography>
          }
          <Typography className="aseet-type">Teds</Typography>
        </Box>
        <Box className="col-no-space">
          {isLoadingTeddy || isLoadingStaked 
            ? <CircularProgress size="1rem"/>
            : <Typography className="asset-numbers">{teddyCount}</Typography>
          }
          <Typography className="aseet-type">Teddies</Typography>
        </Box>
        <Box className="col-no-space">
          {isLoadingAI
            ? <CircularProgress size="1rem"/>
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
          <Typography className="asset-numbers">{oneOfOnes?.length}</Typography>
          <Typography className="aseet-type">One of Ones</Typography>
        </Box>
        <Box className="col-no-space">
        {isLoadingBirthCerts
            ? <CircularProgress size="1rem"/>
            : <Typography className="asset-numbers"> {birthCerts?.length}</Typography>
        }
          <Typography className="aseet-type">Birth Certificates</Typography>
        </Box>
        <Box className="col-no-space">
          <Typography className="asset-numbers">
            {traitTokens?.length}
          </Typography>
          <Typography className="aseet-type">Trait Tokens</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AssetOverviewSidebar;
