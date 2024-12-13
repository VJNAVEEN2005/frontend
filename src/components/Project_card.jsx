import React, { useEffect, useState } from "react";
import "./Project_card.scss";
import axios from "axios";
import host from '../serverdb.json'

function Project_card() {
  const [data, setData] = useState([]);
  const UserID = localStorage.getItem("userId");

  const [values, setValues] = useState({
    projectId: "",
    clientId: UserID,
    title: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(host[0].global+"projects")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    console.log(data);
    console.log(host[0])
  }, []);

  const handleDelete = (projectId) => {
    axios
      .delete(host[0].local+"projects/delete/" + projectId)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(host[0].local+"projects/edit/" + values.projectId, values)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const [isOpen, setIsOpen] = useState(false);

  function toogleProject(project) {
    // Open the edit modal and set the current project details
    setIsOpen(!isOpen);
    setValues({
      projectId: project.ProjectID,
      clientId: project.ClientID,
      title: project.Title,
      description: project.Description,
    });
  }

  return (
    <>
      {data.map((project, index) => {
        const isUserProject = UserID === project.ClientID;
        const cardClass = isUserProject
          ? "dark:bg-gray-800"
          : "dark:bg-teal-500";
        const edit = isUserProject ? (
          <div className="mt-3">
            <button
              onClick={() => toogleProject(project)} // Pass the project to the toggle function
              className="cursor-pointer transition-all bg-blue-500 text-white px-4 py-1 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(project.ProjectID)}
              className="cursor-pointer ml-7 transition-all bg-red-500 text-white px-4 py-1 rounded-lg border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Delete
            </button>
          </div>
        ) : (
          <div></div>
        );

        return (
          <>
            <a
              href={
                !isUserProject &&
                "http://localhost:3000/profile/" + project.ClientID
              }
              className={
                "block project_card bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 mb-6 " +
                cardClass
              }
            >
              <div className="flex flex-row animate_transition">
                <div className=" min-w-32 flex flex-col justify-center items-center bg-teal-700 mr-6 profileInProject">
                  <img
                    src={host[0].local+"images/" + project.ProfilePicture}
                    alt={host[0].local+"images/download.jpg"}
                    class="max-w-20 border-4 border-solid border-white rounded-full object-cover"
                  />
                  <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {project.UserName}
                  </h1>
                </div>
                <div className="mt-5 mb-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {project.Title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-white">
                    {project.Description}
                  </p>
                  {edit}
                </div>
              </div>
            </a>

            {isOpen && (
              <div className="flex justify-center items-center">
                <div className="left-0 right-0 top-0 bottom-0 fixed z-20 bg-gray-600 rounded-md backdrop-filter backdrop-blur-sm bg-opacity-20"></div>

                <div className="Login project_card z-20 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <label htmlFor="">Title : </label>
                    <input
                      className="text-black"
                      placeholder="Title"
                      type="text"
                      value={values.title} // Bind state value to input
                      onChange={(e) =>
                        setValues({ ...values, title: e.target.value })
                      }
                    />
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <label htmlFor="">Description : </label>
                    <input
                      className="text-black"
                      placeholder="Description"
                      type="text"
                      value={values.description} // Bind state value to input
                      onChange={(e) =>
                        setValues({ ...values, description: e.target.value })
                      }
                    />
                  </p>

                  <button
                    onClick={onClickSubmit}
                    type="submit"
                    className="flex justify-center gap-2 mt-3 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                  >
                    Submit
                    <svg
                      className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                      viewBox="0 0 16 19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                        className="fill-gray-800 group-hover:fill-gray-800"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );
}

export default Project_card;
