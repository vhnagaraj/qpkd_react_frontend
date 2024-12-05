import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid2 } from "@mui/material";
import Login from "./components/Login";
import Encryot from "./components/Encryot";

const App = () => {
  return (
    <Router>
      <Grid2 container justifyContent={"center"} alignItems={"center"} mt="15%">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/encrypt" element={<Encryot />} />
        </Routes>
      </Grid2>
    </Router>
  );
};

export default App;
