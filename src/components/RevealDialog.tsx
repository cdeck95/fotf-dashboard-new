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
}

function RevealDialog(props: RevealDialogProps) {
  const { open, setOpen, mintedIds, contract } = props;

  //const testIDs = ["307", "308", "1"]

  const handleClose = () => {
    setOpen(false);
  };

  const hashtags = ["FOTF", "FOTFFAM", "FOTF4LYF"];

  
  const sidebarBackgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--sidebar-background-color");

  const theme = createTheme({
    typography: {
      fontFamily: ["Bebas Neue", "Roboto", "Helvetica", "Arial"].join(","),
      fontSize: 16,
      fontWeightLight: 300,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: sidebarBackgroundColor,
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
            overflowX: "hidden",
            overflowY: "hidden",
            "&:hover": {
              overflowY: "auto",
            },
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        },
      },
    },
  });

  const nftText = mintedIds.length > 1 ? "NFTs" : "NFT";
  
  return (
    <Box sx={{borderRadius:"0px"}}>
      <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{borderRadius:"0px"}}
      >
        <DialogTitle sx={{
          backgroundColor: "green", 
          color: "white", 
          margin: "0px",
          fontFamily: "Bebas Neue",
          fontSize: "30px"
        }}>
        {"Success!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginTop: "10px", fontSize: "24px", fontFamily: "Bebas Neue"}} 
          id="alert-dialog-slide-description">
            You have minted {mintedIds.length} {nftText}: {mintedIds.map((id, index) => {
                return <span key={index}>{id}{index < mintedIds.length - 1 ? ", " : ""}</span>
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
                rowHeight={150}
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
                        <SingleNFT tokenID={tokenID} contract={contract} />
                    </Box>
                ))}
          </ImageList>
          <TwitterShareButton
              url={'https://app.furyofthefur.com/AITedMint \n \n'}
              // quote={'Share your Teds!'}
              // title={ <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />}
              title={`I just minted ${mintedIds.length} AI Teds for 2 MATIC each! The Fury of the Fur Polygon Mint closes on 6/23, don't miss out! \n \n Mint:`}
              hashtags={hashtags}
              via={'FuryofTheFurNFT'}
              related={["FuryofTheFurNFT", "@FuryofTheFurNFT"]}
              >  <TwitterIcon size={32} round/>  
              </TwitterShareButton>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={{
            fontFamily: "Bebas Neue",
            fontSize: "24px",
            marginBottom: "5px",
            backgroundColor: "green",
            color: "white",
            "&:hover": {
              backgroundColor: "white",
              color: "green",
              borderColor: "green",
              borderWidth: "1px",
              borderStyle: "solid"
            }
          }}onClick={handleClose}>Done</Button>
          
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </Box>
  )
}

export default RevealDialog;