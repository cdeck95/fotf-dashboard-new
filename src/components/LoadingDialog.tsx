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
}

function LoadingDialog(props: LoadingDialogProps) {
  const { onClose, open, collection, collectionCount} = props;
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

//   useEffect(() => {
//     doTimeout();
//   }, []);

//   async function doTimeout(){
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     setIsDoneLoading(true);
//     handleClose();
//   }

  
 
  
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
          We are hard at work bridging your {collectionCount} {collection}... hang tight!
          </DialogContentText>
          <LinearProgress color="success" sx={{ marginTop: "5px"}}/>
        </DialogContent>
        <DialogActions>
{/*             
          <Button variant="contained" disabled={isDoneLoading} sx={{
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
          }}onClick={handleClose}></Button> */}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default LoadingDialog;