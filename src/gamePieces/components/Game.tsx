// src/components/Game.tsx

import React, { useState, useEffect } from 'react';
import Battle from './Battle';
import StatusBar from './StatusBar';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTitle } from '../../hooks/useTitle';
import { useSDK, useAddress } from '@thirdweb-dev/react-core';
import "../styles/game.css";

function Game(props: { showMismatch: boolean }) {
  const [gameState, setGameState] = useState('battle'); // You can define different game states

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

  return (
    <Box
      className={
        isSmallScreen ? "inner-container-mint-mobile" : "inner-container-game"
      } sx={{ position: "relative", backgroundColor:"#000000" }}
    >
      <StatusBar />
      {gameState === 'battle' && <Battle />}
      {/* Add other game states/components here */}
    </Box>
  );
};

export default Game;
