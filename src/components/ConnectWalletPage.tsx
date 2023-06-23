import { Backdrop, Box, Button, CircularProgress, Divider, IconButton, InputBase, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { SmartContract, ThirdwebNftMedia, useAddress, useNFT } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import accessDeniedImage from "../assets/access_denied_2.png";
import "../styles/TedHoneyClaims.css";
import { useState, SetStateAction, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { BaseContract } from "ethers";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import aiTedMintLogo from "../assets/aiTedMint.png";
import tedMintLogo from "../assets/tedMint.png"
import teddyMintLogo from "../assets/teddyMint.gif"



interface ConnectWalletPageProps {
  tedContract: SmartContract<BaseContract> | undefined;
  teddyContract: SmartContract<BaseContract> | undefined;
  isLoadingTedContract: boolean;
  isLoadingTeddyContract: boolean;
}


function ConnectWalletPage(props: ConnectWalletPageProps) {
  useTitle("FOTF | Connect Your Wallet");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const tedContract = props.tedContract;
  const isLoadingTedContract = props.isLoadingTedContract;
  const teddyContract = props.teddyContract;
  const isLoadingTeddyContract = props.isLoadingTeddyContract;

  const [searchInput, setSearchInput] = useState("");
  const [searchInputTeddy, setSearchInputTeddy] = useState("");


  const handleSearch = (e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSearchTeddy = (e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSearchInputTeddy(e.target.value);
  };

  const [tedId, setTedId] = useState(1);
  const [teddyId, setTeddyId] = useState(1);

  const [hasBonus, setHasBonus] = useState("TBD");
  const [honeyStored, setHoneyStored] = useState("TBD");
  const [totalLifetimeClaimed, setTotalLifetimeClaimed] = useState("TBD");
  const [isSmallScreen, setSmallScreen] = useState(false);
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const isLarge = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isXL = useMediaQuery(theme.breakpoints.up("xl"));
  const isFullScreen = useMediaQuery(theme.breakpoints.up(1800));
  const [showTeddies, setShowTeddies] = useState(false);
  const {data: token, isLoading, error } = useNFT(showTeddies ? teddyContract : tedContract, showTeddies ? teddyId : tedId);

  

  const checkTedClaim = async () => {
    setTedId(parseInt(searchInput));
  }

  const checkTeddyClaim = async () => {
    setTeddyId(parseInt(searchInputTeddy));
  }

  useEffect(() => {
    if (isMediumLarge || isMobile) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }

    // if (isMismatched && (!isSmallScreen || (isSmallScreen && !rightNavOpen && !leftNavOpen))){
    //   setShowMismatch(true);
    // } else {
    //   setShowMismatch(false);
    // }
  }, [isMediumLarge, isMobile, isSmallScreen]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if(newValue === 0){
      setShowTeddies(false);
    } else {
      setShowTeddies(true);
    }
  };


  return (
    <Box className={isSmallScreen? "inner-container-mobile" : "inner-container"}>
         <Box className="col" >
          <span className={isMobile ? "comingSoon-Mobile" : "comingSoon"}>
            <span
              className={isMobile ? "comingSoonBlack-Mobile" : "comingSoonBlack"}
            >
            Connect Your 
            </span>
            Wallet
          </span>
          <Typography sx={{justifyContent: "center", textAlign: "center", 
          paddingLeft: "10px", paddingRight: "10px", fontFamily: "Roboto, sans-serif", 
          fontSize: isSmallScreen? "1rem" : "1.5rem"}}>In the meantime, feel free to use the below section to check how much $HNY a Ted has without the need to connect your wallet. Great for research before buying on the open market! </Typography>
        </Box>
        <Divider sx={{width: "85%", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}/>
        <Box className="row">
          <Tabs 
            value={value}
            onChange={handleChange}
            >
              <Tab icon={<img src={tedMintLogo} className="tabs-image" />} label="Fury Teds" />
              <Tab icon={<img src={teddyMintLogo} className="tabs-image"/>} label="Teddies by FOTF" />
            </Tabs>
        </Box>
        {!showTeddies && 
          <Box className={isSmallScreen? "ted-honey-claim-col": "ted-honey-claim-row"}>
            <Box className={isSmallScreen? "row" : "column-center"} sx={{paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "10px"}}>
              <Box className="col" sx={{width: "100%", justifyContent: "space-evenly"}}>
                <Typography sx={{fontSize: "24px", textAlign: "center"}}> Check if Ted has been Claimed </Typography>
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", marginTop: "10px"}}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for Ted Token ID"
                    inputProps={{ 'aria-label': 'Search for Ted Token ID' }}
                    onChange={handleSearch}
                    value={searchInput}
                  />
                  <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <Button variant="contained" disabled={isLoadingTedContract} onClick={checkTedClaim} sx={{width: "100%", fontSize: "26px", letterSpacing: "2px", marginTop: "10px"}}>Check Ted Claim</Button>
                <Typography sx={{ marginTop: "10px", fontSize: "16px", padding: "5px"}}>Please note: this claim checker is updated based on blockchain data from the Ted Rewards Contract. There might be slight delays or sync issues if an ID is checked at the same time is it claimed.
                </Typography>
              </Box>
            </Box>
            <Box className={isSmallScreen? "row" : "column-center"} sx={{paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "10px"}}>
              {isLoadingTedContract 
              ? <Box sx={{width: "100%", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", minWidth: "200px"}}>
                  <Typography sx={{marginRight: "10px"}}> Loading Contract... </Typography>
                  <CircularProgress color="inherit" size="20px" />
                </Box>
              : <Box sx={{width: "100%", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", minWidth: "200px"}}>
                {isLoading 
                ? <Box sx={{width: "100%", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", minWidth: "200px"}}>
                    <Typography sx={{marginRight: "10px"}}> Loading Token... </Typography>
                    <CircularProgress color="inherit" size="20px" />
                  </Box>
                : <Box className="row" sx={{ backgroundColor: "#000", borderRadius: "10px", color: "#fff", padding: "0px", justifyContent: "space-between"}}>
                    <ThirdwebNftMedia
                        metadata={token!.metadata}
                        style={{
                          maxHeight: isSmallScreen? "150px" : "250px",
                          maxWidth: isSmallScreen? "150px" : "250px",
                          borderRadius: "10px",
                          objectFit: "cover",
                          width: isSmallScreen? "150px" : "250px",
                          height: isSmallScreen? "150px" : "250px",
                        }}
                      />
                      <Box className="col" sx={{margin: "0px", justifyContent: "flex-start", marginLeft: "10px", marginRight: "10px", width: "100%", padding: "0px", }}>
                        Token: {token!.metadata.name}
                        <Divider sx={{marginTop: "10px", marginBottom: "10px"}}/>
                        Has Bonus: {hasBonus}
                        <Divider sx={{marginTop: "10px", marginBottom: "10px"}}/>
                        $HNY Stored: {honeyStored}
                        <Divider sx={{marginTop: "10px", marginBottom: "10px"}}/>
                        Total Lifetime Claimed: {totalLifetimeClaimed}
                      </Box>
                    </Box>
                    }
                  
                  </Box>
              }
            </Box>
          </Box>
        }
        {showTeddies && 
          <Box className={isSmallScreen? "ted-honey-claim-col": "ted-honey-claim-row"}>
            <Box className={isSmallScreen? "row" : "column-center"} sx={{paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "10px"}}>
              <Box className="col" sx={{width: "100%", justifyContent: "space-evenly"}}>
                <Typography sx={{fontSize: "24px", textAlign: "center"}}> Check if Teddy has been Claimed </Typography>
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", marginTop: "10px"}}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for Teddy Token ID"
                    inputProps={{ 'aria-label': 'Search for Teddy Token ID' }}
                    onChange={handleSearchTeddy}
                    value={searchInputTeddy}
                  />
                  <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <Button variant="contained" disabled={isLoadingTeddyContract} onClick={checkTeddyClaim} sx={{width: "100%", fontSize: "26px", letterSpacing: "2px", marginTop: "10px"}}>Check Teddy Claim</Button>
                <Typography sx={{ marginTop: "10px", fontSize: "16px", padding: "5px"}}>Please note: this claim checker is updated based on blockchain data from the Teddy Rewards Contract. There might be slight delays or sync issues if an ID is checked at the same time is it claimed.
                </Typography>
              </Box>
            </Box>
            <Box className={isSmallScreen? "row" : "column-center"} sx={{paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "10px"}}>
              {isLoadingTeddyContract
              ? <Box sx={{width: "100%", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", minWidth: "200px"}}>
                  <Typography sx={{marginRight: "10px"}}> Loading Contract... </Typography>
                  <CircularProgress color="inherit" size="20px" />
                </Box>
              : <Box sx={{width: "100%", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", minWidth: "200px"}}>
                {isLoading 
                ? <Box sx={{width: "100%", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", minWidth: "200px"}}>
                    <Typography sx={{marginRight: "10px"}}> Loading Token... </Typography>
                    <CircularProgress color="inherit" size="20px" />
                  </Box>
                : <Box className="row" sx={{ backgroundColor: "#000", borderRadius: "10px", color: "#fff", padding: "0px", justifyContent: "space-between"}}>
                    <ThirdwebNftMedia
                        metadata={token!.metadata}
                        style={{
                          maxHeight: isSmallScreen? "150px" : "250px",
                          maxWidth: isSmallScreen? "150px" : "250px",
                          borderRadius: "10px",
                          objectFit: "cover",
                          width: isSmallScreen? "150px" : "250px",
                          height: isSmallScreen? "150px" : "250px",
                        }}
                      />
                      <Box className="col" sx={{margin: "0px", justifyContent: "flex-start", marginLeft: "10px", marginRight: "10px", width: "100%", padding: "0px", }}>
                        Token: {token!.metadata.name}
                        <Divider sx={{marginTop: "10px", marginBottom: "10px"}}/>
                        Has Bonus: {hasBonus}
                        <Divider sx={{marginTop: "10px", marginBottom: "10px"}}/>
                        $HNY Stored: {honeyStored}
                        <Divider sx={{marginTop: "10px", marginBottom: "10px"}}/>
                        Total Lifetime Claimed: {totalLifetimeClaimed}
                      </Box>
                    </Box>
                    }
                  
                  </Box>
              }
            </Box>
          </Box>
        }
        <Divider sx={{width: "85%", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}/>
    </Box>
  );
}

export default ConnectWalletPage;
