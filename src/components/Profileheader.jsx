import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import host from '../serverdb.json'

const colors = {
  orange: "orange",
  grey: "grey",
};

function Profileheader() {
  const UserID = localStorage.getItem("userId");

  const [isReviewButton, setIsReviewButton] = useState(false);

  useEffect(() => {
    if (UserID) {
      setIsReviewButton(true);
    }
    console.log("UserID:", UserID);
  }, [UserID]);

  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [star, setStar] = useState([]);

  useEffect(() => {
    axios
      .get(host[0].local+"profile/" + id)
      .then((res) => {
        console.log("Hello");
        console.log(id);
        console.log(res);
        setUsers(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  // project review

  useEffect(() => {
    axios
      .get(host[0].local+"reviews/" + id)
      .then((res) => {
        console.log("Hello");
        console.log(id);
        console.log(res);
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(host[0].local+"reviews/star/" + id)
      .then((res) => {
        console.log("Hello");
        console.log(id);
        console.log(res);
        setStar(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (UserID) {
      setIsAddButton(true);
    }
    console.log("UserID:", UserID);
  }, [UserID]);

  const [isAddButton, setIsAddButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toogle() {
    setIsOpen(!isOpen);
  }

  const [rating, setRating] = useState(null);
  const [rateColor, setColor] = useState(null);

  const [values, setValues] = useState({
    rating: "",
    feedback: "",
    clientid: UserID,
  });

  const onSubmitRatings = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        host[0].local+"profile/reviews/" + id,
        values
      );
      console.log("Response recived:", res);
      window.location.reload();
    } catch (err) {
      console.error("Error during submition: ", err);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="flex justify-center items-center">
          <div className="left-0 right-0 top-0 bottom-0 fixed z-20 bg-gray-600 rounded-md backdrop-filter backdrop-blur-sm bg-opacity-20"></div>

          <div class="Login  z-20 flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <label htmlFor="">Star Ratings</label>
            </h5>

            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const currentRate = index + 1;
                return (
                  <div>
                    <label key={index}>
                      <input
                        type="radio"
                        name="rate"
                        onChange={(e) =>
                          setValues({ ...values, rating: e.target.value })
                        }
                        value={currentRate}
                        onClick={() => setRating(currentRate)}
                        style={{ display: "none" }}
                      />
                      <FaStar
                        size={20}
                        color={
                          currentRate <= (rateColor || rating)
                            ? colors.orange
                            : colors.grey
                        }
                        onMouseEnter={() => setColor(currentRate)}
                        onMouseLeave={() => setColor(null)}
                      />
                    </label>
                  </div>
                );
              })}
            </div>

            <p class="font-normal text-gray-700 dark:text-gray-400">
              <label
                for="message"
                class="block mb-2 mt-4 text-lg font-medium text-gray-900 dark:text-white"
              >
                Comment
              </label>
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                onChange={(e) =>
                  setValues({ ...values, feedback: e.target.value })
                }
              ></textarea>
            </p>

            <button
              onClick={onSubmitRatings}
              type="submit"
              class="flex justify-center gap-2 mt-3 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
            >
              Submit
              <svg
                class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  class="fill-gray-800 group-hover:fill-gray-800"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      <section class="relative pt-40 pb-24">
        <img
          src="https://pagedone.io/asset/uploads/1705473908.png"
          alt="cover-image"
          class="w-full absolute top-0 left-0 z-0 h-60 object-cover"
        />
        <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div class="flex items-center justify-center sm:justify-start relative z-10 mb-5">
            <img
              src={host[0].local+"images/" + users.ProfilePicture}
              alt={host[0].local+"images/download.jpg"}
              class="max-w-56 border-4 border-solid border-white rounded-full object-cover"
            />
          </div>
          <div class="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
            <div class="block">
              <h3 class="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
                {users?.UserName || "Loading..."}
              </h3>
              <p class="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
                {users?.Details}
                <br class="hidden sm:block" />
                {users.Country}
              </p>

              <div className="flex">
                {[...Array(5)].map((_, index) => {
                  const currentRate = index + 1;
                  return (
                    <div>
                      <label key={index}>
                        <input
                          type="radio"
                          name="rate"
                          value={currentRate}
                          style={{ display: "none" }}
                        />
                        <FaStar
                          size={20}
                          color={
                            Number(star.sum) <= currentRate - 1
                              ? colors.grey
                              : colors.orange
                          }
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {isReviewButton && (
              <button
                onClick={toogle}
                class="py-3.5 px-5 flex rounded-full bg-teal-400 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <linearGradient
                    id="in1UIHSdQC_ki_aW55SLra_XFOumBmRR5zT_gr1"
                    x1="32.5"
                    x2="32.5"
                    y1="4.133"
                    y2="26.221"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#0471c7"></stop>
                    <stop offset="1" stop-color="#0968b5"></stop>
                  </linearGradient>
                  <path
                    fill="url(#in1UIHSdQC_ki_aW55SLra_XFOumBmRR5zT_gr1)"
                    d="M44,4H21c-0.552,0-1,0.448-1,1v14c0,0.552,0.448,1,1,1h6v4.874	c0,0.415,0.502,0.623,0.796,0.33L33,20h11c0.552,0,1-0.448,1-1V5C45,4.448,44.552,4,44,4z"
                  ></path>
                  <linearGradient
                    id="in1UIHSdQC_ki_aW55SLrb_XFOumBmRR5zT_gr2"
                    x1="11.091"
                    x2="20.16"
                    y1="16.09"
                    y2="25.16"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#32bdef"></stop>
                    <stop offset="1" stop-color="#1ea2e4"></stop>
                  </linearGradient>
                  <circle
                    cx="15.5"
                    cy="20.5"
                    r="6.5"
                    fill="url(#in1UIHSdQC_ki_aW55SLrb_XFOumBmRR5zT_gr2)"
                  ></circle>
                  <linearGradient
                    id="in1UIHSdQC_ki_aW55SLrc_XFOumBmRR5zT_gr3"
                    x1="7.772"
                    x2="23.178"
                    y1="32.098"
                    y2="47.504"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#32bdef"></stop>
                    <stop offset="1" stop-color="#1ea2e4"></stop>
                  </linearGradient>
                  <path
                    fill="url(#in1UIHSdQC_ki_aW55SLrc_XFOumBmRR5zT_gr3)"
                    d="M27,40.5c0-6.423-5.266-11.616-11.715-11.498C8.954,29.118,4,34.549,4,40.881L4,43.5	c0,0.552,0.448,1,1,1h21c0.552,0,1-0.448,1-1V40.5z"
                  ></path>
                </svg>
                <span class="px-2 font-semibold text-base leading-7 text-white">
                  Review
                </span>
              </button>
            )}

            <a
              href={"mailto:" + users.Email}
              class="py-3.5 px-5 flex rounded-full bg-indigo-600 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3011 8.69881L8.17808 11.8219M8.62402 12.5906L8.79264 12.8819C10.3882 15.6378 11.1859 17.0157 12.2575 16.9066C13.3291 16.7974 13.8326 15.2869 14.8397 12.2658L16.2842 7.93214C17.2041 5.17249 17.6641 3.79266 16.9357 3.0643C16.2073 2.33594 14.8275 2.79588 12.0679 3.71577L7.73416 5.16033C4.71311 6.16735 3.20259 6.67086 3.09342 7.74246C2.98425 8.81406 4.36221 9.61183 7.11813 11.2074L7.40938 11.376C7.79182 11.5974 7.98303 11.7081 8.13747 11.8625C8.29191 12.017 8.40261 12.2082 8.62402 12.5906Z"
                  stroke="white"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
              <span class="px-2 font-semibold text-base leading-7 text-white">
                Send Message
              </span>
            </a>
          </div>
          <div class="flex max-sm:flex-wrap max-sm:justify-center items-center gap-4">
            <a
              href="javascript:;"
              class="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              Ux Research
            </a>
            <a
              href="javascript:;"
              class="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              CX Strategy
            </a>
            <a
              href="javascript:;"
              class="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              Project Manager
            </a>
          </div>
        </div>
      </section>
      <section class="relative pt-0 pb-24">
        <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div class="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
            <div class="flex">
              <h6 class="font-manrope font-bold text-2xl text-gray-900 mb-1 max-sm:text-center">
                Email:{" "}
              </h6>
              <p class="font-normal text-2xl leading-7 text-gray-500 ml-2 mt-1 max-sm:text-center">
                {users.Email}
              </p>
            </div>
            <div class="flex">
              <h6 class="font-manrope font-bold text-2xl text-gray-900 mb-1 max-sm:text-center">
                Phone:{" "}
              </h6>
              <p class="font-normal text-2xl leading-7 text-gray-500 ml-2 mt-1 max-sm:text-center">
                {users.Phone}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="ml-8 mr-8">
        <h1 className="font-manrope font-bold text-2xl text-gray-900 max-sm:text-center mb-6">
          Reviews
        </h1>
        <div className="flex flex-wrap justify-evenly">
          {reviews.map((review, index) => {
            return (
              <>
                <a
                  href={host[0].local+"profile/" + review.ClientID}
                  class="flex justify-center relative top-1/3 hover:scale-105 transition-all"
                >
                  <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border-4 border-t-emerald-600 border-b-emerald-200 border-l-emerald-200 border-r-emerald-200 rounded-lg bg-teal-100 shadow-lg">
                    <div class="relative flex gap-4">
                      <img
                        src={
                          host[0].local+"images/" +
                          review.ProfilePicture
                        }
                        class="relative rounded-full -top-8 -mb-4 bg-white border h-20 w-20"
                        alt=""
                        loading="lazy"
                      />
                      <div class="flex flex-col w-full">
                        <div class="flex flex-row justify-between">
                          <p class="relative text-xl whitespace-nowrap truncate overflow-hidden font-bold">
                            {review.UserName}
                          </p>
                          <a class="text-gray-500 text-xl" href="#">
                            <i class="fa-solid fa-trash"></i>
                          </a>
                        </div>
                        <p class="text-gray-400 text-sm">{review.CreatedAt}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => {
                        const currentRate = index + 1;
                        return (
                          <div>
                            <label key={index}>
                              <input
                                type="radio"
                                name="rate"
                                value={currentRate}
                                style={{ display: "none" }}
                              />
                              <FaStar
                                size={20}
                                color={
                                  Number(review.Rating) <= currentRate - 1
                                    ? colors.grey
                                    : colors.orange
                                }
                              />
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    <p class="-mt-4 text-gray-500 font-semibold">
                      {review.Feedback}
                    </p>
                  </div>
                </a>
              </>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Profileheader;
