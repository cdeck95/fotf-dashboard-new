import { Box } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import { useSDK } from "@thirdweb-dev/react";

function ComingSoon() {
  useTitle("FOTF | Coming Soon");

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
  const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
  const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1 className="comingSoon">
        <span className="comingSoonBlack">Coming</span> Soon
      </h1>
    </Box>
  );
}

export default ComingSoon;
