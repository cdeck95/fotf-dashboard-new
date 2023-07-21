import { Backdrop, Box, Button, ButtonGroup, CircularProgress, IconButton, InputBase, List, ListItem, ListItemText, Menu, MenuItem, Paper, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress, useNFT } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import ComingSoon from "./ComingSoon";
import MaticDialog from "../components/MaticDialog";
import { SetStateAction, useState } from "react";
import { PolygonProps } from "./Dashboard";
import aiTedMintLogo from "../assets/aiTedMint.png";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';


function TraitSwapTeds(props: PolygonProps) {
  useTitle("FOTF | Trait Swap Teds");
  const theme = useTheme();
  const isSmallScreen = props.isSmallScreen;
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress(); // Get connected wallet address

  const { leftNavOpen, rightNavOpen } = props;
  const { tokens, isLoadingTed, isLoadingTeddy, isLoadingAI, errorTed, errorTeddy, errorAI, maticBalance, needsFunds, setNeedsFunds, tedContract, isLoadingTedContract, teddyContract, isLoadingTeddyContract, aiTedContract, isLoadingAITedContract, honeyContract, isLoadingHoneyContract } = props.tokenProps;
  const showMismatch = props.showMismatch;

  const tedNFTs = tokens.Teds?.tokens;

  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  const leftDrawerWidth = isSmallScreen ? "0px" : "260px";
  const rightDrawerWidth = isSmallScreen ? "0px" : "340px";

  const [anchorElHeadgear, setAnchorElHeadgear] = useState<null | HTMLElement>(null);
  const [anchorElClothing, setAnchorElClothing] = useState<null | HTMLElement>(null);
  const [anchorElEquipment, setAnchorElEquipment] = useState<null | HTMLElement>(null);
  
  const [selectedHeadgearIndex, setSelectedHeadgearIndex] = useState(0);
  const [selectedClothingIndex, setSelectedClothingIndex] = useState(0);
  const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState(0);

  const HeadgearDropdownOpen = Boolean(anchorElHeadgear);
  const ClothingDropdownOpen = Boolean(anchorElClothing);
  const EquipmentDropdownOpen = Boolean(anchorElEquipment);

  const handleHeadgearClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElHeadgear(event.currentTarget);
  };

  const handleClothingClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElClothing(event.currentTarget);
  };

  const handleEquipmentClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElEquipment(event.currentTarget);
  };

  const handleHeadgearMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedHeadgearIndex(index);
    setAnchorElHeadgear(null);
  };

  const handleClothingMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedClothingIndex(index);
    setAnchorElClothing(null);
  };

  const handleEquipmentMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedEquipmentIndex(index);
    setAnchorElEquipment(null);
  };

  const handleClose = () => {
    setAnchorElHeadgear(null);
    setAnchorElClothing(null);
    setAnchorElEquipment(null);
  };
  
  const StyledBox = styled(Box)`
    border-radius: 10px;
    border-width: 10px;
    border-color: black;
    border-style: solid;
    color: black;
  `;
  const [activeHeadgearOptions, setActiveHeadgearOptions] = useState(['Loading...', 'Loading...']);
  // const [activeBackgroundImages, setActiveBackgroundImages] = useState([abstract,
  // plasma]);

  const [activeClothingOptions, setActiveClothingOptions] = useState(['Loading...',
  'Loading...']);
  // const [activeFurImages, setActiveFurImages] = useState([lavender,
  // mint]);

  const [activeEquipmentOptions, setActiveEquipmentOptions] = useState(['Loading...',
  'Loading...']);
  // const [activeMouthImages, setActiveMouthImages] = useState([mintySilverTongue,
  // snakeTongue]);

  let numbers: number[] = [];
  let optionsArray: string[] = [];
    
  const uniqueNumber = (maxNumbers: number, len:number) => {
    const number = Math.floor((Math.random() * len));
    //console.log("in unique numbers");
    if (!numbers.includes(number)) {
        numbers.push(number);
      // console.log("in push");
    } 
    if (numbers.length < maxNumbers) {
        uniqueNumber(maxNumbers, len);
        //console.log("in else");
    }
  }

  const [tedId, setTedId] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const {data: token, isLoading, error } = useNFT(tedContract, tedId);


  return (
      <Box
        className={
          isSmallScreen ? "inner-container-mint-mobile" : "inner-container-mint"
        }
      >
          {isLoadingTedContract && !showMismatch && <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            marginLeft: leftDrawerWidth,
            marginRight: rightDrawerWidth,
          }}
          open={isLoadingTedContract}
        >
          <CircularProgress color="inherit" />
        </Backdrop>}
  
        {!isSmallScreen && (
          <Box className={isSmallScreen ? "header-row-mobile" : "header-row"} sx={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start"}}>
            <Typography className={isSmallScreen ? "page-header-mobile" : "page-header"} sx={{ textAlign: "left"}} >
              Fury Ted Trait Swap
            </Typography>
            <Box className="row">
              <Box className="col" sx={{width: "65%"}}>
                <Typography className="desc-text" sx={{textAlign: "left", fontFamily: "Helvetica Neue", fontSize: "16px", fontWeight: "500"}}>Want to customize your Fury Ted NFT? You can use Trait Swap Tokens to
                customize the appearance of your Fury Ted at any time. Each trait change is ONE Token but you can make as many changes
                at once as you wish. When you submit your Trait Swap there will be a small gas charge for burning the TS Token and then 
                the metadata and images will be saved on the Blockchain. You can then view your new Fury Ted NFT in your wallet or on OpenSea.
                </Typography>
              </Box>
              <Box className="col" sx={{width: "35%"}}>
                <Box className={isSmallScreen? "ted-honey-claim-col": "ted-honey-claim-row"}>
                  <Box className="col" sx={{width: "100%", justifyContent: "space-evenly", padding: "10px"}}>
                    <Paper
                      component="form"
                      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%"}}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Enter Fury Ted ID"
                        inputProps={{ 'aria-label': 'Search for Ted Token ID' }}
                        onChange={handleSearch}
                        value={searchInput}
                      />
                      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <Button variant="contained" disabled={isLoadingTedContract} onClick={() => setTedId(parseInt(searchInput))} sx={{width: "100%", height: "100%", fontSize: "26px", letterSpacing: "2px", margin: 0}}>Search</Button>
                      </IconButton>
                    </Paper>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        
        <Box
          className="row-around"
          sx={{
            height: "auto",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <Box className={isSmallScreen ? "column" : "column"}>
            <img
              src={aiTedMintLogo}
              alt="Teddy Placeholder"
              className={isSmallScreen ? "mint-image-mobile" : "mint-image"}
            />
          </Box>
          <Box className="column">
            <Box className={isSmallScreen ? "row " : ""}>
                <List
                  component="nav"
                  aria-label="Device settings"
                  sx={{ maxWidth: "18vw" }}
                  className={isSmallScreen ? "dropdowns-full" : "dropdowns-first"}
                >
                  <h2 className="experience-headers">Headgear</h2>
                  <ListItem
                    button
                    id="headgear-button"
                    aria-haspopup="listbox"
                    aria-controls="headgear-menu"
                    aria-label="Headgear"
                    aria-expanded={HeadgearDropdownOpen ? 'true' : undefined}
                    onClick={handleHeadgearClickListItem}
                    sx={{ border: "solid",
                    borderRadius: "5px",
                    borderColor: "Black",
                  borderWidth:"2.5px" }}
                  >
                    <ListItemText
                      primary={activeHeadgearOptions[selectedHeadgearIndex]}
                      
                    />
                    <ArrowDropDownIcon>

                    </ArrowDropDownIcon>
                  </ListItem>
                </List>
                <Menu
                  id="headgear-menu"
                  anchorEl={anchorElHeadgear}
                  open={HeadgearDropdownOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'headgear-button',
                    role: 'listbox',
                  }}
                  sx={{ border: "solid",
                    borderRadius: "5px",
                    borderColor: "Black",
                  borderWidth:"2.5px",
                  "&& .Mui-selected": {
                  fontWeight: "600",
                  backgroundColor: "transparent",
                  minWidth: "125px"
                  }  }}
                  
                >
                  {activeHeadgearOptions.map((option, index) => (
                    <Box className="row">
                      {/* <Box className="dropdown-left">
                        <img src={activeHeadgearImages[index]}  className="menu-icon"/> 
                      </Box> */}
                    
                      {/* <Box className="dropdown-right"> */}
                        <MenuItem
                          key={option}
                          selected={index === selectedHeadgearIndex}
                          onClick={(event) => handleHeadgearMenuItemClick(event, index)}>
                          {option}
                        </MenuItem>
                      {/* </Box> */}
                    </Box>
                    
                  ))}
                </Menu>
            </Box>
            <Box className={isSmallScreen ? "row " : ""}>
                <List
                  component="nav"
                  aria-label="Device settings"
                  sx={{ maxWidth: "18vw" }}
                  className={isSmallScreen ? "dropdowns-full" : "dropdowns-first"}
                >
                  <h2 className="experience-headers">Clothing / Body Armour</h2>
                  <ListItem
                    button
                    id="clothing-button"
                    aria-haspopup="listbox"
                    aria-controls="clothing-menu"
                    aria-label="clothing"
                    aria-expanded={ClothingDropdownOpen ? 'true' : undefined}
                    onClick={handleClothingClickListItem}
                    sx={{ border: "solid",
                    borderRadius: "5px",
                    borderColor: "Black",
                  borderWidth:"2.5px" }}
                  >
                    <ListItemText
                      primary={activeClothingOptions[selectedClothingIndex]}
                      
                    />
                    <ArrowDropDownIcon>

                    </ArrowDropDownIcon>
                  </ListItem>
                </List>
                <Menu
                  id="clothing-menu"
                  anchorEl={anchorElClothing}
                  open={ClothingDropdownOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'clothing-button',
                    role: 'listbox',
                  }}
                  sx={{ border: "solid",
                    borderRadius: "5px",
                    borderColor: "Black",
                  borderWidth:"2.5px",
                  "&& .Mui-selected": {
                  fontWeight: "600",
                  backgroundColor: "transparent",
                  minWidth: "125px"
                  }  }}
                  
                >
                  {activeClothingOptions.map((option, index) => (
                    <Box className="row">
                      {/* <Box className="dropdown-left">
                        <img src={activeFurImages[index]}  className="menu-icon"/> 
                      </Box> */}
                    
                      {/* <Box className="dropdown-right"> */}
                        <MenuItem
                          key={option}
                          selected={index === selectedClothingIndex}
                          onClick={(event) => handleClothingMenuItemClick(event, index)}>
                          {option}
                        </MenuItem>
                      {/* </Box> */}
                    </Box>
                    
                  ))}
                </Menu>
            </Box>
            <Box className={isSmallScreen ? "row " : ""}>
                <List
                  component="nav"
                  aria-label="Device settings"
                  sx={{ maxWidth: "18vw" }}
                  className={isSmallScreen ? "dropdowns-full" : "dropdowns-first"}
                >
                  <h2 className="experience-headers">Equipment</h2>
                  <ListItem
                    button
                    id="mouth-button"
                    aria-haspopup="listbox"
                    aria-controls="mouth-menu"
                    aria-label="Background"
                    aria-expanded={EquipmentDropdownOpen ? 'true' : undefined}
                    onClick={handleEquipmentClickListItem}
                    sx={{ border: "solid",
                    borderRadius: "5px",
                    borderColor: "Black",
                  borderWidth:"2.5px" }}
                  >
                    <ListItemText
                      primary={activeEquipmentOptions[selectedEquipmentIndex]}
                      
                    />
                    <ArrowDropDownIcon>

                    </ArrowDropDownIcon>
                  </ListItem>
                </List>
                <Menu
                  id="equipment-menu"
                  anchorEl={anchorElEquipment}
                  open={EquipmentDropdownOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'qeuipment-button',
                    role: 'listbox',
                  }}
                  sx={{ border: "solid",
                    borderRadius: "5px",
                    borderColor: "Black",
                  borderWidth:"2.5px",
                  "&& .Mui-selected": {
                  fontWeight: "600",
                  backgroundColor: "transparent",
                  minWidth: "125px"
                  }  }}
                  
                >
                  {activeEquipmentOptions.map((option, index) => (
                    <Box className="row">
                      {/* <Box className="dropdown-left">
                        <img src={activeMouthImages[index]}  className="menu-icon"/> 
                      </Box> */}
                    
                      {/* <Box className="dropdown-right"> */}
                        <MenuItem
                          key={option}
                          selected={index === selectedEquipmentIndex}
                          onClick={(event) => handleEquipmentMenuItemClick(event, index)}>
                          {option}
                        </MenuItem>
                      {/* </Box> */}
                    </Box>
                    
                  ))}
                </Menu>
            </Box>
          </Box>
        </Box>
  
        {/* <SuccessDialog
          open={success}
          setOpen={setSuccess}
          collection={COLLECTION_FOR_MINT}
          count={counter}
          successCode={2}
        />
  
        <RevealDialog
          open={isReveal}
          setOpen={setIsReveal}
          mintedIds={mintedTokens}
          contract={contract!}
          collection={"AI Teds"}
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
        /> */}
      </Box>
      
    );
}

export default TraitSwapTeds;
