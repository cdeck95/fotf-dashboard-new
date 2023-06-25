import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  ImageList,
  Menu,
  Popover,
  ThemeProvider,
  Typography,
  createTheme,
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
import "../styles/TheFactory.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  LoadETHAccountDetails,
  allOwnedNFTs,
} from "../account/loadETHAccountDetails";
import ConnectWalletPage from "../components/ConnectWalletPage";
import Sheet from "react-modal-sheet";
import { MainnetNetwork } from "../components/MainnetNetwork";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { TokenProps } from "../components/AssetOverviewSidebar";
import ErrorDialog from "../components/ErrorDialog";
import { PolygonProps } from "./Dashboard";
import TedClaims from "./TedClaims";
import ComingSoon from "./ComingSoon";
import { TED_POLYGON_CONTRACT, TEDDIES_POLYGON_CONTRACT, AITEDS_POLYGON_CONTRACT } from "../account/loadPolygonAccountDetails";
import IconMenu from "../components/IconMenu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SuccessDialog from "../components/SuccessDialog";
import LoadingDialog from "../components/LoadingDialog";
import RenameDialog from "../components/RenameDialog";
import PullToRefresh from "react-simple-pull-to-refresh";
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import tedMintLogo from "../assets/tedMint.png";
import teddyMintLogo from "../assets/teddyMint.gif";
import aiTedMintLogo from "../assets/aiTedMint.png";

const IS_DISABLED = false;
const FACTORY_CONTRACT_ADDRESS = "0xe851Fbe10b8B252D31Fe4C246C43584b02045346";

