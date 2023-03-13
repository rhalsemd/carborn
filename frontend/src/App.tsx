import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./routes/Test";

function App() {
  return (
    // <div className="App"></div>
    <Router>
      <Routes>
        <Route path="/" element={<Test />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
