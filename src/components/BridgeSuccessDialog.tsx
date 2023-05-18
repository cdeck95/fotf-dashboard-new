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

export interface BridgeSuccessDialogProps {
  open: boolean;
  collection: string
  collectionCount: number;
  setOpen: (open: boolean) => void;
  setAdvance: Function;
}

function BridgeSuccessDialog(props: BridgeSuccessDialogProps) {
  const { open, collection, collectionCount, setOpen, setAdvance } = props;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    setAdvance(false);
    navigate('/Bridge');
  };

  
 
  
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
          backgroundColor: "green", 
          color: "white", 
          margin: "0px",
          fontFamily: "Bebas Neue",
          fontSize: "30px"
        }}>
        {"Success!"}
        {/* <Box sx={{position:"absolute", top: "5px", right: "5px", marginLeft: "auto"}} 
        >
          <Button sx={{color: "red", position:"absolute", top: "0px", right: "0px", marginLeft: "auto"}} 
          onClick={handleClose}>X</Button>
        </Box> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginTop: "10px", fontSize: "24px", fontFamily: "Bebas Neue"}} 
          id="alert-dialog-slide-description">
          You have officially bridged {collectionCount} {collection} NFTs to Polygon!
          </DialogContentText>
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
          }}onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BridgeSuccessDialog;