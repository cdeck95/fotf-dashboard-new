import * as React from 'react';
import { Box, ImageList, useMediaQuery, useTheme } from "@mui/material";
import { NFT } from '@thirdweb-dev/sdk';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { ThirdwebNftMedia } from '@thirdweb-dev/react';
import "../styles/Dashboard.css";

interface NFTListProps {
    tokens: NFT[];
    searchText: string;
}



  
function NFTList(props: NFTListProps) {

  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isLarge = !useMediaQuery(theme.breakpoints.up("lg"));
  const isXL = !useMediaQuery(theme.breakpoints.up("xl"));
  console.log(isMobile);
  console.log(isLarge);
  console.log(isXL);



  const [columns, setColumns] = React.useState(3);

  React.useEffect(() => {
    if (isMobile) {
      setColumns(1);
    } else if (isLarge) {
      setColumns(2);
    } else if (isXL) {
      setColumns(3);
    }
  }, [isMobile, isLarge, isXL]);

    const add = () => {
        console.log("adding...");
    }

    const star = () => {
        console.log("staring...");
    }

    const filteredNFTs = props.tokens?.filter(e => e.metadata.id!.includes(props.searchText));
    console.log(filteredNFTs)
  
    return (
        <ImageList sx={{ justifyContent: "center", width: "100%", height: "100%", paddingLeft: "10px", paddingRight: "10px", overflowX: "hidden", 
        overflowY: "auto", backgroundColor: "white" }} cols={columns} gap={10} rowHeight={360}>
                {filteredNFTs.map(e =>
                <Box key={e.metadata.id} className="card" sx={{ marginLeft: "auto", marginRight: "auto", background: "none", maxHeight: "450px", maxWidth: "350px"}}>
                  <StarBorderIcon onClick={star} sx={{ position: "absolute", top: "5px", right: "5px" }}/>
                  <ThirdwebNftMedia metadata={e.metadata} style={{ maxHeight: "280px", maxWidth: "280px",
                    borderRadius: "10px", objectFit: "cover", width: "280px", height: "280px"
                     }}/>
                  <Box className="column-container" sx={{ marginBottom: "10px"}}>
                    <div className="large-left-column">
                      <h3 className="metadata-title">{e.metadata.name}</h3>
                      <h4 className="metadata">Last Transfer: 03/11/2023</h4>

                    </div>
                    <div className="small-right-column">
                      <ControlPointIcon onClick={add} fontSize='small'/>
                    </div>
                  </Box>
                  
                  
                </Box>
              )}
              </ImageList>
    )
}

export default NFTList;

