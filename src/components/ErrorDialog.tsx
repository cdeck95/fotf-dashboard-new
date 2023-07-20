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
import { Box, CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface FailureDialogProps {
  open: boolean;
  errorCode?: number;
  handleClose: () => void;
  collection?: string;
}

function ErrorDialog(props: FailureDialogProps) {
  const { open, errorCode, handleClose, collection } = props;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const errorText = () => {
    switch (errorCode) {
      case 1:
        return "No collection selected, please select a collection and try again.";
      case 2:
        return "The collection you selected is still loading. Please wait and try again.";
      case 3:
        return `Seems like you don’t have any ${collection} so there’s no need to bridge them. Don’t worry though, after the bridge closes you’ll be able to get your hands on some right here in the app. Stay tuned for that!`;
      case 4:
          return `${collection} is currently disabled. Please check back later.`;
      case 5:
        return `Your wallet is not currently approved for bridging ${collection}. Please make sure you have delisted all ${collection} from any marketplaces and open a ticket within the FOTF Discord.`;
      case 6:
        return `The transaction was rejected by the user.`;
      case 7:
        return `You have already bridged ${collection}. Please open a ticket within the FOTF Discord if you feel this is a mistake.`;
      //case 8 spits the MM rejection straight into the dialog
      case 8:
        return `${collection}`;
      case 9:
        return `We could not find this token in your wallet. Please refresh and try again. If this continues to happen, please open a ticket within the FOTF Discord.`;
      case 10:
        return `We ran into an error trying to check whether you are approved to burn. Please try again. If this keeps happening please open a ticket in the FOTF Discord.`;
      case 11:
        return `We ran into an error trying to burn your token. Please try again. If this keeps happening please open a ticket in the FOTF Discord.`;
      case 12:
        return `Please use whole numbers only.`;
      case 13:
        return `You do not have enough MATIC to support this purchase. Please try again.`;
      case 14:
        return 'The amount of HNY you are trying to receive exceeeds the available supply. Please deselect some of your tokens and try again.'
      case 15:
        return 'The amount of HNY you are trying to send exceeeds your balance. Please try to burn more tokens to reduce the amount of honey you need to send, or visit the Honey Exchange to purhcase more.'
      case 16:
        return 'You have already received your ETH $HNY Airdrop. If you believe this to be incorrect, please raise a ticket in the FOTF Discord.'
      case 17:
        return 'Your ETH $HNY Airdrop is currently Pending. Please check back at a later date. If you believe this to be incorrect, please raise a ticket in the FOTF Discord.'
      default:
        return "Something went wrong. We are not sure exactly what. Please refresh the page. If this continues to happen, please open a ticket within the FOTF Discord.";
    }
  };

  const errorTitle = () => {
    switch (errorCode) {
      case 1:
        return "Error";
      case 2:
        return "Error";
      case 3:
        return `Whoops!`;
      case 4:
        return `Coming Soon!`;
      default:
        return "Error";
    }
  };

  const errorColor = () => {
    switch (errorCode) {
      case 1:
        return "#c74242";
      case 2:
        return "#c74242";
      case 3:
        return "#FED100";
      case 4:
        return "#FED100";
      default:
        return "#c74242"
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
            borderRadius:"10px",
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
            backgroundColor: "transparent", 
            color: "white", 
            margin: "0px",
            borderRadius:"10px",
            position: "relative",
            borderTopColor: "#c74242",
            borderTopWidth: "3.5px",
            borderTopStyle: "solid",
            minWidth: "400px"
          }}>
            <Box sx={{backgroundColor: "#c74242", borderRadius: "40px", height: "60px", width: "60px", marginTop: "-40px", display: "flex", marginLeft: "auto", marginRight: "auto", justifyContent: "center"}}>
              {/* <CircularProgress color="inherit" sx={{ margin: "auto", justifyContent: "center", alignItems: "center"}} /> */}
              <PriorityHighOutlinedIcon fontSize='large' color='inherit' sx={{ margin: "auto", justifyContent: "center", alignItems: "center"}}/>
            </Box>
            <Box sx={{position: "absolute", right: "5px", top: "5px" }}>
              <HighlightOffOutlinedIcon fontSize='medium' color='action' onClick={handleClose}  sx={{ ":hover": { cursor: "pointer", width: "25px", height: "25px" }}}/>
            </Box>
          
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ marginTop: "10px", fontSize: "24px", fontFamily: "Bebas Neue"}} id="alert-dialog-slide-description">
              {errorText()}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center", width: "100%"}}>
            <Button variant="contained" color="error" sx={{
              fontFamily: "Bebas Neue",
              fontSize: "24px",
              marginBottom: "5px",
              backgroundColor: errorColor(),
              color: "white",
              borderColor: "#c74242",
              borderWidth: "5px",
              borderStyle: "solid",
              width: "235px",
              height: "65px",
              "&:hover": {
                backgroundColor: "white",
                color: errorColor(),
                borderColor: "#c74242",
                borderWidth: "5px",
                borderStyle: "solid",
                width: "235px",
                height: "65px",
              }
            }}onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Box>
  )
}

export default ErrorDialog;