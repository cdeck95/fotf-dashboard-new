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
import { Menu, useTheme } from '@mui/material';
import {saveAs} from "file-saver";
import { TwitterShareButton, TwitterIcon } from 'react-share';
import DownloadIcon from '@mui/icons-material/Download';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';




export interface IconMenuProps {
  token: NFT;
  onClose: () => void;
  addToBurnList: (token: NFT) => void;
  renameTed: (token: NFT) => void;
  selectedTokens: NFT[];
}

export default function IconMenu(props: IconMenuProps) {
  const token = props.token;
  const onClose = props.onClose;
  const addToBurnList = props.addToBurnList;
  const selectedTokens = props.selectedTokens;
  const renameTed = props.renameTed;
  const inBurnList = selectedTokens.includes(token);
  const navigate = useNavigate();
  const theme = useTheme();

  console.log(token);
  console.log(inBurnList);

  const hashtags = ["FOTF", "FOTFFAM", "FOTF4LYF"];

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

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
  const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
  const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");

  const downloadImage = async (token: NFT) => {
    const imageURL = token.metadata.image!;
    console.log(imageURL);
    saveAs(imageURL, `${token.metadata.id}.png`);
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
        {inBurnList
        ? <MenuItem onClick={() => addToBurnList(token)}>
            <ListItemIcon>
              <RemoveCircleOutlineOutlinedIcon/>
            </ListItemIcon>
            <ListItemText>Remove from Burn List</ListItemText>
          </MenuItem>
        : <MenuItem onClick={() => addToBurnList(token)}>
            <ListItemIcon>
              <WhatshotOutlinedIcon/>
            </ListItemIcon>
            <ListItemText>Add to Burn List</ListItemText>
          </MenuItem>
        }
        
        <Divider />
        <MenuItem onClick={() => downloadImage(token)}>
          <ListItemIcon>
            <DownloadIcon/>
          </ListItemIcon>
          <ListItemText>Download Image</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => loadPage(token)}>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>View on OpenSea</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <TwitterShareButton
              url={`https://app.furyofthefur.com/HoneyExchange\n \n`}
              // quote={'Share your Teds!'}
              // title={ <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />}
              title={`Check out my @FuryOfTheFurNFT: ${token.metadata.name} \n \nCheck yours out and share them within Honey Exchange:`}
              hashtags={hashtags}
              via={'FuryofTheFurNFT'}
              related={["FuryofTheFurNFT", "@FuryofTheFurNFT"]}
              >  <TwitterIcon size={32} round/>  
              </TwitterShareButton>
        </MenuItem>
        <MenuItem onClick={() => downloadImage(token)}>
          <Typography variant="body2" color="text.secondary"
          sx={{ fontSize: ".93rem ", overflowWrap: 'break-word !important', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: "100%" }}>
            Make sure to download the image & attach it to the post!
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}