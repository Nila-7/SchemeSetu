import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import FindSchemes from "./pages/FindSchemes.jsx";
import Results from "./pages/Results.jsx";
import SchemeDetails from "./pages/SchemeDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/find"
        element={<FindSchemes />}
      />

      <Route
        path="/results"
        element={<Results />}
      />

      <Route
        path="/scheme/:id"
        element={<SchemeDetails />}
      />
    </Routes>
  );
}

export default App;