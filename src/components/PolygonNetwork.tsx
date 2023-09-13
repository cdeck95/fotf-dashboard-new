import { Alert, Box, Button } from "@mui/material";
import { useNetworkMismatch, useNetwork, ChainId } from "@thirdweb-dev/react";

// Here, we show a button to the user if they are connected to the wrong network
// When they click the button, they will be prompted to switch to the desired chain
export const PolygonNetwork = () => {
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const switchNetworkToPolygon = () => {
     switchNetwork!(ChainId.Polygon);
    //switchNetwork!(ChainId.Mumbai);
  };

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
  const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
  const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");


  return (
    <Box sx={{zIndex: "1 !important"}}>
      <p>{isMismatched}</p>
      {isMismatched && (  <Alert severity="error" sx={{backgroundColor: accentColor}}
        action={
            <Button color="inherit" size="small" onClick={() => switchNetworkToPolygon()}>
            Switch Network
            </Button>
        }
        >
            You are connected to the wrong network. Please switch.
    </Alert>
    )}
      {/* {isMismatched && (
        <button onClick={() => switchNetworkToMainnet}>
          Switch Network
        </button>
      )} */}
    </Box>
  );
};