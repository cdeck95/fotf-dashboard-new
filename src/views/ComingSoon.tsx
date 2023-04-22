import {  Box } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";


function ComingSoon() {
  useTitle("FOTF | Coming Soon");

  return (
    <Box className="comingSoon" sx={{ height: "100%", display: "flex", 
    justifyContent: "center", alignItems: "center"}}>
      <h1>Coming Soon</h1>
    </Box>
  );
}

export default ComingSoon;