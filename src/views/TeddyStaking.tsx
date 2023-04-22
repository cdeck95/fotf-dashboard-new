
import {  Box } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import ComingSoon from "./ComingSoon";


function TeddyStaking() {
  useTitle("FOTF | Teddy Staking");
  //const theme = useTheme();
  //const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();

  return (
    <Box className="inner-container">
      <ComingSoon/>
    </Box>
  );
}

export default TeddyStaking;
