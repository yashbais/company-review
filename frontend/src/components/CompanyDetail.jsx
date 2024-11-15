import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button } from "flowbite-react";

const CompanyDetail = () => {
  const { id } = useParams();

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
                  G
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Graffersid Web and App Development
                  </h2>
                  <p className="flex items-center text-gray-500 text-sm mt-1">
                    <Icon icon="weui:location-outlined" className="mr-1" />
                    816, Shekhar Central, Manorama Ganj, AB Road, New Palasia,
                    Indore (M.P.)
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="ml-2 text-gray-700">4.5</span>
                    <span className="text-yellow-500 text-lg ">
                      ⭐⭐⭐⭐⭐
                    </span>
                    <span className="text-gray-500">(41 Reviews)</span>
                  </div>
                </div>
              </div>

              <div className="colspan-4 flex md:flex-col flex-row gap-4 justify-between items-center  h-[120px]">
                <p className="text-[12px] text-gray-500">
                  Founded on 01-01-2016
                </p>
                <Button
                  type="button"
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
              Result Found: 5
            </h3>
            <div className="mt-4">
              {[1, 2, 3].map((review, index) => (
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
                        Jorgue Watson
                      </p>
                      <p className="text-xs text-gray-500">01-01-2022, 14:33</p>
                      <p className="text-sm text-gray-700 mt-2">
                        Graffersid is one of the best companies. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Aliquam
                        pulvinar enim nec elit suscipit, at dictum ipsum
                        suscipit.
                      </p>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-sm self-center">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetail;
