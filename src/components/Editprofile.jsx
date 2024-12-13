import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import host from '../serverdb.json'

const colors = {
  orange: "orange",
  grey: "grey",
};

function Editprofile() {
  const { id } = useParams();
  const [users, setUsers] = useState({
    UserName: "",
    Email: "",
    Phone: "",
    Details: "",
    Country: "",
  });

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState([]);

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [star, setStar] = useState([]);

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

  // Handle file selection and preview
  const handlefile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Set image preview if the selected file is an image
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    }
  };

  const handleUpload = () => {
    if (!file) {
      console.error("No file selected!");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post(host[0].local+"upload/" + id, formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Succeded");
          window.location.reload();
        } else {
          console.log("Failed");
        }
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
      });
  };

  const [edit, setEdit] = useState(false);

  // Fetch user data from the backend
  useEffect(() => {
    axios
      .get(host[0].local+`profile/${id}`)
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data[0]);
          setData(res.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsers((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Save updated data to the backend
  const handleUpdate = () => {
    axios
      .put(host[0].local+`edit/${id}`, users)
      .then((res) => {
        console.log("Profile updated successfully:", res.data);
        setEdit(false); // Exit edit mode
      })
      .catch((err) => console.error(err));
  };

  // Toggle between view and edit mode
  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      {!edit && (
        <>
          <section class="relative pt-40 pb-24">
            <img
              src="https://pagedone.io/asset/uploads/1705473908.png"
              alt="cover-image"
              class="w-full absolute top-0 left-0 z-0 h-60 object-cover"
            />
            <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
              <div class="flex items-center justify-center sm:justify-start relative z-10 mb-5">
                <img
                  src={host[0].local+"images/" + data.ProfilePicture}
                  alt="data:image/png;base64,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"
                  class="max-w-56 border-4 border-solid border-white rounded-full object-cover"
                />
              </div>
              <div class="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
                <div class="block">
                  <h3 class="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
                    {users.UserName || "Loading..."}
                  </h3>
                  <p class="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
                    {users?.Details}
                    <br class="hidden sm:block" />
                    <br />
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
                <button
                  class="py-3.5 px-5 flex rounded-full bg-indigo-600 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700"
                  onClick={toggleEdit}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                    <line x1="3" y1="22" x2="21" y2="22"></line>
                  </svg>
                  <span class="px-2 font-semibold text-base leading-7 text-white">
                    Edit Profile
                  </span>
                </button>
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
                    Email :{" "}
                  </h6>
                  <p class="font-normal text-2xl leading-7 text-gray-500 ml-2 mt-1 max-sm:text-center">
                    {users.Email}
                  </p>
                </div>
                <div class="flex">
                  <h6 class="font-manrope font-bold text-2xl text-gray-900 mb-1 max-sm:text-center">
                    Phone :{" "}
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
                            href={"http://localhost:3000/profile/" + review.ClientID}
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
        </>
      )}

      {edit && (
        <>
          <section class="relative pt-40 pb-24">
            <img
              src="https://pagedone.io/asset/uploads/1705473908.png"
              alt="cover-image"
              class="w-full absolute top-0 left-0 z-0 h-60 object-cover"
            />
            <div class="w-full max-w-7xl mx-auto px-6 md:px-8">
              <div class="flex items-center justify-center sm:justify-start relative z-10 mb-5">
                <img
                  src={host[0].local+"images/" + data.ProfilePicture}
                  alt="user-avatar-image"
                  class="max-w-56 border-4 border-solid border-white rounded-full object-cover"
                />
                <input type="file" onChange={handlefile} />
                <button
                  className="text-white text-2xl Padding bg-teal-600"
                  onClick={handleUpload}
                >
                  Upload & Save
                </button>
              </div>
              <div class="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
                <div class="block">
                  <input
                    type="text"
                    class="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center"
                    value={users?.UserName || "Loading..."}
                    name="UserName"
                    onChange={handleInputChange}
                  />

                  <p class="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
                    Detail :{" "}
                    <input
                      type="text"
                      class="font-normal leading-7  text-base text-gray-500 mb-1 max-sm:text-center"
                      value={users?.Details}
                      name="Details"
                      onChange={handleInputChange}
                    />
                    <br class="hidden sm:block" />
                    <br />
                    Country :{" "}
                    <input
                      type="text"
                      class="font-normal leading-7  text-base text-gray-500 mb-1 max-sm:text-center"
                      value={users.Country}
                      name="Country"
                      onChange={handleInputChange}
                    />
                  </p>
                </div>
                <button
                  class="py-3.5 px-5 flex rounded-full bg-indigo-600 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700"
                  onClick={handleUpdate}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                    <line x1="3" y1="22" x2="21" y2="22"></line>
                  </svg>
                  <span class="px-2 font-semibold text-base leading-7 text-white">
                    Save
                  </span>
                </button>
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
                    Email :{" "}
                  </h6>
                  <p class="font-normal text-2xl leading-7 text-gray-500 ml-2 mt-1 max-sm:text-center">
                    <input
                      type="text"
                      class="font-normal text-2xl leading-7 text-gray-500 ml-2 mt-1 max-sm:text-center "
                      value={users.Email}
                      name="Email"
                      onChange={handleInputChange}
                    />
                  </p>
                </div>
                <div class="flex">
                  <h6 class="font-manrope font-bold text-2xl text-gray-900 mb-1 max-sm:text-center">
                    Phone :{" "}
                  </h6>
                  <p class="font-normal text-2xl leading-7 text-gray-500 ml-2 mt-1 max-sm:text-center">
                    <input
                      type="text"
                      class="font-normal text-2xl leading-7 text-gray-500 ml-2 mt-1 max-sm:text-center"
                      value={users.Phone}
                      name="Phone"
                      onChange={handleInputChange}
                    />
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Editprofile;
