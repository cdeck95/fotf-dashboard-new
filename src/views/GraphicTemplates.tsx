import { Box } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";
import ComingSoon from "./ComingSoon";

function GraphicTemplates() {
  useTitle("FOTF | Graphic Templates");
  //const theme = useTheme();
  //const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();

  return <ComingSoon />;
}

export default GraphicTemplates;
