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
import { Box, LinearProgress } from '@mui/material';

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
  collection: string;
  collectionCount: number;
  loadingCode: number;
}

function LoadingDialog(props: LoadingDialogProps) {
  const { onClose, open, collection, collectionCount, loadingCode} = props;
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const loadingText = () => {
    switch (loadingCode) {
      case 1:
        return `We are hard at work bridging your ${collectionCount} ${collection}... hang tight!`;
      case 2:
        return `Minting ${collectionCount} ${collection} ... hang tight!`;
      default:
        return "Loading... hang tight!";
    }
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
        {"Loading"}
        {/* <Box sx={{position:"absolute", top: "5px", right: "5px", marginLeft: "auto"}} 
        >
          <Button sx={{color: "red", position:"absolute", top: "0px", right: "0px", marginLeft: "auto"}} 
          onClick={handleClose}>X</Button>
        </Box> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginTop: "10px", fontSize: "24px", fontFamily: "Bebas Neue"}} id="alert-dialog-slide-description">
           {loadingText()}
          </DialogContentText>
          <LinearProgress color="success" sx={{ marginTop: "5px"}}/>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default LoadingDialog;