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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';


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

    const sidebarBackgroundColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--sidebar-background-color");

  const theme = createTheme({
    typography: {
      fontFamily: ["Roboto", "Helvetica", "Arial"].join(","),
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
            sx={{borderRadius:"20px", zIndex: "1000"}}
            >
            <DialogTitle sx={{
                backgroundColor: "transparent", 
                color: "#000", 
                margin: "0px",
                borderRadius:"20px",
                fontFamily: "Bebas Neue",
                position: "relative",
                borderTopColor: "#55c742",
                borderTopWidth: "3.5px",
                borderTopStyle: "solid",
                minWidth: "400px",
                maxWidth: "810px"
            }}>
            {/* {"Rename Your Ted"} */}
            <Box sx={{backgroundColor: "#55c742", borderRadius: "40px", height: "60px", width: "60px", marginTop: "-40px", display: "flex", marginLeft: "auto", marginRight: "auto", justifyContent: "center"}}>
              <EditOutlinedIcon fontSize='large' color='inherit' sx={{ margin: "auto", justifyContent: "center", alignItems: "center"}}/>
            </Box>
            <Box sx={{position: "absolute", right: "10px", top: "10px" }}>
              <HighlightOffOutlinedIcon fontSize='medium' color='action' onClick={handleClose}  sx={{ ":hover": { cursor: "pointer", width: "25px", height: "25px" }}}/>
            </Box>
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
                    fontSize: "28px",
                    margin: "5px",
                    backgroundColor: "white",
                    color: "#55c742",
                    borderColor: "#55c742",
                    borderWidth: "5px",
                    borderStyle: "solid",
                    width: "195px",
                    height: "60px",
                    borderRadius: "0px",
                    "&:hover": {
                      backgroundColor: "#55c742",
                      color: "white",
                      borderColor: "#55c742",
                      borderWidth: "5px",
                      borderStyle: "solid",
                      width: "195px",
                      height: "60px"
                    }
                }}onClick={handleClose}>Back</Button>
                
                <Button variant="contained" sx={{
                    fontFamily: "Bebas Neue",
                    fontSize: "28px",
                    margin: "5px",
                    backgroundColor: "#55c742",
                    color: "white",
                    borderColor: "#55c742",
                    borderWidth: "5px",
                    borderStyle: "solid",
                    width: "195px",
                    height: "60px",
                    borderRadius: "0px",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#55c742",
                      borderColor: "#55c742",
                      borderWidth: "5px",
                      borderStyle: "solid",
                      width: "195px",
                      height: "60px"
                    }
                }}onClick={handleSubmit}>Submit</Button>
                
        </DialogActions>
            </Dialog>
        </ThemeProvider>
    </Box>
  )
}

export default RenameDialog;