import * as React from 'react';
import { Box, Button, ImageList, ImageListItem, ImageListItemBar, Paper } from "@mui/material";

interface PartnerInfo {
    name: string;
    description: string;
    image: string;
    partnerLink: string;
}

interface PartnerItemProps {
    item: PartnerInfo;
}

const openLink = (link: string) => {
    window.open(link);
}


function PartnerItem(props: PartnerItemProps)
{
    return (
        <ImageList
            sx={{
                height: 250,
                width: "100%",
                marginBottom: "10px",
                marginTop: "0px",
                padding: "0px",
                // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                transform: 'translateZ(0)',
            }}
            rowHeight={250}
            gap={1}
            cols={1} >
            <ImageListItem >
                <img src={props.item.image} alt="Partner Logo" loading="lazy" className="partnerImage" />
                <ImageListItemBar title={props.item.name} subtitle={props.item.description}
                actionIcon={
                    // <IconButton
                    //   sx={{ color: 'white' }}
                    //   aria-label={`star ${item.title}`}
                    // >
                    //   <StarBorderIcon />
                    // </IconButton>
                    <Button onClick={() => openLink(props.item.partnerLink)}>
                        Check them out!
                    </Button>
                }
                actionPosition="right"/>
            
            </ImageListItem>
        </ImageList>
    )
}

export default PartnerItem;