import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button } from "flowbite-react";
import { getCompany } from "../store/Apis.js";
import AddReviewModal from "./Modals/AddReviewModal";


const CompanyDetail = () => {
  const { companyId } = useParams();

  const [company, setCompany] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!!companyId || !openModal) {
      getCompany(companyId)
        .then((res) => {
          if (res?.data) {
            setCompany(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [companyId,openModal]);

  useEffect(() => {
    if (company.reviews && company.reviews.length > 0) {
      const ratingsSum = company.reviews.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );
      const ratingsAverage = ratingsSum / company.reviews.length;
      setAverageRating(ratingsAverage);
    } else {
      setAverageRating(0); // No reviews, average is 0
    }
  }, [company.reviews]);

  // Generate stars based on the averageRating
  const renderStars = (passedRating) => {
    // If passedRating is available, use it, otherwise calculate the average rating
    const rating = passedRating !== undefined ? passedRating : averageRating;
  
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5;   // Half star if >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars
  
    return (
      <div className="text-yellow-500 text-sm flex items-center">
        {/* Render full stars */}
        {Array(fullStars).fill(null).map((_, index) => (
          <Icon key={`full-${index}`} icon="typcn:star-full-outline" style={{ color: "#d1b93d" }} />
        ))}
  
        {/* Render half star if applicable */}
        {halfStar && (
          <Icon key="half-star" icon="fluent:star-half-16-regular" style={{ color: "#ECB800" }} />
        )}
  
        {/* Render empty stars */}
        {Array(emptyStars).fill(null).map((_, index) => (
          <Icon key={`empty-${index}`} icon="lineicons:star-fat" style={{ color: "#d1b93d" }} />
        ))}
      </div>
    );
  };
  
  const formatTimestamp = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp);

      // Format date as DD-MM-YYYY
      const formattedDate = date.toLocaleDateString("en-GB"); 

      // Format time as HH:MM (24-hour format)
      const formattedTime = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return `${formattedDate.replace(/\//g, "-")} ${formattedTime}`;
    }
  };

  return (
    <>
      <div className="items-center justify-center flex ">
        <div className=" h-2 w-full flex justify-center md:max-w-[75%]">
          <span className="block w-full h-px bg-gray-300"></span>
        </div>
      </div>
      <div className="pt-1 flex items-center justify-center">
        <div className="flex flex-col items-center mt-10 w-[75%] p-4 rounded-md  shadow-lg ">
          {/* Company Info Section */}
          <div className="bg-white w-full p-6 max-w-5xl md:max-w-6xl">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 rounded-md bg-gray-400 p-2 flex items-center justify-center text-white font-bold text-4xl">
                  {company
                    ? company?.companyName?.charAt(0).toUpperCase()
                    : "A"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {company?.companyName}
                  </h2>
                  <p className="flex items-center text-gray-500 text-sm mt-1">
                    <Icon icon="weui:location-outlined" className="mr-1" />
                    {company.location}
                  </p>
                  <p className="flex flex-nowrap">
                    {averageRating.toFixed(1)}{" "}
                    <span className="flex gap-1 mt-[0.38rem] mx-2">
                      {renderStars()}
                    </span>{" "}
                    {company?.reviews?.length} Reviews
                  </p>
                </div>
              </div>

              <div className="colspan-4 flex md:flex-col flex-row gap-4 justify-between items-center  h-[120px]">
                <p className="text-[12px] text-gray-500">
                  Founded on {company.companyFoundedOn}
                </p>
                <Button
                  type="button"
                  onClick={()=>setOpenModal(true)}
                  className=" h-11 bg-gradient-to-br from-[#D100F3] to-[#002BC5] text-white font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
                >
                  <Icon icon="ic:round-plus" className="mr-1" /> Add Review{" "}
                </Button>
              </div>
            </div>
          </div>

          <div className="h-2 w-full flex justify-center mt-4">
            <span className="block w-full h-px bg-gray-300"></span>
          </div>

          {/* Reviews Section */}
          <div className="mt-6 w-full max-w-5xl md:max-w-6xl">
            <h3 className="text-md font-semibold text-gray-400">
              Result Found: {company?.reviews?.length}
            </h3>
            <div className="mt-4">
              {company?.reviews?.length > 0 ? (
                <>
                  {company?.reviews?.map((review, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md shadow-sm p-4 mb-4 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={`https://i.pravatar.cc/50?img=${index + 1}`}
                          alt="Reviewer"
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {review.fullName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTimestamp(review?.dateCreated)}
                          </p>
                          <p className="text-sm text-gray-700 mt-2">
                            {review.reviewText}
                          </p>
                        </div>
                      </div>
                      <div className="text-yellow-500 text-md  items-start">
                        {renderStars(review?.rating)}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="bg-white rounded-md shadow-sm p-4 mb-4 flex items-start justify-between gap-4">
                  No data found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddReviewModal setOpenModal={setOpenModal} openModal={openModal} companyId={companyId}/>

    </>
  );
};

export default CompanyDetail;
