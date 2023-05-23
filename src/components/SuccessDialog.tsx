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

export interface SuccessDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  successCode: number;
  collection: string;
  count: number;
}

function SuccessDialog(props: SuccessDialogProps) {
  const { open, successCode, setOpen, collection, count } = props;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
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
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginTop: "10px", fontSize: "24px", fontFamily: "Bebas Neue"}} 
          id="alert-dialog-slide-description">
          You have officially minted {count} {collection} NFTs on Polygon! You can view them in your OpenSea profile to check them out!
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
          }}onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SuccessDialog;