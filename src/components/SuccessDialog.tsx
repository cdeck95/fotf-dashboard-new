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
import { Box, ThemeProvider, createTheme } from '@mui/material';
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

export interface SuccessDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  successCode: number;
  collection?: string;
  count?: number;
  honeyRewards?: number;
  honeySent?: string;
  tx?: string;
  ethHoneyClaimed?: string;
}

function SuccessDialog(props: SuccessDialogProps) {
  const { open, successCode, setOpen, collection, count, honeyRewards, honeySent, tx, ethHoneyClaimed} = props;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [copyText, setCopyText] = useState("Copy Message Contents");

  const handleClose = () => {
    setOpen(false);
  };

  const openDiscord = () => {
    window.open("https://discord.gg/fotf");
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(successText());
    setCopyText("Copied!");
  };



  const successText = () => {
    switch (successCode) {
      case 1:
        return "You have successfully renamed your Ted!";
      case 2:
        return `You have officially minted ${count} ${collection} NFTs on Polygon! You can view them in your OpenSea profile to check them out!`;
      case 3:
        return `You have successfully burned your ${count} NFTs for ${honeyRewards} $HNY!`;
      case 4:
        return `You have successfully: \n \n*Sent ${(parseInt(honeySent!)).toLocaleString()} $HNY \n*Burned ${count} NFTs \n \nIn doing so, you will recieve a fully Custom 1 of 1 Ted! Please copy the message contents (including the TX) using the button below & open a ticket in the FOTF Discord to claim your 1 of 1! \n \ntx: ${tx}`;
      case 5:
        return `You have successfully claimed ${ethHoneyClaimed} $HNY from the ETH Network. This amount will be airdropped to you soon.`;
      default:
        return "Please refresh the page to see your results.";
    }
  };

  
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
  
  return (
    <Box sx={{borderRadius:"20px"}}>
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
          <Box sx={{backgroundColor: "#55c742", borderRadius: "40px", height: "60px", width: "60px", marginTop: "-40px", display: "flex", marginLeft: "auto", marginRight: "auto", justifyContent: "center"}}>
              <CheckOutlinedIcon fontSize='large' color='inherit' sx={{ margin: "auto", justifyContent: "center", alignItems: "center"}}/>
            </Box>
            <Box sx={{position: "absolute", right: "10px", top: "10px" }}>
              <HighlightOffOutlinedIcon fontSize='medium' color='action' onClick={handleClose}  sx={{ ":hover": { cursor: "pointer", width: "25px", height: "25px" }}}/>
            </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center", marginTop: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "24px", fontFamily: "Bebas Neue", wordBreak: "break-word", whiteSpace: "pre-wrap", display: "flex", justifyContent: "center", alignItems: "center"}} 
          id="alert-dialog-slide-description">
          {successText()}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center", width: "100%"}}>
          {tx && <Button variant="contained" sx={{
              fontFamily: "Bebas Neue",
              fontSize: "24px",
              marginBottom: "5px",
              backgroundColor: "#FED100",
              color: "black",
              "&:hover": {
                backgroundColor: "white",
                color: "#FED100",
                borderColor: "black",
                borderWidth: "1px",
                borderStyle: "solid"
              }
            }}onClick={copyMessage}>{copyText}</Button>}
          <Button variant="contained" sx={{
            fontFamily: "Bebas Neue",
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

export default SuccessDialog;