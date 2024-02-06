import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useTitle } from "../../hooks/useTitle";
import { useSDK, useAddress } from "@thirdweb-dev/react-core";
import "../styles/campaignTrail.css";
import chapterOne from "../assets/images/ChapterOne_Select.png";
import chapterTwo from "../assets/images/ChapterTwo_Select.png";
import chapterThree from "../assets/images/ChapterThree_Select.png";
import newlogo from "../assets/images/newlogo.png";
import { useNavigate } from "react-router-dom";

function CampaignTrail(props: { showMismatch: boolean }) {
  const [gameState, setGameState] = useState("battle"); // You can define different game states
  const [isPasswordEntered, setIsPasswordEntered] = useState(false); // Track whether the password is entered

  useTitle("Campaign Trail");
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
  const password = process.env.REACT_APP_PASSWORD;

  useEffect(() => {
    // Add logic to handle game states and transitions
  }, [gameState]);

  // Function to handle password submission
  const handlePasswordSubmit = () => {
    const enteredPassword = prompt("Please enter the password:"); // Prompt for the password

    if (enteredPassword === password) {
      setIsPasswordEntered(true); // Set the flag to true if the password is correct
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const goToChapterOne = () => {
    navigate("/ChapterOne");
  };

  // Render the password form or the secret content based on the password flag
  return (
    <Box
      className={"inner-container-game"}
      sx={{ position: "relative", backgroundColor: "#000000" }}
    >
      {isPasswordEntered ? ( // Render secret content if the password is entered
        <div className="Chapter-Selection-Container">
          <div className="Header">
            <img
              src={newlogo}
              alt="Fury of The Fury: The Simulation Logo"
              className="logo"
            />
            <h1 className="green-header">Planetary War Simulation</h1>
            <h2 className="green-subheader">*** Choose Your Battle ***</h2>
          </div>
          <div className="Columns">
            <div className="Column" onClick={() => goToChapterOne()}>
              <div className="Image">
                <img src={chapterOne} alt="Chapter 1 - Sgt. Nihil" />
              </div>
              <div className="Text">
                <p className="text-override">CHAPTER 1</p>
                <p className="sub-text-override">SGT. NIHIL</p>
              </div>
            </div>
            <div className="Column-Locked">
              <div className="Image">
                <img src={chapterTwo} alt="Chapter 2 - LOCKED" />
              </div>
              <div className="Text">
                <p className="text-override-locked">CHAPTER 2</p>
                <p className="sub-text-override-locked">LOCKED</p>
              </div>
            </div>
            <div className="Column-Locked">
              <div className="Image">
                <img src={chapterThree} alt="Chapter 3 - LOCKED" />
              </div>
              <div className="Text">
                <p className="text-override-locked">CHAPTER 3</p>
                <p className="sub-text-override-locked">LOCKED</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Render password form if the password is not entered
        <div id="password-form">
          <p className="password-text">
            This content is only available to a select few in the Pre-Alpha
            stage. If you have the password, please click the button below.
          </p>
          <button onClick={handlePasswordSubmit} className="green-button">
            Enter Password
          </button>
        </div>
      )}
    </Box>
  );
}

export default CampaignTrail;
