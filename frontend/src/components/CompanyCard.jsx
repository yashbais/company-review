import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";


const CompanyCard = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/company/${1}`); // Navigate to the dynamic route
  };

  return (
    <div className="sm:max-w-[70%] flex flex-wrap items-center justify-between mx-auto p-3 ">
      <div className="w-full bg-red rounded-md border border-gray-100 min-h-[142px] shadow-md grid-cols-12 flex flex-col md:flex-row justify-between items-center p-2">
        <div className="col-span-8 flex gap-5 px-1">
          <div className=" sm:h-28 sm:w-28 h-20 w-20 rounded-md bg-gray-400 p-2 flex items-center justify-center text-white font-bold text-4xl">
            A
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xl font-semibold">heading</p>
              <p className="flex items-baseline text-gray-500 text-sm">
                <Icon icon="weui:location-outlined" /> address
              </p>
            </div>
            <p className="flex flex-nowrap">
              4.5 <span>⭐⭐⭐⭐⭐</span> 41 Reviews
            </p>
          </div>
        </div>
        <div className="colspan-4 flex md:flex-col flex-row gap-4 justify-between items-center  h-[120px]">
          <p className="text-[12px] text-gray-500">Founded on 01-01-2016</p>
          <button
           onClick={handleNavigate} 
            type="button"
            className="text-white bg-[#303030] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            Detail Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
