/* eslint-disable jsx-a11y/anchor-is-valid */

import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { addReview } from "../../store/Apis";


const AddReviewModal = ({ setOpenModal, openModal,companyId }) => {
  const [review, setReview] = useState({
    fullName: "",
    subject: "",
    reviewText: "",
    rating: "",
  });

  function onCloseModal() {
    setOpenModal(false);
    setReview({
      fullName: "",
      subject: "",
      reviewText: "",
      rating: 0,
    });
  }

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleStarClick = (index) => {
    setReview({...review, rating : index + 1}); // Set the rating to the clicked star's index (1-based index)
  };

  const addReviewApi = async ()=>{
    await addReview({...review, companyId})
    onCloseModal();
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      // Check if the current star should be filled
      const isFilled = index < review.rating; // If index is less than rating, the star is filled

      return (
        <div
          key={index}
          onClick={() => handleStarClick(index)}
          style={{ cursor: "pointer", display: "inline-block" }}
        >
          {isFilled ? (
            <Icon icon="typcn:star-full-outline" style={{ color: "#d1b93d" }} />
          ) : (
            <Icon icon="lineicons:star-fat" style={{ color: "#d1b93d" }} />
          )}
        </div>
      );
    });
  };

  return (
    <>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
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
        <div className="w-full  flex items-center justify-center ">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            Add Review
          </h3>
        </div>

        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="fullName"
                value="Full Name"
                className="text-gray-500 font-medium"
              />
              <TextInput
                id="fullName"
                name="fullName"
                placeholder="Enter..."
                value={review.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label
                htmlFor="subject"
                value="Subject"
                className="text-gray-500 font-medium"
              />
              <TextInput
                id="subject"
                name="subject"
                placeholder="Enter..."
                value={review.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label
                htmlFor="Enter your review"
                value="Enter your review"
                className="text-gray-500 font-medium"
              />

              <Textarea
                placeholder="Description..."
                required
                rows={4}
                name="reviewText"
                value={review.reviewText}
                onChange={handleChange}
              />
            </div>

            <div>
              <p className="text-xl font-semibold mb-1">Rating</p>
              <div className="text-4xl">{renderStars()}</div>
            </div>


            <div className="flex justify-center py-4">
              <Button
              className="h-9 text-white bg-gradient-to-br from-[#D100F3] to-[#002BC5] font-medium rounded-md text-sm px-4 py-2 flex items-center gap-1 w-full sm:w-auto "
              onClick={() => {
               
                  addReviewApi()
                

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

export default AddReviewModal;
