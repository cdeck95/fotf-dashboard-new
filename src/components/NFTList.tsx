import * as React from 'react';
import { Box, ImageList } from "@mui/material";
import { NFT } from '@thirdweb-dev/sdk';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { ThirdwebNftMedia } from '@thirdweb-dev/react';

interface NFTListProps {
    tokens: NFT[];
    searchText: string;
}



  
function NFTList(props: NFTListProps) {

    const add = () => {
        console.log("adding...");
    }

    const star = () => {
        console.log("staring...");
    }

    const filteredNFTs = props.tokens?.filter(e => e.metadata.id!.includes(props.searchText));

    return (
        <ImageList sx={{ width: "100%", height: "100%", overflowX: "hidden", overflowY: "auto", padding: 0, margin: 0, backgroundColor: "white" }} cols={4} gap={25} rowHeight={250}>
                {filteredNFTs.map(e =>
                <Box key={e.metadata.id} className="card" sx={{ margin: 0, padding: 0, background: "none"}}>
                  <StarBorderIcon onClick={star} sx={{ position: "absolute", top: "15px", right: "15px", zIndex: "100 !important'" }}/>
                  <ThirdwebNftMedia metadata={e.metadata} style={{ maxHeight: "250px", maxWidth: "250px",
                    borderRadius: "10px", objectFit: "cover"
                     }}/>
                  <Box className="column-container">
                    <div className="large-left-column">
                      <h3 className="metadata-title">{e.metadata.name}</h3>
                      <h4 className="metadata">Last Transfer: 03/11/2023</h4>

                    </div>
                    <div className="small-right-column">
                      <ControlPointIcon onClick={add}/>
                    </div>
                  </Box>
                  
                  
                </Box>
              )}
              </ImageList>
    )
}

export default NFTList;

