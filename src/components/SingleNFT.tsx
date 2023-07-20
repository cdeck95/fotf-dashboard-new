import { useTheme, Box, Button, Menu, ThemeProvider, createTheme } from "@mui/material";
import { ThirdwebNftMedia, useNFT } from "@thirdweb-dev/react";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";
import { rename } from "fs";
import { useNavigate } from "react-router-dom";
import IconMenu from "./IconMenu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import ShareMenu from "./ShareMenu";

export interface SingleNFTProps {
    tokenID: string;
    contract: SmartContract<BaseContract>;
    collection: string;
}

function SingleNFT(props: SingleNFTProps) {
    const id = props.tokenID;
    console.log(id);
    const contract = props.contract;
    console.log(contract);
    const collection = props.collection;
    console.log(collection);

    const navigate = useNavigate();
    const theme = useTheme();
  
    const { data: nft, isLoading, error } = useNFT(contract, id);
  
    console.log(nft);
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openContextMenu = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      console.log("clicked")
    };
    const handleCloseContextMenu = () => {
      setAnchorEl(null);
    };
  
    return (
    
    <Box
        sx={{
          // position: "relative",
          // cursor: "pointer",
        }}
      >
        {isLoading
            ? <Box>Loading...</Box>
            : 
            <Box>
                {error
                ? <Box>Error</Box>
                : <Box>
                    <ThirdwebNftMedia
                  metadata={nft!.metadata}
                  style={{
                      // maxHeight: "200px",
                      // maxWidth: "200px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      width: "200px",
                      height: "200px",
                  }} 
                  />
                  <Button
                    id="basic-button"
                    aria-controls={openContextMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openContextMenu ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{position: "absolute", top: "5px", right: "5px", background: "none", color: "black", border: "none", minWidth: "0px", padding: "0px", "&:hover": {background: "none", color: "black", minWidth: "0px", padding: "0px"}}}
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
                      <ShareMenu token={nft!} onClose={handleCloseContextMenu} collection={collection}/>
                    </Menu>
                  </ThemeProvider>
                  </Box>  
                }
            </Box>
            
        }
    </Box>
  )
}

export default SingleNFT;

