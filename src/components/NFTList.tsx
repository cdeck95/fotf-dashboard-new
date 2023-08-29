import * as React from "react";
import {
  Box,
  ImageList,
  Skeleton,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NFT } from "@thirdweb-dev/sdk";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import "../styles/Dashboard.css";
import "../styles/Bridge.css";
import { LoadStakedTeddy } from "../account/loadStakedTeddy";
import { SetStateAction, useEffect, useState } from "react";
import "../styles/TheFactory.css";

interface NFTListProps {
  tokens: NFT[];
  isSmallScreen: boolean;
  isLoading: boolean;
  // searchText: string;
  // stakedIDs: string[];
  // selectedTokens: NFT[];
  // setSelectedTokens: React.Dispatch<SetStateAction<NFT[]>>;
}

function NFTList(props: NFTListProps) {
  const theme = useTheme();
  // const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  // const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  // const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  // const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  // const isLarge = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  // const isXL = !useMediaQuery(theme.breakpoints.down("xl"));
  const isFullScreen = useMediaQuery(theme.breakpoints.up(1800));
  // const [isSmallScreen, setSmallScreen] = useState(false);
  // console.log(`Mobile:  ${isMobile}`);
  // console.log(`Small:  ${isSmall}`);
  // console.log(`Medium:  ${isMedium}`);
  // console.log(`Medium-Large:  ${isMediumLarge}`);
  // console.log(`Large:  ${isLarge}`);
  // console.log(`XL:  ${isXL}`);
  console.log(`Is 1920:  ${isFullScreen}`);

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
  const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
  const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");

  const isSmallScreen = props.isSmallScreen;

  const { tokens, isLoading } = props;
  const [noTokens, setNoTokens] = useState(true);
  const columns = isFullScreen? 4 : 3;

  var numberOfTokens = 0;

  if(tokens !== undefined){
    numberOfTokens = tokens.length;
  }
  
  const startIndex = Math.floor(Math.random() * ((numberOfTokens - columns) - 0 + 1)) + 0;
  const endIndex = startIndex + columns;

  useEffect(() => {
    if (tokens === undefined) {
      setNoTokens(true);
    } else {
      setNoTokens(false);
    }
  }, [tokens]);

  function handleOnSelect(token: NFT) {
    console.log("clicked token");
    console.log(token);
  }

  const skeltonMap:number[] = isSmallScreen ? [1, 2] : [1, 2, 3];

  return (
    <Box sx={{ width: "100%", height: "100%", marginLeft: "auto",
    marginRight: "auto", alignItems: "center", display: "flex", justifyContent: "center" }}>
      {isLoading ? (
        <ImageList
        sx={{
          justifyContent: "center",
          overflowX: "hidden",
          overflowY: "hidden",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "white",
        }}
        cols={columns}
        gap={10}
        rowHeight={160}
      > 
        {skeltonMap.map((e: number) => (
          <Box
            key={e}
            className="card-dashboard"
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              background: "none",
              maxHeight: "150px",
              maxWidth: "150px",
              borderRadius: "10px"
            }}
          >
            <Skeleton variant="rectangular" width={150} height={150} />
          </Box>
        ))}
      </ImageList>
      ) : (
        <Box sx={{ width: "100%", height: "100%" }}>
          {noTokens ? (
            <Box></Box>
          ) : (
            <ImageList
              sx={{
                justifyContent: "flex-start",
                width: "100%",
                height: "100%",
                overflowX: "hidden",
                overflowY: "hidden",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "0px",
                marginBottom: "0px",
                backgroundColor: "white",
                display: 'flex',
                flexDirection: 'row',
                
              }}
              cols={columns}
              gap={7.5}
              rowHeight={150}
            >
              {tokens.slice(startIndex,endIndex).map((token: NFT) => (
                <Box
                  key={token.metadata.id}
                  className="card-dashboard"
                  sx={{
                    background: "none",
                    maxHeight: "20dvh",
                    maxWidth: "20dvh",
                  }}
                >
                  <ThirdwebNftMedia
                    metadata={token.metadata}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      borderRadius: "10px",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
              ))}
            </ImageList>
          )}
        </Box>
      )}
    </Box>
  );
}

export default NFTList;
