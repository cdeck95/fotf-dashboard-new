import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, ImageList, ImageListItem, ThemeProvider, createTheme } from '@mui/material';
import { SmartContract } from '@thirdweb-dev/sdk';
import { BaseContract } from 'ethers';
import SingleNFT from './SingleNFT';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import '../styles/RevealDialog.css';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface RevealDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mintedIds: string[];
  contract: SmartContract<BaseContract>;
  collection: string;
}

function RevealDialog(props: RevealDialogProps) {
  const { open, setOpen, mintedIds, contract, collection } = props

  //const testIDs = ["307", "308", "1"]

  const handleClose = () => {
    setOpen(false);
  };

  const hashtags = ["FOTF", "FOTFFAM", "FOTF4LYF"];

  
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
  const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
  const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");

  const theme = createTheme({
    typography: {
      fontFamily: ["Bebas Neue", "Roboto", "Helvetica", "Arial"].join(","),
      fontSize: 16,
      fontWeightLight: 300,
    },
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: sidebarBackgroundColor,
            overflow: "unset",
            borderRadius:"20px",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: sidebarBackgroundColor,
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
            // overflowX: "hidden",
            // overflowY: "hidden",
            // "&:hover": {
            //   overflowY: "auto",
            // },
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        },
      },
    },
  });

  const nftText = mintedIds.length > 1 ? "NFTs" : "NFT";

  const getPrice = (collection: string) => {
    switch(collection){
      case "Fury Teds":
        return "5";
      case "Teddies by FOTF":
        return "10";
      case "AI Teds":
        return "2";
      default:
        return "5";
    }
  };

  const getURL = (collection: string) => {
    switch(collection){
      case "Fury Teds":
        return "TedMint"
      case "Teddies by FOTF":
        return "TeddyMint"
      case "AI Teds":
        return "AITedMint"
      default:
        return "TedMint"
    }
  };
  

  const price = React.useMemo(() => {
    return getPrice(collection);
  }, [collection]);

  const URL = React.useMemo(() => {
    return getURL(collection);
  }, [collection]);

  
  return (
    <Box sx={{borderRadius:"20px"}}>
      <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{borderRadius:"20px"}}
      >
        <DialogTitle sx={{
           backgroundColor: "transparent", 
           color: "white", 
           margin: "0px",
           borderRadius:"20px",
           position: "relative",
           borderTopColor: "#55c742",
           borderTopWidth: "3.5px",
           borderTopStyle: "solid",
           minWidth: "400px",
           maxWidth: "810px"
        }}>
        {/* {"Success!"} */}
        <Box sx={{backgroundColor: "#55c742", borderRadius: "40px", height: "60px", width: "60px", marginTop: "-40px", display: "flex", marginLeft: "auto", marginRight: "auto", justifyContent: "center"}}>
              <CheckOutlinedIcon fontSize='large' color='inherit' sx={{ margin: "auto", justifyContent: "center", alignItems: "center"}}/>
            </Box>
            <Box sx={{position: "absolute", right: "10px", top: "10px" }}>
              <HighlightOffOutlinedIcon fontSize='medium' color='action' onClick={handleClose}  sx={{ ":hover": { cursor: "pointer", width: "25px", height: "25px" }}}/>
            </Box>
        
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginTop: "10px", fontSize: "24px", fontFamily: "Bebas Neue"}} 
          id="alert-dialog-slide-description">
            You have minted {mintedIds.length} {nftText}: #{mintedIds.map((id, index) => {
                return <span key={index}>{id}{index < mintedIds.length - 1 ? ", #" : ""}</span>
            }
            )}
          </DialogContentText>

          <ImageList
                sx={{
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  overflowX: "auto",
                  overflowY: "auto",
                }}
                className="factory-image-list"
                cols={2}
                gap={15}
                rowHeight={200}
              >
                {mintedIds.map((tokenID: string, index: number) => (
                    <Box
                    key={index}
                    className="card-no-hover"
                    sx={{
                        border: "none !important",
                        // marginLeft: "auto",
                        // marginRight: "auto",
                        // background: "none",
                        // maxHeight: "200px",
                        // maxWidth: "200px",
                    }}
                    >
                        <SingleNFT tokenID={tokenID} contract={contract} 
                        collection={collection} />
                    </Box>
                ))}
          </ImageList>
          <TwitterShareButton
              url={`https://app.furyofthefur.com/${URL} \n \n`}
              // quote={'Share your Teds!'}
              // title={ <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />}
              title={`I just minted ${mintedIds.length} ${collection} for ${price} MATIC each! The Fury of the Fur Polygon Mint closes on 6/23, don't miss out! \n \n Mint:`}
              hashtags={hashtags}
              via={'FuryofTheFurNFT'}
              related={["FuryofTheFurNFT", "@FuryofTheFurNFT"]}
              >  <TwitterIcon size={32} round/>  
              </TwitterShareButton>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center", width: "100%"}}>
        <Button variant="contained" sx={{
            fontFamily: "Helvetica Neue",
            fontSize: "28px",
            marginBottom: "5px",
            backgroundColor: "#55c742",
            color: "white",
            borderColor: "#55c742",
            borderWidth: "5px",
            borderStyle: "solid",
            width: "235px",
            height: "65px",
            borderRadius: "0px",
            "&:hover": {
              backgroundColor: "white",
              color: "#55c742",
              borderColor: "#55c742",
              borderWidth: "5px",
              borderStyle: "solid",
              width: "235px",
              height: "65px"
            }
          }}onClick={handleClose}>Done</Button>
          
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </Box>
  )
}

export default RevealDialog;