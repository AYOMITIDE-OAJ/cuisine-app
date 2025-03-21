import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cuisines from "./pages/cuisines/Cuisines";
import { APP_ROUTES } from "./utils/constants";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={APP_ROUTES.Home} element={<Home />} />
        <Route path={APP_ROUTES.Cuisines} element={<Cuisines />} />
      </Routes>
    </Router>
  );
}

export default App;
