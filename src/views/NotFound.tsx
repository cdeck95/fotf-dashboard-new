import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import accessDeniedImage from "../assets/access_denied_2.png";

function App() {
  useTitle("FOTF | Not Found");
  // useTitle("FOTF | Connect Your Wallet");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box className="inner-container">
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "5%",
        }}
      >
        <img
          src={accessDeniedImage}
          alt="access denied"
          className={
            isMobile ? "accessDeniedImage-mobile" : "accessDeniedImage"
          }
        />
        <h1 className={isMobile ? "comingSoon-Mobile" : "comingSoon"}>
          <span
            className={isMobile ? "comingSoonBlack-Mobile" : "comingSoonBlack"}
          >
            Connect Your
          </span>{" "}
          Wallet
        </h1>
      </Box>
    </Box>
  );
}

export default App;
