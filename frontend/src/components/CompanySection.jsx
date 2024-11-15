import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import CityToolBar from "./CityToolBar.jsx";
import CompanyCard from "./CompanyCard.jsx";
import CompanyDetail from "./CompanyDetail.jsx";
import { getCompanies } from "../store/Apis.js";

const CompanySection = () => {
  const [companies, setCompanies] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if(!openModal){
      getCompanies()
      .then((res) => {
        if (res?.data) {
          setCompanies(res.data);
        }
      })
      .catch((err) => console.log(err));
    }
  
  }, [openModal]);

  return (
    <Router>
      <Navbar />
      <ConditionalCityToolBar  openModal={openModal} setOpenModal={setOpenModal}/>
      <div className="sm:mt-8">
        <Routes>
          <Route
            path="/"
            element={companies.map((company) => (
              <CompanyCard
                key={company.companyId}
                company={company}  
              />
            ))}
          />
          <Route path="/company/:companyId" element={<CompanyDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

const ConditionalCityToolBar = ({openModal, setOpenModal}) => {
  const location = useLocation();

  return location.pathname === "/" ? <CityToolBar openModal={openModal} setOpenModal={setOpenModal} /> : null;
};

export default CompanySection;
