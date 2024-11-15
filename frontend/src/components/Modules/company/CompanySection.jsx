/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import CityToolBar from "../navbar/CityToolBar.jsx";
import CompanyCard from "../../shared/CompanyCard.jsx";
import CompanyDetail from "../company/CompanyDetail.jsx";
import { getCompanies } from "../../../store/Apis.js";

const CompanySection = () => {
  const [companies, setCompanies] = useState([]);
  const [dummyCompanies, setDummyCompanies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Name");


  useEffect(() => {
    if (!openModal) {
      getCompanies()
        .then((res) => {
          if (res?.data) {
            setCompanies(res.data);
            setDummyCompanies(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [openModal]);
  useEffect(() => {
    if (selectedSort && dummyCompanies.length > 0) {
      let sortedCompanies;  
      if (selectedSort === "Name") {
        sortedCompanies = [...dummyCompanies].sort((a, b) =>
          a.companyName.toLowerCase().localeCompare(b.companyName.toLowerCase())
        );
      } else if (selectedSort === "Average") {
        sortedCompanies = [...dummyCompanies].sort((a, b) =>
          a.averageRating - b.averageRating // Sorting by averageRating
        );
      } else if (selectedSort === "Rating") {
        sortedCompanies = [...dummyCompanies].sort((a, b) => {
          // Safeguard: Check if reviews array exists and is non-empty
          const avgRatingA = a.reviews && a.reviews?.length > 0
            ? a.reviews.reduce((sum, review) => sum + review.rating, 0) / a.reviews?.length
            : 0; // Default to 0 if no reviews
  
          const avgRatingB = b.reviews && b.reviews.length > 0
            ? b.reviews.reduce((sum, review) => sum + review.rating, 0) / b.reviews?.length
            : 0; // Default to 0 if no reviews
  
          return avgRatingA - avgRatingB; // Sorting by average rating of reviews
        });
      } else if (selectedSort === "Location") {
        sortedCompanies = [...dummyCompanies].sort((a, b) =>
          a.city.toLowerCase().localeCompare(b.city.toLowerCase())
        );
      }
  
      setCompanies(sortedCompanies); // Set the sorted companies
    }
  }, [selectedSort]);
  

  const filterFromCities = (searchedCity) => {
    if(searchedCity){
      setCompanies(
        dummyCompanies.filter((single) =>
          single.city.toLowerCase().includes(searchedCity.toLowerCase())
        )
      );
    }else{
      setCompanies(
        dummyCompanies
      );
    }
   
  };



  return (
    <Router>
      <Navbar />
      <ConditionalCityToolBar
        openModal={openModal}
        setOpenModal={setOpenModal}
        filterFromCities={filterFromCities}
        setSelectedSort={setSelectedSort}
        selectedSort={selectedSort}
      />
      <div className="sm:mt-8">
        <Routes>
          <Route
            path="/"
            element={
              companies.length > 0 ? (
                companies.map((company) => (
                  <CompanyCard key={company.companyId} company={company} />
                ))
              ) : (
                <p className="items-center flex justify-center">No Data Found</p> // Display this when no companies are available
              )
            }
          />
          <Route path="/company/:companyId" element={<CompanyDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

const ConditionalCityToolBar = ({
  openModal,
  setOpenModal,
  filterFromCities,
  setSelectedSort,
  selectedSort
  
}) => {
  const location = useLocation();

  return location.pathname === "/" ? (
    <CityToolBar
      openModal={openModal}
      setOpenModal={setOpenModal}
      filterFromCities={filterFromCities}
      setSelectedSort={setSelectedSort}
      selectedSort={selectedSort}
    />
  ) : null;
};

export default CompanySection;
