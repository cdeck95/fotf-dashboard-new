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