

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { NFT, ThirdwebProvider, coinbaseWallet, localWallet, metamaskWallet, safeWallet, useAddress, walletConnect } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import { LoadETHAccountDetails, tokens } from "../account/loadETHAccountDetails";
import { PolygonProps } from "../views/Dashboard";
import { useEffect, useState } from "react";
import { Ethereum, Polygon, Mumbai } from "@thirdweb-dev/chains";
import { PolygonAccountDetails } from "../account/loadPolygonAccountDetails";
import { Console } from "console";
import { IDictionary } from "../views/HoneyExchange";
import ErrorDialog from "./ErrorDialog";
import SuccessDialog from "./SuccessDialog";


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
  hasWalletClaimedETHHoney: boolean;
}

export interface AssetOverviewProps {
  tokenProps: PolygonAccountDetails;
  ethTokenProps: EthProps;
}

function AssetOverviewDashboard(props: AssetOverviewProps) {
  //const { tokens, isLoadingTed, isLoadingTeddy, isLoadingStaked, isLoadingAI, isLoadingBirthCerts, isLoadingOneOfOne, error, honeyBalance } = props
  const { honeyBalance, isLoadingHoney, isLoadingHoneyContract, honeyContract, tokens, isLoadingTed, isLoadingTeddy, isLoadingAI, errorTed, errorTeddy, errorAI, maticBalance, needsFunds } = props.tokenProps;

  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress(); // Get connected wallet address

  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successCode, setSuccessCode] = useState(0);
  
  console.log(tokens);
  console.log(isLoadingTed);
  console.log(isLoadingTeddy);
  console.log(isLoadingAI);
  console.log(errorTed);
  console.log(errorTeddy);
  console.log(errorAI);
  console.log(maticBalance);
  console.log(needsFunds);
  console.log(honeyBalance);
  console.log(isLoadingHoney);
  console.log(isLoadingHoneyContract);
  console.log(honeyContract);

  const { isLoadingOneOfOne, isLoadingBirthCerts, tokens: ethTokens, errorBirthCerts, errorOneOfOne, hasWalletClaimedETHHoney, unclaimedHoneyBalance, pendingHoneyAirdrop, loadingUnclaimedHoneyBalance, isLoadingContractTeds, isLoadingNumberOfTedsOwned} = LoadETHAccountDetails();
  
  console.log(isLoadingOneOfOne);
  console.log(isLoadingBirthCerts);
  console.log(ethTokens);
  console.log(errorBirthCerts);
  console.log(errorOneOfOne);
  console.log(hasWalletClaimedETHHoney);
  console.log(unclaimedHoneyBalance);
  console.log(pendingHoneyAirdrop);
  console.log(loadingUnclaimedHoneyBalance);
  console.log(isLoadingContractTeds);
  console.log(isLoadingNumberOfTedsOwned);

  const tedNFTs = tokens.Teds?.tokens;
  const teddyNFTs = tokens.Teddies?.tokens;
  const aiTedNFTs = tokens.AITeds?.tokens;
  //const traitTokens = tokens.TraitSwapTokens?.tokens;
  const traitTokens: NFT[] = [];

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
  const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
  const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");

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
 
  const handleErrorClose = () => {
    setShowError(false);
  };

  async function collectETHHoney(): Promise<void> {
    if(address) {
      console.log("Collecting ETH Honey");
      try {
        const requestJSON: IDictionary = {
          "wallet": address!,
          "amount": unclaimedHoneyBalance
        };
        const json = JSON.stringify(requestJSON, null, 2);
        console.log(json);
        const response = await fetch(`https://h7ke8qc4ng.execute-api.us-east-1.amazonaws.com/Prod/processETHHoneyClaim`, {
          method: 'POST',
          body: json,
        });
        console.log(response);
        if(response.status === 400){
          console.log("already bridged honey... error");
          setShowError(true);
          setErrorCode(16);
        } else if (response.status === 403){
          console.log("pending honey bridge... error");
          setShowError(true);
          setErrorCode(17);
        } else if (response.status === 200){
          console.log("success");
          setShowSuccess(true);
          setSuccessCode(5);
        }
      } catch (e) {
        console.log(e);
        console.log("Error!");
        setShowError(true);
        setErrorCode(1000);
      }
    }
  }

  return (
  <Box className="info-card-dashboard">
        <Box className="row-between" sx={{maxHeight: "15%"}}>
            <Typography className="page-header-small">
                Asset Overview
            </Typography>
            {!hasWalletClaimedETHHoney && <Button disabled={loadingUnclaimedHoneyBalance || isLoadingContractTeds || isLoadingNumberOfTedsOwned} onClick={() => collectETHHoney()}>Collect Unclaimed ETH $HNY</Button>}
            {pendingHoneyAirdrop && <Button disabled={true}>ETH $HNY Airdrop Pending...</Button>}
          <Typography className="learnMore">
            {tokenCount} total tokens
          </Typography>
        </Box>
        <Box className="row-around" sx={{maxHeight: "40%"}}>
          <Box className="col-large-dashboard">
          {isLoadingHoney || isLoadingHoneyContract
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="honeyBalanceBlack-dashboard">{new Intl.NumberFormat("en-US", {
                minimumIntegerDigits: 2,
              }).format(parseInt(honeyBalance.toString()))}</Typography>
            }
            <Typography className="honeyBalance-dashboard"> $HNY</Typography>
            
          </Box>
          <Box className="col-margin">
            <Typography className="asset-numbers-dashboard">
              {traitTokens?.length}
            </Typography>
            <Typography className="asset-type-dashboard">{traitTokens?.length === 1 ? "Trait Token" : "Trait Tokens"}</Typography>
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
        <Box className="row-around" sx={{maxHeight: "40%"}}>
        <Box className="col-margin">
            {isLoadingTed 
              ? <CircularProgress size="1rem" sx={{margin: "auto"}}/>
              : <Typography className="asset-numbers-dashboard">{tedNFTs?.length}</Typography>
            }
            <Typography className="asset-type-dashboard">{tedNFTs?.length === 1 ? "Ted" : "Teds"}</Typography>
          </Box>
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
        </Box>
        
      <ErrorDialog
        open={showError}
        handleClose={handleErrorClose}
        errorCode={errorCode}
      />

      <SuccessDialog
        open={showSuccess}
        setOpen={setShowSuccess}
        successCode={successCode}
        ethHoneyClaimed={unclaimedHoneyBalance}
      />

        {/* {new Intl.NumberFormat("en-US", {
                minimumIntegerDigits: 2,
              }).format(parseInt(unclaimedHoneyBalance.toString()))}  */}
      </Box>
        );
    }
    
    export default AssetOverviewDashboard;