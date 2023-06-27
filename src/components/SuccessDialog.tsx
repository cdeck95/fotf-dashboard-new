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
}

function SuccessDialog(props: SuccessDialogProps) {
  const { open, successCode, setOpen, collection, count, honeyRewards, honeySent, tx } = props;
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
          <DialogContentText sx={{ marginTop: "10px", fontSize: "24px", fontFamily: "Bebas Neue", wordBreak: "break-word", whiteSpace: "pre-wrap"}} 
          id="alert-dialog-slide-description">
          {successText()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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

export default SuccessDialog;