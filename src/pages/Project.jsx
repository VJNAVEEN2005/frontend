import React, { useEffect, useState } from "react";
import Project_card from "../components/Project_card";
import axios from "axios";
import host from '../serverdb.json'

function Project() {
  const UserID = localStorage.getItem("userId");

  useEffect(() => {
    if (UserID) {
      setIsAddButton(true);
    }
    console.log("UserID:", UserID);
  }, [UserID]);

  const [values, setValues] = useState({
    id: UserID,
    title: "",
    description: ""
  });

  const [users, setUsers] = useState([]);
  const [isAddButton, setIsAddButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  function toogleProject() {
    setIsOpen(!isOpen);
  }

  const onClickSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(host[0].local+"api/projects/",values);
      console.log("Response recived:",res);
      window.location.reload();
    } catch (err) {
      console.error("Error during submition: ", err);
    }
  }
  

  return (
    <>
      {isOpen && (
        <div className="flex justify-center items-center">
          <div className="left-0 right-0 top-0 bottom-0 fixed z-20 bg-gray-600 rounded-md backdrop-filter backdrop-blur-sm bg-opacity-20"></div>
          
          <div
          class="Login project_card z-20 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <label htmlFor="">Title : </label>
            <input className="text-black" type="text" onChange={(e) => setValues({...values, title: e.target.value })}/>
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            <label htmlFor="">Description : </label>
            <input className="text-black" type="text" onChange={(e) => setValues({...values, description: e.target.value })}/>
          </p>

          <button
            onClick={onClickSubmit}
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

      {isAddButton && (
        <div>
        <button
          onClick={toogleProject}
          class=" right-3 mt-6 cursor-pointer transition-all 
        bg-teal-700 text-white px-6 py-2 rounded-lg
        border-green-400
        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none fixed"
        >
          Add Project
        </button>
      </div>
      )}

      <div className="flex flex-col justify-center mt-40">
        <Project_card />
      </div>
    </>
  );
}

export default Project;
