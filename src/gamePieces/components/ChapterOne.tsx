import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTitle } from '../../hooks/useTitle';
import { useSDK, useAddress } from '@thirdweb-dev/react-core';
import "../styles/campaignTrail.css";
import chapterOne from '../assets/images/ChapterOne_Select.png';
import chapterTwo from '../assets/images/ChapterTwo_Select.png';
import chapterThree from '../assets/images/ChapterThree_Select.png';
import newlogo from '../assets/images/newlogo.png';

function ChapterOne(props: { showMismatch: boolean }) {
  const [gameState, setGameState] = useState('battle'); // You can define different game states
  const [isPasswordEntered, setIsPasswordEntered] = useState(false); // Track whether the password is entered

  useTitle("TBD");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const leftDrawerWidth = isSmallScreen ? "0px" : "260px";
  const rightDrawerWidth = isSmallScreen ? "0px" : "340px";
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();
  const showMismatch = props.showMismatch;

  useEffect(() => {
    // Add logic to handle game states and transitions
  }, [gameState]);


  // Render the password form or the secret content based on the password flag
  return (
    <Box
      className={
        isSmallScreen ? "inner-container-mint-mobile" : "inner-container-game"
      } sx={{ position: "relative", backgroundColor:  "#000000" }}
    >
        <div className="App">
          <header className="Header">
            <h1 className="green-header">Planetary War Simulation</h1>
            <h2 className="green-subheader">Choose Your Battle</h2>
            <img src={newlogo} alt="Fury of The Fury: The Simulation Logo" className="logo" />
          </header>
          <div className="Columns">
        <div className="Column">
          <div className="Image">
            <img src={chapterOne} alt="Chapter 1 - Sgt. Nihil" />
          </div>
          <div className="Text">
            <p className="text-override">CHAPTER 1</p>
            <p className="sub-text-override">SGT. NIHIL</p>
          </div>
        </div>
        <div className="Column">
            <div className="Image">
                <img src={chapterOne} alt="Chapter 1 - Sgt. Nihil" />
            </div>
            <div className="Text">
                <p className="text-override">CHAPTER 1</p>
                <p className="sub-text-override">SGT. NIHIL</p>
            </div>
        </div>
      </div>
        </div>
    </Box>
  );
};

export default ChapterOne;
