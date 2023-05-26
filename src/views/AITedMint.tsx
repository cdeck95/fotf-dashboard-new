import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Skeleton,
  ToggleButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import {
  ThirdwebNftMedia,
  useAddress,
  useClaimedNFTSupply,
  useContract,
  useContractMetadata,
  useUnclaimedNFTSupply,
} from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import ComingSoon from "./ComingSoon";
import { AITEDS_POLYGON_CONTRACT, HONEY_CONTRACT } from "../account/loadPolygonAccountDetails";
import { useEffect, useState } from "react";
import BridgeSuccessDialog from "../components/BridgeSuccessDialog";
import ErrorDialog from "../components/ErrorDialog";
import LoadingDialog from "../components/LoadingDialog";
import MaticDialog from "../components/MaticDialog";
import { PolygonNetwork } from "../components/PolygonNetwork";
import teddyPlaceholderImage from "../assets/teddyLogoForPlaceholders.png";
import "../styles/mint.css";
import SuccessDialog from "../components/SuccessDialog";
import { BigNumber } from "ethers";
import CheckIcon from '@mui/icons-material/Check';
import aiTedMintLogo from "../assets/aiTedMint.png";
import { MintProps } from "./TedMint";


const COLLECTION_FOR_MINT = "AI Teds";
const DESCRIPTION_FOR_MINT = () => {
  return (
    <Typography className="desc-text">
      Fully generated recreation of the Original 9671 Fury Teds from Fury Of The
      Fur.
      <br></br>Artwork created by a community member using Starry AI.
      <br></br>No Utility. Just Art and Testing.
    </Typography>
  );
};

