import { Box, Button, ImageList, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  ConnectWallet,
  ThirdwebNftMedia,
  useContract,
  useNFT,
  useNetwork,
  useNetworkMismatch,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSDK } from "@thirdweb-dev/react";
import teddyABI from "../ABIs/teddyABI.json";
import tedABI from "../ABIs/tedABI.json";
import stakingABI from "../ABIs/stakingABI.json";
import honeyABI from "../ABIs/honeyABI.json";
import aiABI from "../ABIs/aiABI.json";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, BigNumber, ethers } from "ethers";
import { NumericFormat } from "react-number-format";
import NFTList from "../components/NFTList";
import "../styles/Dashboard.css";
import {
  LoadAllAccountDetails,
  allOwnedNFTs,
} from "../account/loadAllAccountDetails";
import ConnectWalletPage from "../components/ConnectWalletPage";
import Sheet from 'react-modal-sheet';
import { LoadStakedTeddy } from "../account/loadStakedTeddy";
import { MainnetNetwork } from "../components/MainnetNetwork";

interface TheFactoryProps {
  allOwnedNFTs: allOwnedNFTs;
}

function TheFactory(props: TheFactoryProps) {
  useTitle("FOTF | The Factory");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress(); // Get connected wallet address
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  const [isSheetOpen, setSheetOpen] = useState(false);

  // const { tokens, isLoading, error, honeyBalance } = LoadAllAccountDetails();
  // const allOwnedNFTs = props.allOwnedNFTs;
  const { tokens, isLoading, error, honeyBalance } = LoadAllAccountDetails();
  // const {tokens, isLoading, error, honeyBalance } = allOwnedNFTs;
  console.log(tokens);
  console.log(isLoading);
  console.log(error);
  console.log(honeyBalance);

  const AllTokens = tokens.AllTokens.tokens;
  const tedNFTs = tokens.Teds?.tokens;
  const teddyNFTs = tokens.Teddies?.tokens;
  const aiTedNFTs = tokens.AITeds?.tokens;
  const stakedTeddiesIDs = tokens.StakedTeddiesIDs?.tokens;

  // stakedTeddiesIDs.forEach((tokenID: string) => {
  //   console.log(tokenID);
  //   const stakedTeddy = LoadStakedTeddy(tokenID);
  //   console.log(stakedTeddy);
  //   teddyNFTs?.push(stakedTeddy!);
  //   AllTokens.push    
  // });

   const leftDrawerWidth = isSmallScreen ? "0px" : "240px";
  const rightDrawerWidth = isSmallScreen ? "0px" : "340px";

  const [isActiveFilter, setIsActiveFilter] = useState(false);
  const [isTransferredFilter, setIsTransferredFilter] = useState(false);
  const [isLongestHeldFilter, setIsLongestHeldFilter] = useState(false);

  const [selectedTeds, setSelectedTeds] = useState<any>([]);
  const [selectedTeddies, setSelectedTeddies] = useState<any>([]);
  const [selectedAITeds, setSelectedAITeds] = useState<any>([]);

  const [ownershipVerified, setOwnershipVerified] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const setFilter = (filterIn: string) => {
    switch (filterIn) {
      case "Active":
        setIsActiveFilter(!isActiveFilter);
        setIsTransferredFilter(false);
        setIsLongestHeldFilter(false);
        break;
      case "Recent":
        setIsActiveFilter(false);
        setIsTransferredFilter(!isTransferredFilter);
        setIsLongestHeldFilter(false);
        break;
      case "Held":
        setIsActiveFilter(false);
        setIsTransferredFilter(false);
        setIsLongestHeldFilter(!isLongestHeldFilter);
        break;
      default:
        setIsActiveFilter(false);
        setIsTransferredFilter(false);
        setIsLongestHeldFilter(false);
        break;
    }
  };

  useEffect(() => {
    if (isMediumLarge || isMobile) {
      setSmallScreen(true);
      setSheetOpen(true);
    } else {
      setSmallScreen(false);
      setSheetOpen(false);
    }
  }, [isMediumLarge, isMobile]);

  useEffect(() => {
    const tedNFTs = tokens.Teds?.tokens;
    const teddyNFTs = tokens.Teddies?.tokens;
    const aiTedNFTs = tokens.AITeds?.tokens;
    const stakedTeddiesIDs = tokens.StakedTeddiesIDs?.tokens;

    if (tedNFTs?.length === 0 || aiTedNFTs?.length === 0){
      if (teddyNFTs?.length === 0 && stakedTeddiesIDs?.length === 0){
        setOwnershipVerified(false);
      } else { 
        setOwnershipVerified(true);
      }
    } else {
      setOwnershipVerified(true);
    }
  }, [tokens]);

  //////////// Header ///////////////////////////

  interface IDictionary {
    [index: string]: string;
  }

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  try {
    if (searchInput.length > 0) {
      if (searchInput.match("[0-9]+")) {
        AllTokens.filter((token: NFT) => {
          console.log(token.metadata.id.match(searchInput));
          return token.metadata.id.match(searchInput);
        });
      } else {
        //filter on attributes
      }
    }
  } catch (error) {
    console.log(error);
    setSearchInput("");
  }

  //////////////////////////////////////////////

  return (
    <Box className="factory-inner-container">
      {isMismatched && (<MainnetNetwork/>)}
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isMismatched}
          >
            {/* <CircularProgress color="inherit" /> */}
          </Backdrop>

          
      {address && (
        <Box className={isSmallScreen ? "header-mobile" : "header"}>
          
          <Box className={isSmallScreen ? "header-row-mobile" : "header-row"}>
            <h3
              className={isSmallScreen ? "page-header-mobile" : "page-header"}
            >
              The Factory
            </h3>
            <input
              type="text"
              className="factory-search"
              placeholder="Search for Ted, Teddy or AI Token ID"
              onChange={handleSearch}
              value={searchInput}
            />
          </Box>
          <Box className={isSmallScreen ? "filter-row-mobile" : "filter-row"}>
            <Button
              disabled={!address}
              className={
                isActiveFilter ? "filter-button-selected" : "filter-button"
              }
              onClick={() => setFilter("Active")}
            >
              Active NFTs
            </Button>
            <Button
              disabled={!address}
              className={
                isTransferredFilter ? "filter-button-selected" : "filter-button"
              }
              onClick={() => setFilter("Recent")}
            >
              Newest
            </Button>
            <Button
              disabled={!address}
              className={
                isLongestHeldFilter ? "filter-button-selected" : "filter-button"
              }
              onClick={() => setFilter("Held")}
            >
              Longest Held
            </Button>
          </Box>
        </Box>
      )}
      {address ? (
        <div>
          {error ? (
            <div>
              <p>NFT not found - error</p>
            </div>
          ) : (
            <Box
              className="gallery"
              sx={{
                zIndex: "0",
                paddingLeft: "10px",
                paddingBottom: "75px",
                backgroundColor: "white",
                paddingRight: "10px",
              }}
            >
              {tokens ? (
                <NFTList tokens={AllTokens} searchText={searchInput} stakedIDs={stakedTeddiesIDs!}/>
              ) : (
                <p>Loading...</p>
              )}
            </Box>
          )}

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!ownershipVerified}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        <ConnectWalletPage />
      )}
      {address && !isSmallScreen && (
        <Box
          sx={{
            position: "fixed",
            paddingLeft: "20px",
            paddingRight: "20px",
            bottom: "0px",
            height: "70px",
            width: "100%",
            backgroundColor: "#FED100",
          }}
        >
          <Box className="row-no-center">
            <Box
              className="selected-box"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Box className="stats-col">
                <p className="stats">
                  {new Intl.NumberFormat("en-US", {
                    minimumIntegerDigits: 2,
                  }).format(selectedTeds?.length)}
                </p>
                <p className="stats-name"> Fury Teds</p>
              </Box>
              <Box className="stats-col">
                <p className="stats">
                  {new Intl.NumberFormat("en-US", {
                    minimumIntegerDigits: 2,
                  }).format(selectedTeddies?.length)}
                </p>
                <p className="stats-name"> Teddy by FOTF</p>
              </Box>
              <Box className="stats-col">
                <p className="stats">
                  {new Intl.NumberFormat("en-US", {
                    minimumIntegerDigits: 2,
                  }).format(selectedAITeds?.length)}
                </p>
                <p className="stats-name">
                  {" "}
                  AI
                  <br /> Teds
                </p>
              </Box>
            </Box>
            {/* <NumericFormat value={honeyBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' HNY'} /> */}
            <Box
              className="burn-box"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Button className="burn-btn">Burn for $HNY</Button>
              <Button className="burn-btn">
                Burn 10 + 500k $HNY for Custom 1/1
              </Button>
            </Box>
          </Box>
        </Box>
      )}

    {isSmallScreen && !isSheetOpen && (
      <Box
        sx={{
          position: "fixed",
          paddingLeft: "20px",
          paddingRight: "20px",
          bottom: "0px",
          height: "70px",
          width: "100%",
          backgroundColor: "#FED100",
        }}
        onClick={() => setSheetOpen(true)}
      >
        <Typography className="factory-sheet-text">View Selected</Typography>
      </Box>
    )}

    <Sheet 
      rootId="root"
      isOpen={isSheetOpen}
      onClose={() => setSheetOpen(false)}
      detent="content-height">
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
          <Box
              className="selected-box"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Box className="stats-col">
                <p className="stats">
                  {new Intl.NumberFormat("en-US", {
                    minimumIntegerDigits: 2,
                  }).format(selectedTeds?.length)}
                </p>
                <p className="stats-name"> Fury Teds</p>
              </Box>
              <Box className="stats-col">
                <p className="stats">
                  {new Intl.NumberFormat("en-US", {
                    minimumIntegerDigits: 2,
                  }).format(selectedTeddies?.length)}
                </p>
                <p className="stats-name"> Teddy by FOTF</p>
              </Box>
              <Box className="stats-col">
                <p className="stats">
                  {new Intl.NumberFormat("en-US", {
                    minimumIntegerDigits: 2,
                  }).format(selectedAITeds?.length)}
                </p>
                <p className="stats-name">
                  {" "}
                  AI
                  <br /> Teds
                </p>
              </Box>
            </Box>
            {/* <NumericFormat value={honeyBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' HNY'} /> */}
            <Box
              className="burn-box"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Button className="burn-btn">Burn for $HNY</Button>
              <Button className="burn-btn">
                Burn 10 + 500k $HNY for Custom 1/1
              </Button>
            </Box>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </Box>
  );
}

export default TheFactory;
