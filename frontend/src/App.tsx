import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyVehicleRegistration from "./routes/MyVehicleRegistration";
import { QueryClientProvider, QueryClient } from "react-query";
import Test from "./routes/Test";

const queryClient = new QueryClient();

function App() {
  return (
    // <div className="App"></div>
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Test />}></Route>
            <Route
              path="/myvehicle/registration"
              element={<MyVehicleRegistration />}
            ></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
