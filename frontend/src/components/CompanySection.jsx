import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import CityToolBar from "./CityToolBar.jsx";
import CompanyCard from "./CompanyCard.jsx";
import CompanyDetail from "./CompanyDetail.jsx";

const arr = [
  { id: 1, name: "Company A" },
  { id: 2, name: "Company B" },
  { id: 3, name: "Company C" },
];

const CompanySection = () => {
  return (
    <Router>
      <Navbar />
      <ConditionalCityToolBar />
      <div className="sm:mt-8">
        <Routes>
          <Route
            path="/"
            element={arr.map((company) => (
              <CompanyCard key={company.id} id={company.id} name={company.name} />
            ))}
          />
          <Route path="/company/:id" element={<CompanyDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

// Component to conditionally render CityToolBar
const ConditionalCityToolBar = () => {
  const location = useLocation();

  return location.pathname === "/" ? <CityToolBar /> : null;
};

export default CompanySection;
