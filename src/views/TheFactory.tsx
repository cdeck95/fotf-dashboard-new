import {  Box, ImageList, useMediaQuery, useTheme } from "@mui/material";
import { ConnectWallet, ThirdwebNftMedia, useContract, useNFT, useOwnedNFTs } from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import teddyABI from "../ABIs/teddyABI.json";
import tedABI from "../ABIs/tedABI.json";
import stakingABI from "../ABIs/stakingABI.json";
import honeyABI from "../ABIs/honeyABI.json";
import aiABI from "../ABIs/aiABI.json";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract, BigNumber, ethers } from "ethers";
import { NumericFormat } from 'react-number-format';
import NFTList from "../components/NFTList";
import "../styles/Dashboard.css";
import { LoadAllAccountDetails, allOwnedNFTs } from "../account/loadAllAccountDetails";

interface TheFactoryProps {
  allOwnedNFTs: allOwnedNFTs;
}

function TheFactory(props: TheFactoryProps) {
  useTitle("FOTF | The Factory");
  // const { tokens, isLoading, error, honeyBalance } = LoadAllAccountDetails();
  const allOwnedNFTs = props.allOwnedNFTs;
  const {tokens, isLoading, error, honeyBalance } = allOwnedNFTs;
  console.log(tokens);
  console.log(isLoading);
  console.log(error);
  console.log(honeyBalance);

  const AllTokens = tokens.AllTokens.tokens;
  const tedNFTs = tokens.Teds.tokens;
  const teddyNFTs = tokens.Teddies.tokens;
  const aiTedNFTs = tokens.AITeds.tokens;

  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isLarge = !useMediaQuery(theme.breakpoints.up("lg"));
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();


  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  

  //////////// Header ///////////////////////////

  interface IDictionary {
    [index:string]: string;
  }

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: { preventDefault: () => void; target: { value: SetStateAction<string>; }; }) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  
  try {
    if (searchInput.length > 0) {
    if(searchInput.match("[0-9]+")) {
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
      <Box className={isMobile? "header-mobile" : "header"}>
        <Box className={isMobile? "header-row-mobile" : "header-row"}>
          <h3 className={isMobile? "page-header-mobile" : "page-header"}>The Factory</h3>
          <input
            type="text"
            className="factory-search"
            placeholder="Search for Ted, Teddy or AI Token ID"
            onChange={handleSearch}
            value={searchInput} />
        </Box>
      </Box>
      {address
      ? <div>
          { error ? <div><p>NFT not found - error</p></div> 
          : <Box className="gallery" sx={{ zIndex: "0", paddingLeft: "10px", paddingBottom: "75px", backgroundColor: "white", paddingRight: "10px" }}>
              {allOwnedNFTs
              ? <NFTList tokens={AllTokens} searchText={searchInput} />
              : <p>Loading...</p> }
             </Box>
            }

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        </div>
      : <div><p>Connect your wallet</p> </div> 
      }
      <Box sx={{width: "100%", position: "fixed", bottom: "0px", left: "0px", height: "70px", backgroundColor: "#FED100"}}>
        <p className="stats">Not working yet</p>
        <div className="row">
          <NumericFormat value={honeyBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' HNY'} />
          <p className="stats">{tedNFTs?.length} Fury Teds</p>
          <p className="stats">{teddyNFTs?.length} Teddys</p>
          {/* <p className="stats">{stakedTeddies?.length} Staked Teddys</p> */}
          <p className="stats">{aiTedNFTs?.length} AI Teds</p>
        </div>
      </Box>
    </Box>  
  );
}

export default TheFactory;