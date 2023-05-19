import {
  Box,
  Button,
  ImageList,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  LoadAllAccountDetails,
  allOwnedNFTs,
} from "../account/loadAllAccountDetails";
import ConnectWalletPage from "../components/ConnectWalletPage";
import Sheet from "react-modal-sheet";
import { LoadStakedTeddy } from "../account/loadStakedTeddy";
import { MainnetNetwork } from "../components/MainnetNetwork";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { TokenProps } from "../components/AssetOverviewSidebar";
import ErrorDialog from "../components/ErrorDialog";

// interface TheFactoryProps {
//   allOwnedNFTs: allOwnedNFTs;
//   leftNavOpen: boolean;
//   rightNavOpen: boolean;
// }

function TheFactory(props: TokenProps) {
  useTitle("FOTF | The Factory");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const isLarge = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isXL = useMediaQuery(theme.breakpoints.up("xl"));
  const isFullScreen = useMediaQuery(theme.breakpoints.up(1800));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress(); // Get connected wallet address
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [showMismatch, setShowMismatch] = useState(false);
  console.log(`Mobile:  ${isMobile}`);
  console.log(`Small:  ${isSmall}`);
  console.log(`Medium:  ${isMedium}`);
  console.log(`Medium-Large:  ${isMediumLarge}`);
  console.log(`Large:  ${isLarge}`);
  console.log(`XL:  ${isXL}`);
  console.log(`Is 1920:  ${isFullScreen}`);

  const isDisabled = true;

  // const { tokens, isLoading, error, honeyBalance } = LoadAllAccountDetails();
  // const allOwnedNFTs = props.allOwnedNFTs;
  const {
    tokens,
    isLoadingTed,
    isLoadingAI,
    isLoadingBirthCerts,
    isLoadingOneOfOne,
    isLoadingStaked,
    isLoadingTeddy,
    error,
    honeyBalance,
    leftNavOpen,
    rightNavOpen
  } = props;
  // const {tokens, isLoading, error, honeyBalance } = allOwnedNFTs;
  console.log(tokens);
  console.log(isLoadingTed);
  console.log(error);
  console.log(honeyBalance);

  const isLoading =
    isLoadingTed || isLoadingAI || isLoadingStaked || isLoadingTeddy;

  const AllTokens = tokens.AllTokens.tokens;
  const tedNFTs = tokens.Teds?.tokens;
  const teddyNFTs = tokens.Teddies?.tokens;
  const aiTedNFTs = tokens.AITeds?.tokens;
  const stakedTeddiesIDs = tokens.StakedTeddiesIDs?.tokens;

  const [columns, setColumns] = useState(3);

  useEffect(() => {
    if (isMobile) {
      if (isSmall) {
        setColumns(1);
      } else {
        setColumns(2);
      }
    } else {
      if (isSmall) {
        setColumns(1);
      } else if (isMedium) {
        setColumns(1);
      } else if (isMediumLarge) {
        setColumns(2);
      } else if (isLarge) {
        setColumns(2);
      } else if (isXL && !isFullScreen) {
        setColumns(3);
      } else if (isFullScreen) {
        setColumns(4);
      } else {
        setColumns(3);
      }
    }
  }, [isMobile, isSmall, isMedium, isMediumLarge, isLarge, isXL, isFullScreen]);

  const add = (token: NFT) => {
    console.log("adding...");
    handleOnSelect(token);
  };

  const star = () => {
    console.log("staring...");
  };

  function handleOnSelect(token: NFT) {
    if (selectedTokens?.includes(token)) {
      const index = selectedTokens?.indexOf(token);
      if (index !== undefined) {
        const splicedArray = [...selectedTokens];
        splicedArray.splice(index, 1);
        console.log(splicedArray);
        setSelectedTokens(splicedArray);
      }
      // setSelectedTokens(selectedTokens);
      console.log("removed token");
      console.log(selectedTokens);
      return;
    } else {
      setSelectedTokens([...selectedTokens, token]);
      //setSelectedTokens(selectedTokens);
      console.log("pushed token");
      console.log(selectedTokens);
    }
  }

  // stakedTeddiesIDs.forEach((tokenID: string) => {
  //   console.log(tokenID);
  //   const stakedTeddy = LoadStakedTeddy(tokenID);
  //   console.log(stakedTeddy);
  //   teddyNFTs?.push(stakedTeddy!);
  //   AllTokens.push
  // });

  const leftDrawerWidth = isSmallScreen ? "0px" : "260px";
  const rightDrawerWidth = isSmallScreen ? "0px" : "340px";

  const [isActiveFilter, setIsActiveFilter] = useState(false);
  const [isTransferredFilter, setIsTransferredFilter] = useState(false);
  const [isLongestHeldFilter, setIsLongestHeldFilter] = useState(false);

  const [isTedFilter, setIsTedFilter] = useState(false);
  const [isTeddyFilter, setIsTeddyFilter] = useState(false);
  const [isAIFilter, setIsAIFilter] = useState(false);

  const [selectedTeds, setSelectedTeds] = useState<any>([]);
  const [selectedTeddies, setSelectedTeddies] = useState<any>([]);
  const [selectedAITeds, setSelectedAITeds] = useState<any>([]);

  const [ownershipVerified, setOwnershipVerified] = useState(true);
  const [selectedTokens, setSelectedTokens] = useState<NFT[]>([]);
  const [is10Selected, setIs10Selected] = useState<boolean>(false);
  const [isOneOfEachSelected, setIsOneOfEachSelected] =
    useState<boolean>(false);
  const [burnRewards, setBurnRewards] = useState<string>("0");

  const tedBurnWorth = 5000;
  const teddyBurnWorth = 6500;
  const aiTedBurnWorth = 50000;

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
      case "Ted":
        setIsTedFilter(!isTedFilter);
        setIsTeddyFilter(false);
        setIsAIFilter(false);
        break;
      case "Teddy":
        setIsTedFilter(false);
        setIsTeddyFilter(!isTeddyFilter);
        setIsAIFilter(false);
        break;
      case "AI":
        setIsTedFilter(false);
        setIsTeddyFilter(false);
        setIsAIFilter(!isAIFilter);
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

    if (isMismatched && (!isSmallScreen || (isSmallScreen && !rightNavOpen && !leftNavOpen))){
      setShowMismatch(true);
    } else {
      setShowMismatch(false);
    }
  }, [isMediumLarge, isMismatched, isMobile, isSmallScreen, leftNavOpen, rightNavOpen]);

  useEffect(() => {
    if (selectedTokens.length >= 10) {
      setIs10Selected(true);
    } else {
      setIs10Selected(false);
    }
    var tedCount = 0;
    var teddyCount = 0;
    var aiTedCount = 0;

    const selectedTedArray: NFT[] = [];
    const selectedTeddyArray: NFT[] = [];
    const selectedAITedArray: NFT[] = [];

    selectedTokens.forEach((token: NFT) => {
      if (teddyNFTs?.includes(token)) {
        teddyCount += 1;
        selectedTeddyArray.push(token);
      } else if (aiTedNFTs?.includes(token)) {
        aiTedCount += 1;
        selectedAITedArray.push(token);
      } else if (tedNFTs?.includes(token)) {
        tedCount += 1;
        selectedTedArray.push(token);
      }
    });

    setSelectedAITeds(selectedAITedArray);
    setSelectedTeddies(selectedTeddyArray);
    setSelectedTeds(selectedTedArray);

    if (tedCount > 0 && teddyCount > 0 && aiTedCount > 0) {
      setIsOneOfEachSelected(true);
    } else {
      setIsOneOfEachSelected(false);
    }

    const burnValue =
      tedCount * tedBurnWorth +
      teddyCount * teddyBurnWorth +
      aiTedCount * aiTedBurnWorth;
    setBurnRewards(burnValue.toString());
  }, [aiTedNFTs, selectedTokens, tedNFTs, teddyNFTs]);

  useEffect(() => {
    const tedNFTs = tokens.Teds?.tokens;
    const teddyNFTs = tokens.Teddies?.tokens;
    const aiTedNFTs = tokens.AITeds?.tokens;
    const stakedTeddiesIDs = tokens.StakedTeddiesIDs?.tokens;

    if (!isLoading) {
      if (
        tedNFTs!.length > 0 &&
        (teddyNFTs!.length > 0 || stakedTeddiesIDs!.length > 0) &&
        aiTedNFTs!.length > 0
      ) {
        setOwnershipVerified(true);
      } else {
        setOwnershipVerified(false);
      }
    }
  }, [isLoading, tokens]);

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

  // const filteredNFTs = AllTokens?.filter((e) =>
  //   e.metadata.id!.includes(searchInput)
  // );
  // console.log(filteredNFTs);

  const [filteredNFTsWithCategory, setFilteredNFTsWithCategory] = useState<NFT[]>([]);

  useEffect(() => {
    if(isAIFilter || isTeddyFilter || isTedFilter) {
      if(isAIFilter) {
        setFilteredNFTsWithCategory(aiTedNFTs!.filter((e) =>
        e.metadata.id!.includes(searchInput)
      ));
      } else if (isTeddyFilter) {
        setFilteredNFTsWithCategory(teddyNFTs!.filter((e) =>
        e.metadata.id!.includes(searchInput)
      ));
      } else if (isTedFilter) {
        setFilteredNFTsWithCategory(tedNFTs!.filter((e) =>
        e.metadata.id!.includes(searchInput)
      ));
      } else {
        setFilteredNFTsWithCategory(AllTokens?.filter((e) =>
        e.metadata.id!.includes(searchInput)
      ));
      }
    } else {
      setFilteredNFTsWithCategory(AllTokens?.filter((e) =>
      e.metadata.id!.includes(searchInput)
    ));
    }
  }, [isAIFilter, isTeddyFilter, isTedFilter, aiTedNFTs, searchInput, teddyNFTs, tedNFTs, AllTokens]);

  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  const handleErrorClose = () => {
    setShowError(false);
  };


  function burn(selectedTokens: NFT[]) {
    console.log("burn for hny clicked");
    if(isDisabled) {
      setShowError(true);
      setErrorCode(4);
      return;
    }  
  }

  function burnForOneOfOne(selectedTokens: NFT[]) {
    console.log("burn 1 of 1 clicked");
    if(isDisabled) {
      setShowError(true);
      setErrorCode(4);
      return;
    }
  }

  //////////////////////////////////////////////

  return (
    <Box
      className={
        isSmallScreen
          ? "factory-inner-container-mobile"
          : "factory-inner-container"
      }
    >
      {/* {showMismatch &&  */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showMismatch}
      >
        <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={showMismatch}
        >
        <MainnetNetwork />
        </Backdrop>
      </Backdrop>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginLeft: leftDrawerWidth,
          marginRight: rightDrawerWidth,
        }}
        open={isLoading && !showMismatch}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginLeft: leftDrawerWidth,
          marginRight: rightDrawerWidth,
        }}
        open={!ownershipVerified && !isLoading && !isMismatched}
        onClick={handleClose}
      >
        <Box sx={{ borderRadius: "10px", backgroundColor: "white" }}>
          <Typography sx={{ padding: "20px", color: "Black" }}>
            You do not own all the required NFTs to access this page.
          </Typography>
          <Typography sx={{ padding: "20px", color: "Black" }}>
            Please visit the Dashboard to view your NFTs.
          </Typography>
        </Box>
      </Backdrop>

      <ErrorDialog
        open={showError}
        handleClose={handleErrorClose}
        errorCode={errorCode}
        collection={"The Factory"}
      />

      {/* <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginLeft: leftDrawerWidth,
          marginRight: rightDrawerWidth,
        }}
        open={isDisabled}
        onClick={handleClose}
      >
        <Box sx={{ borderRadius: "10px", backgroundColor: "white" }}>
          <Typography sx={{ padding: "20px", color: "Black" }}>
            The Factory is currently disabled.
          </Typography>
          <Typography sx={{ padding: "20px", color: "Black" }}>
            Please come back later.
          </Typography>
        </Box>
      </Backdrop> */}
      {address && (
        <Box className={isSmallScreen ? "header-mobile" : "header"}>
          <Box className={isSmallScreen ? "header-row-mobile" : "header-row"}>
            {!isSmallScreen && <h3 className={isSmallScreen ? "page-header-mobile" : "page-header"} >
              The Factory
            </h3> }
            <input
              type="text"
              className={
                isSmallScreen ? "factory-search-mobile" : "factory-search"
              }
              placeholder="Search for Ted, Teddy or AI Token ID"
              onChange={handleSearch}
              value={searchInput}
            />
          </Box>
          <Box className={isSmallScreen ? "filter-row-mobile" : "filter-row"}>
            <Button
              disabled={!address}
              className={
                isTedFilter ? "filter-button-selected" : "filter-button"
              }
              onClick={() => setFilter("Ted")}
            >
              Fury Teds
            </Button>
            <Button
              disabled={!address}
              className={
                isTeddyFilter ? "filter-button-selected" : "filter-button"
              }
              onClick={() => setFilter("Teddy")}
            >
              Teddy by FOTF
            </Button>
            <Button
              disabled={!address}
              className={
                isAIFilter ? "filter-button-selected" : "filter-button"
              }
              onClick={() => setFilter("AI")}
            >
              AI Teds
            </Button>
          </Box>
          {/* <Box className={isSmallScreen ? "filter-row-mobile" : "filter-row"}>
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
          </Box> */}
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
                paddingBottom: "110px",
                backgroundColor: "white",
                paddingRight: "10px",
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              {tokens ? (
                // <NFTList tokens={AllTokens} searchText={searchInput} stakedIDs={stakedTeddiesIDs!} selectedTokens={selectedTokens} setSelectedTokens={setSelectedTokens} />
                <ImageList
                  sx={{
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    overflowX: "hidden",
                    overflowY: "auto",
                    backgroundColor: "white",
                  }}
                  cols={columns}
                  gap={25}
                  rowHeight={450}
                >
                  {filteredNFTsWithCategory.map((token: NFT) => (
                    <Box
                      key={token.metadata.id}
                      className={
                        selectedTokens?.includes(token)
                          ? "card-selected"
                          : "card"
                      }
                      sx={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        background: "none",
                        maxHeight: "375px",
                        maxWidth: "350px",
                      }}
                    >
                      {/* <StarBorderIcon
                      onClick={star}
                      sx={{ position: "absolute", top: "10px", right: "10px" }}
                    /> */}
                      <Box
                        sx={{
                          position: "relative",
                          cursor: "pointer",
                        }}
                        onClick={() => add(token)}
                      >
                        <ThirdwebNftMedia
                          metadata={token.metadata}
                          style={{
                            maxHeight: "280px",
                            maxWidth: "280px",
                            borderRadius: "10px",
                            objectFit: "cover",
                            width: "280px",
                            height: "280px",
                          }}
                        />

                        {selectedTokens?.includes(token) && (
                          <p className="title-selected">Burn</p>
                        )}
                      </Box>
                      <Box
                        className="column-container"
                        sx={{ marginBottom: "10px" }}
                      >
                        <div className="large-left-column">
                          <h3 className="metadata-title">
                            {token.metadata.name}
                          </h3>
                          <h4 className="metadata">
                            Last Transfer: 03/11/2023
                          </h4>
                        </div>
                        <div className="small-right-column">
                          <ControlPointIcon
                            onClick={() => add(token)}
                            fontSize="small"
                          />
                        </div>
                      </Box>
                    </Box>
                  ))}
                </ImageList>
              ) : (
                <p>Loading...</p>
              )}
            </Box>
          )}
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
              <Button className="burn-btn" disabled={selectedTokens.length === 0} onClick={() => burn(selectedTokens)}>
                Burn {selectedTokens.length} for{" "}
                {parseInt(burnRewards).toLocaleString()} $HNY
              </Button>
              <Button className="burn-btn" disabled={!is10Selected || !isOneOfEachSelected} onClick={() => burnForOneOfOne(selectedTokens)}>
                Burn {selectedTokens.length} +{" "}
                {(1000000 - parseInt(burnRewards)).toLocaleString()} $HNY for
                Custom 1/1
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {isSmallScreen && (
        <Box
          sx={{
            position: "fixed",
            paddingLeft: "20px",
            paddingRight: "20px",
            bottom: "0px",
            height: "70px",
            width: "100%",
            backgroundColor: "#FED100",
            zIndex: "1",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            border: "2px solid black",
          }}
          onClick={() => setSheetOpen(true)}
        >
          <Typography className="factory-sheet-text">
            {selectedTokens.length === 1
              ? `Ready to Burn ${selectedTokens.length} token?`
              : `Ready to Burn ${selectedTokens.length} tokens?`
            }
          </Typography>
          <ExpandMoreOutlinedIcon/>
        </Box>
      )}

      <Sheet
        rootId="root"
        isOpen={isSheetOpen && !showMismatch && ownershipVerified && (!isSmallScreen || (isSmallScreen && !rightNavOpen && !leftNavOpen) )}
        onClose={() => setSheetOpen(false)}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header/>
          <Sheet.Content>
            <Box
              className="selected-box-mobile"
              sx={{ display: "flex", flexDirection: "row" }}>
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
            <Box className="burn-box-mobile">
              <Button
                className="burn-btn-mobile "
                disabled={selectedTokens.length === 0}
                onClick={() => burn(selectedTokens)}
              >
                Burn {selectedTokens.length} for{" "}
                {parseInt(burnRewards).toLocaleString()} $HNY
              </Button>
              <Button className="burn-btn-mobile " disabled={!is10Selected || !isOneOfEachSelected} onClick={() => burnForOneOfOne(selectedTokens)}>
                Burn {selectedTokens.length} +{" "}
                {(1000000 - parseInt(burnRewards)).toLocaleString()} $HNY for
                Custom 1/1
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
