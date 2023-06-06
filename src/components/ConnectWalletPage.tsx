import { Backdrop, Box, Button, CircularProgress, Divider, IconButton, InputBase, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { SmartContract, ThirdwebNftMedia, useAddress, useNFT } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import accessDeniedImage from "../assets/access_denied_2.png";
import "../styles/TedHoneyClaims.css";
import { useState, SetStateAction } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { BaseContract } from "ethers";

interface ConnectWalletPageProps {
  tedContract: SmartContract<BaseContract> | undefined;
  isLoadingTedContract: boolean;
}


function ConnectWalletPage(props: ConnectWalletPageProps) {
  useTitle("FOTF | Connect Your Wallet");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const tedContract = props.tedContract;
  const isLoadingTedContract = props.isLoadingTedContract;

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const [tedId, setTedId] = useState(1);
  const [hasBonus, setHasBonus] = useState("TBD");
  const [honeyStored, setHoneyStored] = useState("TBD");
  const [totalLifetimeClaimed, setTotalLifetimeClaimed] = useState("TBD");

  const {data: token, isLoading, error } = useNFT(tedContract, tedId);

  const checkTedClaim = async () => {
    setTedId(parseInt(searchInput));
  }


  return (
    <Box className="inner-container" sx={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
      {/* <img
        src={accessDeniedImage}
        alt="access denied"
        className={isMobile ? "accessDeniedImage-mobile" : "accessDeniedImage"}
      /> */}
        {/* <h1 className={isMobile ? "comingSoon-Mobile" : "comingSoon"}>
          <span
            className={isMobile ? "comingSoonBlack-Mobile" : "comingSoonBlack"}
          >
            Connect Your
          </span>{" "}
          Wallet
        </h1> */}
         <Box>
          <h1 className={isMobile ? "comingSoon-Mobile" : "comingSoon"}>
            <span
              className={isMobile ? "comingSoonBlack-Mobile" : "comingSoonBlack"}
            >
              Connect Your 
            </span>{" "}
            Wallet
          </h1>
          <Typography sx={{justifyContent: "center", textAlign: "center", paddingLeft: "10px", paddingRight: "10px"}}>In order to use the app, you need to connect your wallet using the button in the top right. In the meantime, feel free to use the below section to check how much $HNY a Ted has without the need to connect your wallet. Great for research before buying on the open market! </Typography>
        </Box>
        <Box className="ted-honey-claim-row">
          <Box className="column-center" sx={{paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "10px"}}>
            <Typography sx={{fontSize: "24px", textAlign: "center"}}> Check if Ted has been Claimed </Typography>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
            >
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
            <Button variant="contained" onClick={checkTedClaim} sx={{width: "100%", fontSize: "26px", letterSpacing: "2px"}}>Check Ted Claim</Button>
            <Typography sx={{ fontSize: "16px", padding: "5px"}}>Please note: this claim checker is updated based on blockchain data from the Ted Rewards Contract. There might be slight delays or sync issues if an ID is checked at the same time is it claimed.</Typography>
          </Box>
          <Box className="column-center" sx={{paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "10px"}}>
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
                        maxHeight: "250px",
                        maxWidth: "250px",
                        borderRadius: "10px",
                        objectFit: "cover",
                        width: "250px",
                        height: "250px",
                      }}
                    />
                    <Box className="col" sx={{margin: "0px", justifyContent: "flex-start", marginLeft: "10px", marginRight: "10px", width: "100%"}}>
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
    </Box>
  );
}

export default ConnectWalletPage;
