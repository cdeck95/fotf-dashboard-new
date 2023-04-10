
import {  Box } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";


function HoneyExchange() {
  useTitle("FOTF | Honey Exchange");
  //const theme = useTheme();
  //const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();

  return (
    <Box sx={{ margin: 5}}>
      <h1>Coming Soon</h1>
    </Box>
  );
}

export default HoneyExchange;
