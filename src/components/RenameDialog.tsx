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
import { Box, LinearProgress, TextField, ThemeProvider, createTheme, styled } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface RenameDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  currentName: string;
  setNewName: (newName: string) => void;
}

function RenameDialog(props: RenameDialogProps) {
  const { onClose, open, setOpen, currentName, setNewName } = props;
  console.log(currentName);
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onClose();
    }

  const theme = createTheme({
    typography: {
      fontFamily: ["Roboto", "Helvetica", "Arial"].join(","),
      fontSize: 16,
      fontWeightLight: 300,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
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
            sx={{borderRadius:"0px", zIndex: "1000"}}
            >
            <DialogTitle sx={{
                backgroundColor: "green", 
                color: "white", 
                margin: "0px",
                fontFamily: "Bebas Neue",
                fontSize: "30px"
            }}>
            {"Rename Your Ted"}
            </DialogTitle>
            <DialogContent sx={{paddingTop: "20px !important"}}>
            <TextField
                    id="outlined-uncontrolled"
                    label="Name"
                    defaultValue={currentName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNewName(event.target.value);
                      }}
                    />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" sx={{
                    fontFamily: "Bebas Neue",
                    fontSize: "18px",
                    marginBottom: "0px",
                    backgroundColor: "blue",
                    color: "white",
                    "&:hover": {
                    backgroundColor: "white",
                    color: "blue",
                    borderColor: "blue",
                    borderWidth: "1px",
                    borderStyle: "solid"
                    }
                }}onClick={handleClose}>Back</Button>
                
                <Button variant="contained" sx={{
                    fontFamily: "Bebas Neue",
                    fontSize: "18px",
                    marginBottom: "0px",
                    backgroundColor: "green",
                    color: "white",
                    "&:hover": {
                    backgroundColor: "white",
                    color: "green",
                    borderColor: "green",
                    borderWidth: "1px",
                    borderStyle: "solid"
                    }
                }}onClick={handleSubmit}>Submit</Button>
                
        </DialogActions>
            </Dialog>
        </ThemeProvider>
    </Box>
  )
}

export default RenameDialog;