import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import { NFT } from '@thirdweb-dev/sdk';
import { useNavigate } from 'react-router-dom';
import WhatshotOutlinedIcon from '@mui/icons-material/Whatshot';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export interface IconMenuProps {
  token: NFT;
  onClose: () => void;
  addToBurnList: (token: NFT) => void;
  renameTed: (token: NFT) => void;
}

export default function IconMenu(props: IconMenuProps) {
  const token = props.token;
  const onClose = props.onClose;
  const addToBurnList = props.addToBurnList;
  const renameTed = props.renameTed;
  const navigate = useNavigate();

  console.log(token);


  const loadPage = (token: NFT) => {
    if(token.metadata.uri.includes("FuryTeds")){
      window.open(`https://opensea.io/assets/matic/0x047be3f987854136ec872932c24a26dcd0fd3a42/${token.metadata.id}`);
      onClose();
    } else if(token.metadata.uri.includes("Teddies")){
      window.open(`https://opensea.io/assets/matic/0x747cc82cddf9fe91ae69c2f723844d8e31d31e26/${token.metadata.id}`);
      onClose();
    } else if(token.metadata.uri.includes("AITeds")){
      window.open(`https://opensea.io/assets/matic/0xdaa7ba5cfd5f3a46e8180f19b5c930130e156723/${token.metadata.id}`);
      onClose();
    } else {
      onClose();
      alert("Unrecognized collection, please raise a ticket in the FOTF Discord if you believe this is a mistake.");
    }
    
  };

  return (
    <Paper sx={{ width: 320, maxWidth: '100%',paddingTop: "8px", paddingBottom: "8px",
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset !important",
  /* box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; */
 }}>
      <MenuList>
        <MenuItem onClick={() => renameTed(token)}>
          <ListItemIcon>
            <EditOutlinedIcon/>
          </ListItemIcon>
          <ListItemText>Rename Ted</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => addToBurnList(token)}>
          <ListItemIcon>
            <WhatshotOutlinedIcon/>
          </ListItemIcon>
          <ListItemText>Add to Burn List</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => loadPage(token)}>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>View on OpenSea</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}