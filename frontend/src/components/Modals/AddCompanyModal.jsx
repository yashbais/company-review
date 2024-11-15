/* eslint-disable jsx-a11y/anchor-is-valid */

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { Datepicker } from "flowbite-react";
import { Icon } from "@iconify/react";


const AddCompanyModal = ({ setOpenModal, openModal }) => {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    companyFoundedOn: null, // Use null for date to handle Datepicker
    location: "",
    city: "",
  });

  function onCloseModal() {
    setOpenModal(false);
    setCompanyDetails({
      companyName: "",
      companyFoundedOn: null,
      location: "",
      city: "",
    });
  }

  const handleChange = (e) => {
    setCompanyDetails({ ...companyDetails, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setCompanyDetails({ ...companyDetails, companyFoundedOn: date });
  };

  return (
    <>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup >
        
        <Modal.Header className="-p-2 ">
          <div className="relative overflow-hidden flex items-center justify-center rounded-lg">
            <img
              src="/darkCircle.svg"
              alt=""
              className="absolute top-0 left-0 w-28 h-28"
            />
            <img
              src="/lightCircle.svg"
              alt=""
              className="relative w-28 h-28 -left-8"
            />
          </div>
        </Modal.Header>

        <div className="w-full  flex items-center justify-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
          Add Company
          </h3>
        </div>

        <Modal.Body>
          <div className="space-y-4">
          
            <div>
              <Label
                htmlFor="companyName"
                value="Company Name"
                className="text-gray-500 font-medium"
              />
              <TextInput
                id="companyName"
                name="companyName"
                placeholder="Enter company name..."
                value={companyDetails.companyName}
                onChange={handleChange}
                required
                
              />
            </div>

            <div>
              <Label
                htmlFor="location"
                value="Location"
                className="text-gray-500 font-medium"
              />
              <TextInput
                id="location"
                name="location"
                placeholder="Enter location..."
                value={companyDetails.location}
                onChange={handleChange}
                required
              />
               <div className=" absolute inset-y-0 right-9 -top-6 flex items-center pointer-events-none">
                  <Icon icon="weui:location-outlined" className="hidden lg:block" />
                </div>
            </div>

            <div>
              <Label
                htmlFor="companyFoundedOn"
                value="Founded On"
                className="text-gray-500 font-medium"
              />
              <Datepicker
                selected={companyDetails.companyFoundedOn}
                onChange={handleDateChange}
                className="w-full border-gray-300 rounded-md shadow-sm "
              />
             
            </div>

          

            <div>
              <Label
                htmlFor="city"
                value="City"
                className="text-gray-500 font-medium"
              />
              <TextInput
                id="city"
                name="city"
                placeholder="Enter city..."
                value={companyDetails.city}
                onChange={handleChange}
                required
              />
            </div>

            



            <div className="flex justify-center py-4">
              <Button
                className="text-white bg-gradient-to-br from-[#D100F3] to-[#002BC5] font-medium rounded-md text-sm px-6 h-10 flex items-center"
                onClick={() => {
                  // Save logic
                  console.log(companyDetails);
                  onCloseModal();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCompanyModal;
