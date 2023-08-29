import * as React from "react";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
} from "@mui/material";

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
};

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
  const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
  const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");

function PartnerItem(props: PartnerItemProps) {
  return (
    <ImageList
      sx={{
        height: 200,
        width: "100%",
        marginBottom: "0px",
        marginTop: "0px",
        paddingTop: "0px",
        paddingBottom: "0px",
        paddingRight: "0px",
        paddingLeft: "0px",
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: "translateZ(0)",
      }}
      rowHeight={200}
      gap={1}
      cols={1}
    >
      <ImageListItem>
        <img
          src={props.item.image}
          alt="Partner Logo"
          loading="lazy"
          className="partnerImage"
        />
        <ImageListItemBar
          title={props.item.name}
          subtitle={props.item.description}
          actionIcon={
            // <IconButton
            //   sx={{ color: 'white' }}
            //   aria-label={`star ${item.title}`}
            // >
            //   <StarBorderIcon />
            // </IconButton>
            <Button
              onClick={() => openLink(props.item.partnerLink)}
              sx={{ marginRight: "5px" }}
            >
              Check them out!
            </Button>
          }
          actionPosition="right"
        />
      </ImageListItem>
    </ImageList>
  );
}

export default PartnerItem;
