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
  isLoading: boolean;
  // searchText: string;
  // stakedIDs: string[];
  // selectedTokens: NFT[];
  // setSelectedTokens: React.Dispatch<SetStateAction<NFT[]>>;
}

function NFTList(props: NFTListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const isLarge = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isXL = useMediaQuery(theme.breakpoints.up("xl"));
  const isFullScreen = useMediaQuery(theme.breakpoints.up(1800));
  console.log(`Mobile:  ${isMobile}`);
  console.log(`Small:  ${isSmall}`);
  console.log(`Medium:  ${isMedium}`);
  console.log(`Medium-Large:  ${isMediumLarge}`);
  console.log(`Large:  ${isLarge}`);
  console.log(`XL:  ${isXL}`);
  console.log(`Is 1920:  ${isFullScreen}`);

  const { tokens, isLoading } = props;
  const [noTokens, setNoTokens] = useState(true);
  const columns = 3;
  //const [columns, setColumns] = useState(3);

  // useEffect(() => {
  //   if (isMobile) {
  //     if (isSmall) {
  //       setColumns(1);
  //     } else {
  //       setColumns(2);
  //     }
  //   } else {
  //     if (isSmall) {
  //       setColumns(1);
  //     } else if (isMedium) {
  //       setColumns(1);
  //     } else if (isMediumLarge) {
  //       setColumns(2);
  //     } else if (isLarge) {
  //       setColumns(2);
  //     } else if (isXL && !isFullScreen) {
  //       setColumns(3);
  //     } else if (isFullScreen) {
  //       setColumns(4);
  //     } else {
  //       setColumns(3);
  //     }
  //   }
  // }, [isMobile, isSmall, isMedium, isMediumLarge, isLarge, isXL, isFullScreen]);

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

  const skeltonMap:number[] = [1, 2, 3];

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {isLoading ? (
        <ImageList
        sx={{
          justifyContent: "center",
          width: "100%",
          height: "100%",
          overflowX: "hidden",
          overflowY: "hidden",
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
              maxHeight: "160px",
              maxWidth: "160px",
            }}
          >
            <Skeleton variant="rectangular" width={160} height={160} />
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
                overflowX: "auto",
                overflowY: "hidden",
                backgroundColor: "white",
                display: 'flex',
                flexDirection: 'row',
                
              }}
              cols={columns}
              gap={10}
              rowHeight={160}
            >
              {tokens.slice(0,3).map((token: NFT) => (
                <Box
                  key={token.metadata.id}
                  className="card-dashboard"
                  sx={{
                    background: "none",
                    maxHeight: "160px",
                    maxWidth: "160px",
                  }}
                >
                  <ThirdwebNftMedia
                    metadata={token.metadata}
                    style={{
                      maxHeight: "180px",
                      maxWidth: "180px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      width: "160px",
                      height: "160px",
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
