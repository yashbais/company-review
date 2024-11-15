import React, { useState } from "react";
import { Icon } from "@iconify/react";
import AddCompanyModal from "./Modals/AddCompanyModal";

const CityFilterBar = () => {
  const [selectedSort, setSelectedSort] = useState("Name");
  const [openModal, setOpenModal] = useState(false);

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  return (
    <>
      <div className="mt-4">
        <div className="max-w-full md:max-w-[70%] grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mx-auto p-4">
          <div className="col-span-1 sm:col-span-7 flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="relative w-full">
              <label className="block text-sm font-normal text-gray-600 mb-2">
                Select City
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="h-10 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md pl-4 pr-10 focus:ring-[#D100F3] focus:border-[#D100F3]"
                  placeholder="Select City"
                />
                <div className="absolute inset-y-0 right-4 top-6 flex items-center pointer-events-none">
                  <img src="/navigate.svg" alt="navigate" />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="text-white mt-4 sm:mt-0 bg-gradient-to-br from-[#D100F3] to-[#002BC5] font-medium rounded-md text-sm px-4 py-2 whitespace-nowrap"
            >
              Find Company
            </button>
          </div>

          <div className="col-span-1 sm:col-span-5 flex flex-col sm:flex-row items-center sm:items-end justify-evenly gap-4 mt-4 sm:mt-0">
            {/* Add Company Button */}
            <button
              onClick={()=>setOpenModal(true)}
              type="button"
              className="text-white bg-gradient-to-br from-[#D100F3] to-[#002BC5] font-medium rounded-md text-sm px-4 py-2 flex items-center gap-1 w-full sm:w-auto "
            >
              <Icon icon="ic:round-plus" /> Add Company
            </button>

            {/* Sort Dropdown */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <label className="text-sm font-medium text-gray-600 mb-1 sm:mb-0">
                Sort
              </label>
              <select
                id="sort"
                className="bg-gray-50 border font-semibold border-gray-300 text-gray-900 text-sm rounded-md p-2 w-40"
                value={selectedSort}
                onChange={handleSortChange}
              >
                <option
                  value="Name"
                  className={
                    selectedSort === "Name"
                      ? "font-semibold text-black"
                      : "text-gray-400"
                  }
                >
                  Name
                </option>
                <option
                  value="Average"
                  className={
                    selectedSort === "Average"
                      ? "font-semibold text-black"
                      : "text-gray-400"
                  }
                >
                  Average
                </option>
                <option
                  value="Rating"
                  className={
                    selectedSort === "Rating"
                      ? "font-semibold text-black"
                      : "text-gray-400"
                  }
                >
                  Rating
                </option>
                <option
                  value="Location"
                  className={
                    selectedSort === "Location"
                      ? "font-semibold text-black"
                      : "text-gray-400"
                  }
                >
                  Location
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="items-center justify-center flex mt-2">
          <div className=" h-2 w-full flex justify-center md:max-w-[75%]">
            <span className="block w-full h-px bg-gray-300"></span>
          </div>
        </div>
      </div>
      <AddCompanyModal setOpenModal={setOpenModal} openModal={openModal} />
    </>
  );
};

export default CityFilterBar;
