import {  Box } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";


function AssetOverview() {

  return (
    <Box  sx={{ display: "flex", 
    justifyContent: "center", alignItems: "center" }}>
    <h1 className="comingSoon"><span className="comingSoonBlack">Coming</span> Soon</h1>
    </Box>
  );
}

export default AssetOverview;