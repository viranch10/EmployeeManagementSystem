import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import EmployeeDirectory from "./Components/EmployeeDirectory";
import EmployeeCreate from "./Components/EmployeeCreate";
import EmployeeEdit from "./Components/EmployeeEdit";
import EmployeeDetails from "./Components/EmployeeDetails";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<EmployeeDirectory />} />
          <Route path="/create" element={<EmployeeCreate />} />
          <Route path="/edit/:id" element={<EmployeeEdit />} />
          <Route path="/details/:id" element={<EmployeeDetails />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
