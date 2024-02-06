import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTitle } from '../../hooks/useTitle';
import { useSDK, useAddress } from '@thirdweb-dev/react-core';
import "../styles/campaignTrail.css";
import "../styles/ChapterOne.css";
import LiNold from '../assets/images/Advanced_LiNold.png';
import DeLeon from '../assets/images/Merged_DeLeon.png';
import Jaxon_UR from '../assets/images/Jaxon_UR.png';
import newlogo from '../assets/images/newlogo.png';
import { useNavigate } from 'react-router-dom';

export interface Leader {
    id: number;
    image: string;
    name: string;
    //stats here too
  }
  

function ChapterOneLeaderSelection(props: { showMismatch: boolean }) {
  const [gameState, setGameState] = useState('battle'); // You can define different game states
  const [isPasswordEntered, setIsPasswordEntered] = useState(false); // Track whether the password is entered

  useTitle("Choose Your Leader");
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
  const navigate = useNavigate();

  const leaders: Leader[] = [
    { id: 1, image: LiNold, name: "LiNold"},
    { id: 2, image: DeLeon, name: "DeLeon" },
    { id: 3, image: Jaxon_UR, name: "Jaxon" },
  ];

  useEffect(() => {
    // Add logic to handle game states and transitions
  }, [gameState]);

  const [focusedLeader, setFocusedLeader] = useState<number>(2);

  const handleClick = (leaderId: number) => {
    setFocusedLeader(leaderId);
  };

  const levelData = { leader: leaders[focusedLeader - 1], level: 1 };

  const selectLeader = () => {
    navigate("/ChapterOne/Battle", { state: levelData });
  };


  return (
    <Box
      className={"inner-container-game"} sx={{ position: "relative", backgroundColor:  "#000000" }}
    >
        <div className="Leader-Selection-Container">
          <div className="Header">
            <img src={newlogo} alt="Fury of The Fury: The Simulation Logo" className="logo" />
            <h1 className="green-header">Planetary War Simulation</h1>
            <h2 className="green-subheader">*** Choose Your Leader ***</h2>
          </div>
          <div className="Columns-Leaders">
            {leaders.map((leader) => (
            <div
                key={leader.id}
                className={`Leader ${focusedLeader === leader.id ? "focused" : ""}`}
                onClick={() => handleClick(leader.id)}
            >
                <img src={leader.image} alt={`Leader ${leader.id}`} className="card"/>
            </div>
            ))}
          </div>
          <button className="green-button" onClick={selectLeader}>Choose</button>
        </div>
    </Box>
  );
};

export default ChapterOneLeaderSelection;
