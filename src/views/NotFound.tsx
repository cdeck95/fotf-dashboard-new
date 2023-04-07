import { Box } from "@mui/material";
import { useTitle } from "../hooks/useTitle";
import "../styles/Dashboard.css";
import LeftDrawer from "../components/LeftDrawer";
import RightDrawer from "../components/RightDrawer";



function App() {
  useTitle("FOTF | 404 Error");

  return (
      <p>404 Error</p>
  );
}

export default App;