function TheFactory(props: PolygonProps) {
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
  // const [, switchNetwork] = useNetwork(); // Switch to desired chain
  // const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  // const [showMismatch, setShowMismatch] = useState(false);

  const {contract: theFactoryContract, isLoading: isLoadingFactoryContract } = useContract(FACTORY_CONTRACT_ADDRESS);
  console.log(theFactoryContract);
  console.log(isLoadingFactoryContract);

  const [isSheetOpen, setSheetOpen] = useState(false);
  console.log(`Mobile:  ${isMobile}`);
  console.log(`Small:  ${isSmall}`);
  console.log(`Medium:  ${isMedium}`);
  console.log(`Medium-Large:  ${isMediumLarge}`);
  console.log(`Large:  ${isLarge}`);
  console.log(`XL:  ${isXL}`);
  console.log(`Is 1920:  ${isFullScreen}`);

  const { leftNavOpen, rightNavOpen } = props;
  const { tokens, isLoadingTed, isLoadingTeddy, isLoadingAI, errorTed, errorTeddy, errorAI, maticBalance, needsFunds, tedContract, isLoadingTedContract, teddyContract, isLoadingTeddyContract, aiTedContract, isLoadingAITedContract, honeyContract, isLoadingHoneyContract } = props.tokenProps;
  const showMismatch = props.showMismatch;
  console.log(tokens);
  console.log(isLoadingTed);
  console.log(isLoadingTeddy);
  console.log(isLoadingAI);
  console.log(errorTed);
  console.log(errorTeddy);
  console.log(errorAI);
  console.log(maticBalance);
  console.log(needsFunds);

  const isLoading =
    isLoadingTed || isLoadingAI || isLoadingTeddy;

  const [isLoadingAWS, setIsLoadingAWS] = useState(false);
  const [successAWS, setSuccessAWS] = useState(false);

  const tedNFTs = tokens.Teds?.tokens;
  const teddyNFTs = tokens.Teddies?.tokens;
  const aiTedNFTs = tokens.AITeds?.tokens;

  const leftDrawerWidth = isSmallScreen ? "0px" : "260px";
  const rightDrawerWidth = isSmallScreen ? "0px" : "340px";

  const leftDrawerWidthWithPadding = isSmallScreen ? "0px" : "280px";
  const rightDrawerWidthWithPadding = isSmallScreen ? "0px" : "360px";

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
  const [selectedTokensIDs, setSelectedTokensIDs] = useState<number[]>([]);
  const [selectedTokenContracts, setSelectedTokenContracts] = useState<string[]>([]);
  const [is10Selected, setIs10Selected] = useState<boolean>(false);
  const [isOneOfEachSelected, setIsOneOfEachSelected] =
    useState<boolean>(false);
  const [burnRewards, setBurnRewards] = useState<string>("0");

  console.log(selectedTokensIDs);
  console.log(selectedTokenContracts);

  const tedBurnWorth = 125000;
  const teddyBurnWorth = 250000;
  const aiTedBurnWorth = 50000;

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
    handleCloseContextMenu();
    handleOnSelect(token);
  };

  const [renameFlag, setRenameFlag] = useState(false);
  const [newName, setNewName] = useState(""); // for rename dialog
  const handleRenameClose = () => {
    setRenameFlag(false);
    renameAWSCall(tokenClicked!);
  };

  const rename = (token: NFT) => {
    console.log("prompting user to rename...");
    handleCloseContextMenu();
    setRenameFlag(true);
  };
  

  const renameAWSCall = async (token: NFT) => {
    setIsLoadingAWS(true);
    console.log(`would rename ${token.metadata.name}`);
    var collection = "FuryTeds";
    if (token.metadata.uri.includes("Teddies")){
      collection = "Teddies";
    } else if (token.metadata.uri.includes("AITeds")){
      collection = "AITeds";
    }
    const requestJSON: IDictionary = {
      "collection": collection,
      "tokenID": token.metadata.id.toString(),
      "name": token.metadata.name!.toString(),
      "newName": newName
    };

    const json = JSON.stringify(requestJSON, null, 2);
    console.log(json);
    
    try {
      const response = await fetch(`https://h7ke8qc4ng.execute-api.us-east-1.amazonaws.com/Prod/renameTeds`, {
          method: 'POST',
          body: json
      })
      const responseStatus = await response.status;
      console.log(response.status);
      if (responseStatus !== 200) {
        setErrorCode(responseStatus);
        setShowError(true);
        setIsLoadingAWS(false);
        return;
      } else {
        setSuccessAWS(true);
        setIsLoadingAWS(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingAWS(false);
      setErrorCode(500);
      setShowError(true);
    }
    
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

        const splicedArrayIDs = [...selectedTokensIDs];
        splicedArrayIDs.splice(index, 1);
        console.log(splicedArrayIDs);
        setSelectedTokensIDs(splicedArrayIDs);

        const splicedArrayOfContracts = [...selectedTokenContracts];
        splicedArrayOfContracts.splice(index, 1);
        console.log(splicedArrayOfContracts);
        setSelectedTokenContracts(splicedArrayOfContracts);
      }
      // setSelectedTokens(selectedTokens);
      console.log("removed token, tokenID & contract");
      return;
    } else {
      if(tedNFTs?.includes(token)){
        setSelectedTokenContracts([...selectedTokenContracts, TED_POLYGON_CONTRACT]);
      } else if(teddyNFTs?.includes(token)){
        setSelectedTokenContracts([...selectedTokenContracts, TEDDIES_POLYGON_CONTRACT]);
      } else if(aiTedNFTs?.includes(token)){
        setSelectedTokenContracts([...selectedTokenContracts, AITEDS_POLYGON_CONTRACT]);
      } else {
        console.log("Selected token not found in owned arrays, aborting")
        setShowError(true);
        setErrorCode(9);
        return;
      }
      setSelectedTokensIDs([...selectedTokensIDs, parseInt(token.metadata.id!)])
      setSelectedTokens([...selectedTokens, token]);
      console.log("pushed token, token ID & contract");
    }
  }

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

    // if (isMismatched && (!isSmallScreen || (isSmallScreen && !rightNavOpen && !leftNavOpen))){
    //   setShowMismatch(true);
    // } else {
    //   setShowMismatch(false);
    // }
  }, [isMediumLarge, isMobile, isSmallScreen, leftNavOpen, rightNavOpen]);

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
    // const stakedTeddiesIDs = tokens.StakedTeddiesIDs?.tokens;

    if (!isLoading) {
      if (
        tedNFTs!.length > 0 &&
        (teddyNFTs!.length > 0) &&
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
  const [filteredNFTsWithCategory, setFilteredNFTsWithCategory] = useState<NFT[]>([]);

  const handleSearch = (e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleRefresh = async () => {
    window.location.reload();
  }  

  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>([]);

  useEffect(() => {
    const allOwnedNFTs: NFT[] = [];

    if(isAIFilter){
      aiTedNFTs?.forEach((nft) => {
        allOwnedNFTs.push(nft);
      }); 
    } else if(isTedFilter){
      tedNFTs?.forEach((nft) => {
        allOwnedNFTs.push(nft);
      });
    } else if(isTeddyFilter){
      teddyNFTs?.forEach((nft) => {
        allOwnedNFTs.push(nft);
      });
    } else {
      tedNFTs?.forEach((nft) => {
        allOwnedNFTs.push(nft);
      });
      teddyNFTs?.forEach((nft) => {
        allOwnedNFTs.push(nft);
      });
      aiTedNFTs?.forEach((nft) => {
        allOwnedNFTs.push(nft);
      }); 
    }
    setFilteredNFTs(allOwnedNFTs?.filter((e) => e.metadata.id!.includes(searchInput)));
  }, [aiTedNFTs, isAIFilter, isTeddyFilter, isTedFilter, searchInput, teddyNFTs, tedNFTs]);
  
  console.log(filteredNFTs);

  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  const handleErrorClose = () => {
    setShowError(false);
  };

  useEffect(() => {
    if(!isLoadingFactoryContract && !isLoadingHoneyContract && !isLoadingAITedContract && !isLoadingTeddyContract && !isLoadingTedContract && address) {
      checkIfApproved();
    }
  }, [address, isLoading, isLoadingAITedContract, isLoadingFactoryContract, isLoadingHoneyContract, isLoadingTedContract, isLoadingTeddyContract]);


  const [isApprovedTed, setIsApprovedTed] = useState(false);
  const [isApprovedTeddy, setIsApprovedTeddy] = useState(false);
  const [isApprovedAITed, setIsApprovedAITed] = useState(false);
  const [isApprovedHoney, setIsApprovedHoney] = useState(false);
  const [honeyApprovalAmount, setHoneyApprovalAmount] = useState(BigNumber.from(0));

  const checkIfApproved = async () => {
    try {
      const isApprovedTed = await tedContract?.erc721.isApproved(address!, FACTORY_CONTRACT_ADDRESS);
      const isApprovedTeddy = await teddyContract?.erc721.isApproved(address!, FACTORY_CONTRACT_ADDRESS);
      const isApprovedAITed = await aiTedContract?.erc721.isApproved(address!, FACTORY_CONTRACT_ADDRESS);
      const isApprovedHoney = await honeyContract?.call("allowance", [address, FACTORY_CONTRACT_ADDRESS]);
      
      console.log(isApprovedTed);
      console.log(isApprovedTeddy);
      console.log(isApprovedAITed);
      console.log(isApprovedHoney);

      setIsApprovedTed(isApprovedTed!);
      setIsApprovedTeddy(isApprovedTeddy!);
      setIsApprovedAITed(isApprovedAITed!);
      setHoneyApprovalAmount(isApprovedHoney!);
      if(parseInt(isApprovedHoney?.toString()) > 0){
        setIsApprovedHoney(isApprovedHoney!);
      } else {
        setIsApprovedHoney(false);
      }
    } catch (error) {
        console.log(error);
      }
  } 

  const [isLoadingApprovals, setIsLoadingApprovals] = useState(false);
  const [isLoadingBurn, setIsLoadingBurn] = useState(false);

  const askForApprovals = async (honeyAmountToSend: BigNumber) => {
    try {
      if(!isApprovedTed){
        setIsLoadingApprovals(true);
        setIsApprovedTed(false);
        var data = await tedContract?.erc721.setApprovalForAll(FACTORY_CONTRACT_ADDRESS, true);
        console.log(data);
        setIsLoadingApprovals(false);
      }
      if(!isApprovedTeddy){
        setIsLoadingApprovals(true);
        setIsApprovedTeddy(false);
        var dataTeddy = await teddyContract?.erc721.setApprovalForAll(FACTORY_CONTRACT_ADDRESS, true);
        console.log(dataTeddy);
        setIsLoadingApprovals(false);
      }
      if(!isApprovedAITed){
        setIsLoadingApprovals(true);
        setIsApprovedAITed(false);
        var dataAI = await aiTedContract?.erc721.setApprovalForAll(FACTORY_CONTRACT_ADDRESS, true);
        console.log(dataAI);
        setIsLoadingApprovals(false);
      }
      if(!isApprovedHoney){
        setIsLoadingApprovals(true);
        setIsApprovedHoney(false);
        if(honeyAmountToSend.toString() === "0") {
          console.log("just burning, not sending honey... skipping approval for honey");
        } else {
          const payableAmountPerHoney = BigNumber.from(honeyAmountToSend).mul(
            BigNumber.from(10).pow(18)
          );
          const dataHoney = await honeyContract?.call("approve", [FACTORY_CONTRACT_ADDRESS, payableAmountPerHoney]);
          console.log(dataHoney);
          setIsLoadingApprovals(false);
        } 
      }
      setIsLoadingApprovals(false);
      return true;
    } catch (error) {
      console.log(error);
      setIsLoadingApprovals(false);
      setShowError(true);
      setErrorCode(10);
      return false;
    }
  }

  async function burn(selectedTokens: NFT[]) {
    console.log("burn for hny clicked");
    if(IS_DISABLED) {
      setShowError(true);
      setErrorCode(4);
      return;
    }  
    const isApproved = await askForApprovals(BigNumber.from(0));
    console.log(isApproved);
    if(isApproved){
      console.log("approved");
      setIsLoadingBurn(true);
      console.log(selectedTokenContracts);
      console.log(selectedTokensIDs);
      try {
        // const startTx = await theFactoryContract?.call("startTheFactory", [selectedTokenContracts, selectedTokensIDs]);
        // console.log(startTx);
        const burnTx = await theFactoryContract?.call("incinerate", [selectedTokenContracts, selectedTokensIDs]);
        console.log(burnTx);
        setIsLoadingBurn(false);
        setSelectedTokenContracts([]);
        setSelectedTokensIDs([]);
        setSelectedTokens([]);
      } catch (error) {
        setShowError(true);
        setErrorCode(11);
        console.log(error);
        setIsLoadingBurn(false);
      }
    } else {
      console.log("not approved, error");
      setShowError(true);
      setErrorCode(10);
    }
  }

  function burnForOneOfOne(selectedTokens: NFT[]) {
    console.log("burn 1 of 1 clicked");
    if(IS_DISABLED) {
      setShowError(true);
      setErrorCode(4);
      return;
    }
  }

  const [tokenClicked, setTokenClicked] = useState<NFT>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openContextMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseContextMenu = () => {
    setAnchorEl(null);
  };
  
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const [anchorElPopover, setAnchorElPopover] = useState<HTMLButtonElement | null>(null);

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("filter button clicked");
    setAnchorElPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorElPopover(null);
  };

  const openPopover = Boolean(anchorElPopover);
  const idPopover = openPopover ? 'simple-popover' : undefined;


  const sidebarBackgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--sidebar-background-color");

  const themeMenu = createTheme({
    typography: {
      fontFamily: ["Bebas Neue", "Roboto", "Helvetica", "Arial"].join(","),
      fontSize: 16,
      fontWeightLight: 300,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            padding: "0px",
            margin: "0px"
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: "0px",
            margin: "0px",
          },
        },
      }
    },
  });

  //////////////////////////////////////////////

  return (
    <Box
      className={
        isSmallScreen
          ? "factory-inner-container-mobile"
          : "factory-inner-container"
      } sx={{zIndex: "1 !important", position: "relative"}}
    >
{/* 
  {isLoading && <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginLeft: leftDrawerWidth,
          marginRight: rightDrawerWidth,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
} */}

{isLoading && !showMismatch && <Backdrop
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
}

{!ownershipVerified && !isLoading && !showMismatch && <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginLeft: leftDrawerWidth,
          marginRight: rightDrawerWidth,
        }}
        open={!ownershipVerified && !isLoading}
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
}

      <ErrorDialog
        open={showError}
        handleClose={handleErrorClose}
        errorCode={errorCode}
        collection={"The Factory"}
      />

        <Box className={isSmallScreen ? "header-mobile" : "header"}>
          <Box className={isSmallScreen ? "header-row-mobile" : "header-row"}>
            {!isSmallScreen && <h3 className={isSmallScreen ? "page-header-mobile" : "page-header"} >
              The Factory
            </h3> }
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleClickPopover}>
                <FilterListOutlinedIcon/>
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for Ted, Teddy or AI Token ID"
                inputProps={{ 'aria-label': 'Search for Ted, Teddy or AI Token ID' }}
                onChange={handleSearch}
                value={searchInput}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
             <Popover
            id={idPopover}
            open={openPopover}
            anchorEl={anchorElPopover}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box className={isSmallScreen ? "filter-row-mobile" : "filter-row"}>
            <Chip           
              variant="outlined"
              label="Fury Teds"
              className={
                isTedFilter ? "filter-button-selected" : "filter-button"
              }
              disabled={!address}
              avatar={<Avatar alt="FuryTeds" src={tedMintLogo} />}
              onClick={() => setFilter("Ted")}
            />
            <Chip           
              variant="outlined"
              label="Teddy by FOTF"
              className={
                isTeddyFilter ? "filter-button-selected" : "filter-button"
              }
              disabled={!address}
              avatar={<Avatar alt="Teddy by FOTF" src={teddyMintLogo} />}
              onClick={() => setFilter("Teddy")}
            />
            <Chip           
              variant="outlined"
              label="AI Teds"
              className={
                isAIFilter ? "filter-button-selected" : "filter-button"
              }
              disabled={!address}
              avatar={<Avatar alt="FuryTeds" src={aiTedMintLogo} />}
              onClick={() => setFilter("AI")}
            />
          </Box>
          </Popover>
          </Box>
         
          
        </Box>
      <Box sx={{
              overflowY: "auto !important"
            }}>
        {errorAI && errorTed && errorTeddy ? (
          <div>
            <p>NFT not found - error</p>
          </div>
        ) : (
          <Box
            className="gallery"
            sx={{
              // zIndex: "0 !important",
              paddingLeft: "10px",
              paddingBottom: "110px",
              backgroundColor: "white",
              paddingRight: "10px",
              overflowX: "hidden",
              overflowY: "auto"
            }}
          >
            {tokens ? (
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
                className="factory-image-list"
                cols={columns}
                gap={25}
                rowHeight={450}
              >
                
                {/* {filteredNFTsWithCategory.map((token: NFT) => ( */}
                  {filteredNFTs.map((token: NFT) => (
                  <Box
                    key={token.metadata.name}
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
                        {tedNFTs?.includes(token) && (
                          <Chip label="Fury Teds" color="primary" sx={{maxWidth: "125px"}} variant="outlined"/>
                        )}

                        {teddyNFTs?.includes(token) && (
                          <Chip label="Teddies by FOTF" color="secondary" sx={{maxWidth: "125px"}} variant="outlined"/>
                        )}

                        {aiTedNFTs?.includes(token) && (
                          <Chip label="AI Teds" color="success" sx={{maxWidth: "125px"}} variant="outlined"/>
                        )}
                        
                        {/* <h4 className="metadata">
                          Last Transfer: 03/11/2023
                        </h4> */}
                      </div>
                      <div className="small-right-column" onClick={() => {
                        if(anchorEl === null){
                          setTokenClicked(token)
                        }
                      }}>
                        {/* <ControlPointIcon
                          onClick={() => add(token)}
                          fontSize="small"
                        /> */}
                        <Button
                            id="basic-button"
                            aria-controls={openContextMenu ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openContextMenu ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{background: "none", color: "black", border: "none", minWidth: "0px", padding: "0px", "&:hover": {background: "none", color: "black", minWidth: "0px", padding: "0px"}}}
                          >
                            <MoreVertIcon/>
                          </Button>
                          <ThemeProvider theme={themeMenu} >
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openContextMenu}
                            onClose={handleCloseContextMenu}
                            sx={{ zIndex: "10001"}}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            <IconMenu token={tokenClicked!} onClose={handleCloseContextMenu} addToBurnList={() => add(tokenClicked!)} selectedTokens={selectedTokens} renameTed={() => rename(tokenClicked!)} />
                          </Menu>
                          </ThemeProvider>
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
      
      {address && !isSmallScreen && !isLarge && (
      <Box
        sx={{
          position: "fixed",
          paddingLeft: "20px",
          bottom: "0px",
          left: leftDrawerWidth,
          right: rightDrawerWidth,
          height: "70px",
          zIndex: (theme: { zIndex: { drawer: number } }) =>
            theme.zIndex.drawer - 1,
          backgroundColor: "#FED100",
        }}
      >
        <Box className="row-space-between">
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
            <Button className="burn-btn" disabled={!isOneOfEachSelected} onClick={() => burnForOneOfOne(selectedTokens)}>
              Burn {selectedTokens.length} +{" "}
              {(15000000 - parseInt(burnRewards)).toLocaleString()} $HNY for
              Custom 1/1
            </Button>
          </Box>
        </Box>
      </Box>
        )}
        {(isSmallScreen || isLarge) && (
      <Box
        sx={{
          position: "fixed",
          paddingLeft: "20px",
          paddingRight: "20px",
          marginLeft: leftDrawerWidth,
          marginRight: rightDrawerWidth,
          bottom: "0px",
          left: "0px",
          height: "70px",
          width: "100dvw",
          backgroundColor: "#FED100",
          // zIndex: "1",
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
      </Box>

      <SuccessDialog
        open={successAWS}
        setOpen={setSuccessAWS}
        successCode={4}
      />

    {renameFlag && <RenameDialog
        open={renameFlag}
        setOpen={setRenameFlag}
        onClose={handleRenameClose}
        currentName={tokenClicked!.metadata.name!.toString()}
        setNewName={setNewName}
      />}

      <LoadingDialog
        open={isLoadingAWS}
        loadingCode={3}
        onClose={() => setIsLoadingAWS(false)}
      />

    <LoadingDialog
        open={isLoadingApprovals}
        loadingCode={4}
        onClose={() => setIsLoadingApprovals(false)}
      />

<LoadingDialog
        open={isLoadingBurn}
        loadingCode={5}
        onClose={() => setIsLoadingBurn(false)}
      />


      <ErrorDialog
        open={showError}
        handleClose={handleErrorClose}
        errorCode={errorCode}
      />

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
              <Button className="burn-btn-mobile " disabled={!isOneOfEachSelected} onClick={() => burnForOneOfOne(selectedTokens)}>
                Burn {selectedTokens.length} +{" "}
                {(15000000 - parseInt(burnRewards)).toLocaleString()} $HNY for
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
