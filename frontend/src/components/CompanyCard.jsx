import React, { useEffect,useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";


const CompanyCard = ({company}) => {
  const navigate = useNavigate();

  const [averageRating, setAverageRating] = useState(0);

  const handleNavigate = () => {
    navigate(`/company/${company?.companyId}`); // Navigate to the dynamic route
  };

  useEffect(() => {
    if (company.reviews && company.reviews.length > 0) {
      const ratingsSum = company.reviews.reduce((acc, curr) => acc + curr.rating, 0);
      const ratingsAverage = ratingsSum / company.reviews.length;
      setAverageRating(ratingsAverage);
    } else {
      setAverageRating(0); // No reviews, average is 0
    }
  }, [company.reviews]);

  // Generate stars based on the averageRating
  const renderStars = () => {
    const fullStars = Math.floor(averageRating); // Full stars
    const halfStar = averageRating % 1 >= 0.5;   // Half star if >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars
  
    return [
      // Render full stars
      ...Array(fullStars).fill(
        <Icon icon="typcn:star-full-outline" style={{ color: "#d1b93d" }} />
      ),
  
      // Render half star if applicable
      ...(halfStar
        ? [<Icon key="half-star" icon="fluent:star-half-16-regular" style={{ color: "#ECB800" }} />]
        : []),
  
      // Render empty stars
      ...Array(emptyStars).fill(
        <Icon icon="lineicons:star-fat" style={{ color: "#d1b93d" }} />
      ),
    ];
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero and adjust for zero-based months
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  

  return (
    <div className="sm:max-w-[70%] flex flex-wrap items-center justify-between mx-auto p-3 ">
      <div className="w-full bg-red rounded-md border border-gray-100 min-h-[142px] shadow-md grid-cols-12 flex flex-col md:flex-row justify-between items-center p-2">
        <div className="col-span-8 flex gap-5 px-1">
          <div className=" sm:h-28 sm:w-28 h-20 w-20 rounded-md bg-gray-400 p-2 flex items-center justify-center text-white font-bold text-4xl">
          {company.companyName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xl font-semibold ">{company.companyName}</p>
              <p className="flex items-baseline text-gray-500 text-sm mt-2">
                <Icon icon="weui:location-outlined" /> {company.location}
              </p>
            </div>
            <p className="flex flex-nowrap">
              {averageRating.toFixed(1)}  <span className="flex gap-1 mt-1 mx-2">{renderStars()}</span> {company.reviews.length} Reviews
            </p>
          </div>
        </div>
        <div className="colspan-4 flex md:flex-col flex-row gap-4 justify-between items-center  h-[120px]">
          <p className="text-[12px] text-gray-500">Founded on {formatDate(company.companyFoundedOn)}</p>
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
