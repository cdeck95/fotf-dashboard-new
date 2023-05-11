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
import { Box } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface DialogProps {
  open: boolean;
  handleClose: () => void;
}

function MaticDialog(props: DialogProps) {
  const { open, handleClose } = props;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  
    function openCoinbase(): void {
        window.open("https://www.coinbase.com/price/polygon");
    }

    function bridgeETH(): void {
        window.open("https://wallet.polygon.technology/polygon/bridge/deposit");
    }

    function openDiscord(): void {
        window.open("https://discord.gg/fotf")
    }

  return (
    <Box sx={{borderRadius:"0px"}}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{borderRadius:"0px"}}
      >
        <DialogTitle sx={{
          backgroundColor: "#FED100", 
          color: "white", 
          margin: "0px",
          fontFamily: "Bebas Neue",
          fontSize: "30px"
        }}>
        {"Warning"}
        {/* <Box sx={{position:"absolute", top: "5px", right: "5px", marginLeft: "auto"}} 
        >
          <Button sx={{color: "red", position:"absolute", top: "0px", right: "0px", marginLeft: "auto"}} 
          onClick={handleClose}>X</Button>
        </Box> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginTop: "10px", fontSize: "22px"}} id="alert-dialog-slide-description">
          It looks like you are low on MATIC. We suggest having at least $10 of MATIC to be safe. Getting MATIC is relatively easy and you can bridge your current ETH up using the Polygon Wallet for the best pricing. Click "Bridge ETH &rarr; Matic" below to start.<br/><br/>
          Adversely though, it does have gas fees associated with it. Our primary recommendation is to use a FIAT onramp. We recommend Coinbase & you can buy MATIC there on the Polygon Network and send it to your Polygon Wallet all for less $ than you'd pay in gas on the main bridge. Click "Buy on Coinbase" to get started.<br/><br/>
          For anyone that is struggling, or needs some help, we're happy to handle the bridging for you. Simply open a ticket in the FOTF Discord and we'll walk you through the steps of sending us the ETH and we'll send you back some MATIC.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" sx={{
            fontFamily: "Bebas Neue",
            fontSize: "24px",
            marginBottom: "5px",
          }}
          onClick={() => openCoinbase()}>Buy on Coinbase</Button>

        <Button variant="contained" color="primary" sx={{
            fontFamily: "Bebas Neue",
            fontSize: "24px",
            marginBottom: "5px",
          }}
          onClick={() => bridgeETH()}>Bridge ETH &rarr; Matic</Button>

        <Button variant="contained" color="primary" sx={{
            fontFamily: "Bebas Neue",
            fontSize: "24px",
            marginBottom: "5px",
          }}
          onClick={() => openDiscord()}>Go to FOTF Discord</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default MaticDialog;