function AITedMint(props: MintProps) {
  useTitle("Mint AI Teds - 2 MATIC or 100K HNY");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const leftDrawerWidth = isSmallScreen ? "0px" : "260px";
  const rightDrawerWidth = isSmallScreen ? "0px" : "340px";
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();
  const showMismatch = props.showMismatch;

  const { contract: honeyContract, isLoading: isLoadingHoneyContract, error } = useContract(HONEY_CONTRACT);
  console.log(honeyContract)

  const contract = props.contract;
  const isLoadingContract = props.isloadingContract;

  // const { contract: aiTedsPolygonContract } = useContract(
  //   AITEDS_POLYGON_CONTRACT
  // );
  // console.log(aiTedsPolygonContract);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [needsFunds, setNeedsFunds] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  const [counter, setCounter] = useState(0);
  const [open, setOpen] = useState(false);

  // const [mintWithHNY, setMintWithHNY] = useState(false);

  useEffect(() => {
    if (isMediumLarge || isMobile) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [isMediumLarge, isMobile, isSmallScreen]);

  //   these dont work yet
  //   const { data: contractMetadata } = useContractMetadata(aiTedsPolygonContract);
  //   const unclaimedSupply = useUnclaimedNFTSupply(aiTedsPolygonContract);
  //   const claimedSupply = useClaimedNFTSupply(aiTedsPolygonContract);

  //////////////////// Function Calls Start ////////////////////
  const handleMaticClose = () => {
    setNeedsFunds!(false);
    console.log("closing dialog");
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  function handleErrorClose(): void {
    setShowError(false);
  }

  const handleLoadingClosed = () => {
    setIsLoading(false);
  };

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const isApproved = async () => {
    try {
      const txApprove = await honeyContract?.call("allowance", [address, AITEDS_POLYGON_CONTRACT]);
      console.log(txApprove);
      return txApprove;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
    }
  };


  const mint = async () => {
    try {
      setIsLoading(true);
      
      const pricePer = 2;
      const payableAmountPer = BigNumber.from(pricePer).mul(
        BigNumber.from(10).pow(18)
      );
      const payableAmount = BigNumber.from(counter).mul(payableAmountPer);
      
      const tx = await contract?.call(
        "mint",
        [BigNumber.from(counter), false],
        {
          value: payableAmount,
        }
      );
      console.log(tx);
      setIsLoading(false);
      return tx;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      setIsLoading(false);
      if (e.message.includes("Reason: user rejected transaction")) {
        alert("User denied transaction signature.");
      } else if (e.message.includes("Reason: Address is not whitelisted")) {
        return `You are not whitelisted to Mint ${COLLECTION_FOR_MINT}`;
      } else if (e.message.includes("Contract is paused")) {
        alert("Contract is paused");
        return;
      } else if (e.message.includes("ERC20: transfer amount exceeds balance")) {
        alert("Insufficient funds");
        return; 
      } else if (e.message.includes("ERC20: transfer amount exceeds allowance")) {
        alert("Insufficient funds");
        return;
      } else if (e.message.includes("Reason: ERC20: insufficient allowance")) {
        alert("You are not approved to spend this amount of MATIC");
        return;
      } else {
        alert("Something went wrong, please try again");
        return e.message;
      }
    }
  };

  const mintWithHoney = async () => {
    try {
      setIsLoading(true);
      const isApprovedString = await isApproved();
      console.log(isApprovedString.toString());
      if(isApprovedString.toString() === "0") {
        const pricePerHoney =  100000;
        const priceTotal = counter === 0 ? pricePerHoney : pricePerHoney * counter;
        const payableAmountPerHoney = BigNumber.from(priceTotal).mul(
          BigNumber.from(10).pow(18)
        );
        console.log("not approved");
        const txApprove = await honeyContract?.call("approve", [AITEDS_POLYGON_CONTRACT, payableAmountPerHoney]);
        console.log(txApprove);
      }
      
      const tx = await contract?.call(
        "mint",
        [BigNumber.from(counter), true],
        {
          value: 0,
        }
      );
      console.log(tx);
      setIsLoading(false);
      return tx;
    } catch (e: any) {
      console.log(e);
      console.log(e.message);
      setIsLoading(false);
      if (e.message.includes("Reason: user rejected transaction")) {
        alert("User denied transaction signature.");
      } else if (e.message.includes("Reason: Address is not whitelisted")) {
        return `You are not whitelisted to Mint ${COLLECTION_FOR_MINT}`;
      } else if (e.message.includes("Contract is paused")) {
        alert("Contract is paused");
        return;
      } else if (e.message.includes("ERC20: transfer amount exceeds balance")) {
        alert("Insufficient funds");
        return; 
      } else if (e.message.includes("ERC20: transfer amount exceeds allowance")) {
        alert("Insufficient funds");
        return;
      } else if (e.message.includes("Reason: ERC20: insufficient allowance")) {
        alert("You are not approved to spend this amount of HNY");
        return;
      } else {
        alert("Something went wrong, please try again");
        return e.message;
      }
    }
  };

  //////////////////// Function Calls End ////////////////////

  return (
    <Box
      className={
        isSmallScreen ? "inner-container-mint-mobile" : "inner-container-mint"
      }
    >
        {(isLoadingContract || isLoadingHoneyContract) && !showMismatch && <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginLeft: leftDrawerWidth,
          marginRight: rightDrawerWidth,
        }}
        open={isLoadingContract || isLoadingHoneyContract}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}

      <MaticDialog open={needsFunds} handleClose={handleMaticClose} />
      {!isSmallScreen && (
        <Box className="row-center">
          <h1 className="Large-Header">
            Mint <span className="accent-text">{COLLECTION_FOR_MINT}</span>
          </h1>
        </Box>
      )}
      <Box
        className="row-center"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        {DESCRIPTION_FOR_MINT()}
      </Box>
      <Box
        className="row-center"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Typography className="desc-text"><span className="accent-text">Cost:</span> 2 MATIC 
        or 100K HNY
        </Typography>
      </Box>

      <Box
        className="row-around"
        sx={{
          height: "auto",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Box className={isSmallScreen ? "column" : "row-even"}>
          <img
            src={aiTedMintLogo}
            alt="Teddy Placeholder"
            className={isSmallScreen ? "mint-image-mobile" : "mint-image"}
          />
          <Box className={isSmallScreen ? "col-mint-mobile" : "col-mint"}>
              <Box className="row-around">
                <ButtonGroup size="large" aria-label="small outlined button group">
                  <Button
                    disabled={!(counter > 0)}
                    onClick={() => handleDecrement()}
                  >
                    -
                  </Button>
                  <Button disabled>{counter}</Button>
                  <Button onClick={() => handleIncrement()}>+</Button>
                </ButtonGroup>
              </Box>
            
            <Box className={isSmallScreen ? "col-mint-mobile" : "row-around"}> 
              <Button
                className="mint-button"
                disabled={counter === 0}
                onClick={() => mint()}
                sx={{ marginTop: "10px", marginBottom: "10px"}}
              >
                Mint {counter} {COLLECTION_FOR_MINT}
              </Button>
              <Button
                className="mint-button"
                disabled={counter === 0}
                onClick={() => mintWithHoney()}
                sx={{
                  backgroundColor: "#FED100", 
                  marginTop: "10px", 
                  marginBottom: "10px",
                  color: "#000",
                  border: "1px solid #000",
                  "&:hover": {
                    backgroundColor: "green",
                    color: "FED100",
                    border: "1px solid #000",
                }}}
              >
                Mint {counter} {COLLECTION_FOR_MINT} with HNY
              </Button>
            </Box>
            </Box>
        </Box>
      </Box>
      <Box
        className={isSmallScreen ? "column" : "row-center"}
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Typography className="desc-text">
          <span className="accent-text">Note:</span> If you find any issues
          please open a support ticket in the{" "}
          <a href="https://discord.gg/fotf">
            <span className="underline">FOTF Discord.</span>
          </a>
        </Typography>
      </Box>

      <SuccessDialog
        open={success}
        setOpen={setSuccess}
        collection={COLLECTION_FOR_MINT}
        count={counter}
        successCode={2}
      />

      <LoadingDialog
        open={isLoading}
        onClose={handleLoadingClosed}
        collection={COLLECTION_FOR_MINT}
        collectionCount={counter}
        loadingCode={2}
      />

      <ErrorDialog
        open={showError}
        handleClose={handleErrorClose}
        errorCode={errorCode}
        collection={COLLECTION_FOR_MINT}
      />
    </Box>
    
  );
}

export default AITedMint;
