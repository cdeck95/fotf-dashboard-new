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
import { useEffect, useState } from 'react';
import { Box, CircularProgress, LinearProgress, ThemeProvider, createTheme, styled } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface LoadingDialogProps {
  open: boolean;
  onClose: () => void;
  collection?: string;
  collectionCount?: number;
  loadingCode: number;
}

function LoadingDialog(props: LoadingDialogProps) {
  const { onClose, open, collection, collectionCount, loadingCode} = props;
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    console.log("closing...")
    onClose();
  };

  const loadingText = () => {
    switch (loadingCode) {
      case 1:
        return `We are hard at work bridging your ${collectionCount} ${collection}... hang tight!`;
      case 2:
        return `Minting ${collectionCount} ${collection} ... hang tight!`;
      case 3:
        return `Renaming your Ted... hang tight!`;
      case 4:
        return `Approving contracts... hang tight!`;
      case 5:
        return `Burning... hang tight!`;
      default:
        return "Loading... hang tight!";
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
            borderRadius:"10px",
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
          sx={{borderRadius:"20px",}}
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
              <CircularProgress color="inherit" sx={{ margin: "auto", justifyContent: "center", alignItems: "center"}} />
              {/* <CheckOutlinedIcon fontSize='large' color='inherit' sx={{ margin: "auto", justifyContent: "center", alignItems: "center"}}/> */}
            </Box>
            <Box sx={{position: "absolute", right: "10px", top: "10px" }}>
              <HighlightOffOutlinedIcon fontSize='medium' color='action' onClick={handleClose}  sx={{ ":hover": { cursor: "pointer", width: "25px", height: "25px" }}}/>
            </Box>
          

          
         
          </DialogTitle>
          <DialogContent sx={{ marginTop: "-10px"}}>
            <DialogContentText sx={{ textAlign: "center", marginTop: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "24px", fontFamily: "Helvetica Neue",  display: "flex", justifyContent: "center", alignItems: "center"}} id="alert-dialog-slide-description">
            {loadingText()}
            </DialogContentText>
            <LinearProgress color="success" sx={{ marginTop: "10px"}}/>
          </DialogContent>
          {/* <DialogActions sx={{ marginTop: "-10px", marginBottom: "10px", display: "flex", justifyContent: "center"}}>
          </DialogActions> */}
        </Dialog>
      </ThemeProvider>
    </Box>
  )
}

export default LoadingDialog;