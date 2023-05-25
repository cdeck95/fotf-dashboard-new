import { Backdrop, Box, Button, ButtonGroup, CircularProgress, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { SmartContract, ThirdwebNftMedia, useAddress, useClaimedNFTSupply, useContract, useContractMetadata, useUnclaimedNFTSupply } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import ComingSoon from "./ComingSoon";
import { AITEDS_POLYGON_CONTRACT, TEDDIES_POLYGON_CONTRACT, TED_POLYGON_CONTRACT } from "../account/loadPolygonAccountDetails";
import { useEffect, useState } from "react";
import BridgeSuccessDialog from "../components/BridgeSuccessDialog";
import ErrorDialog from "../components/ErrorDialog";
import LoadingDialog from "../components/LoadingDialog";
import MaticDialog from "../components/MaticDialog";
import { PolygonNetwork } from "../components/PolygonNetwork";
import teddyPlaceholderImage from "../assets/teddyLogoForPlaceholders.png"
import "../styles/mint.css";
import SuccessDialog from "../components/SuccessDialog";
import { BaseContract, BigNumber } from "ethers";
import tedMintLogo from "../assets/tedMint.png"

const COLLECTION_FOR_MINT = "Fury Teds";
const DESCRIPTION_FOR_MINT = () => {
  return <Typography className="desc-text">Who says a teddy bear can’t be bad ass? Fury Teds have moved to Polygon and have been reimagined. 
  <br></br>Earn Honey, burn for extra honey, or just complete your collection now.</Typography>
} 

export interface MintProps {
  showMismatch: boolean;
  contract: SmartContract<BaseContract> | undefined;
  isloadingContract: boolean;
}

function TedMint(props: MintProps) {
    useTitle("Mint Fury Teds - 5 MATIC");
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

    const contract = props.contract;
    const isLoadingContract = props.isloadingContract;

    // const {contract: tedPolygonContract, isLoading: isLoadingContract, error } = useContract(TED_POLYGON_CONTRACT);
    // console.log(tedPolygonContract);

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [needsFunds, setNeedsFunds] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorCode, setErrorCode] = useState(0);
    const [counter, setCounter] = useState(0);
    const [open, setOpen] = useState(false);
    

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
        if(counter > 0) {
            setCounter(counter - 1);
        }
    };  

    const mint = async () => {
        try {
            const payableAmountPer = BigNumber.from(5).mul(BigNumber.from(10).pow(18));
            const payableAmount = BigNumber.from(counter).mul(payableAmountPer);
            //const payableAmount = counter * payableAmountPer;
            const tx = await contract?.call(
            "mint", [BigNumber.from(counter)],
            {
              value: payableAmount
            });
            console.log(tx);
            return tx;
        } catch (e: any) {
            console.log(e);
            console.log(e.message);
            if (e.message.includes("Reason: user rejected transaction")){
              return "User denied transaction signature.";
            } else if (e.message.includes("Reason: Address is not whitelisted")){
              return `You are not whitelisted to Mint ${COLLECTION_FOR_MINT}`;
            } else {
              alert("Something went wrong, please try again");
              return e.message;
            } 
        }};

//////////////////// Function Calls End ////////////////////


return (
  <Box
    className={isSmallScreen
        ? "inner-container-mint-mobile"
        : "inner-container-mint"
    }
  >
    {isLoadingContract && !showMismatch && <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginLeft: leftDrawerWidth,
          marginRight: rightDrawerWidth,
        }}
        open={isLoadingContract}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
    <MaticDialog
      open={needsFunds}
      handleClose={handleMaticClose}
    />
    {!isSmallScreen && <Box className="row-center">
      <h1 className="Large-Header">Mint <span className="accent-text">{COLLECTION_FOR_MINT}</span></h1>
    </Box>}
    <Box
      className="row-center"
      sx={{ paddingTop: "10px", paddingBottom: "10px" }}
    >
      {DESCRIPTION_FOR_MINT()}
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
          <img src={tedMintLogo} alt="Teddy Placeholder" className={isSmallScreen ? "mint-image-mobile" : "mint-image"} />
          <Box className={isSmallScreen ? "col-mint-mobile" : "col-mint"}>
              <ButtonGroup size="large" aria-label="small outlined button group">
                  <Button disabled={!(counter > 0)} onClick={() => handleDecrement()}>-</Button>
                  <Button disabled>{counter}</Button>
                  <Button onClick={() => handleIncrement()}>+</Button>
              </ButtonGroup>
              <Button className="mint-button" disabled={counter===0} onClick={() => mint()}>
                  Mint {counter} {COLLECTION_FOR_MINT}
              </Button>
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
      successCode={1}
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

export default TedMint;
