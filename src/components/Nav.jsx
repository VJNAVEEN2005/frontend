import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Model from "react-modal";
import Login from "./Login";
import Signup from "./Signup";

function Nav() {

  const UserID = localStorage.getItem('userId');
  console.log(UserID)
  var itsMe = false
  var profileUrl = "/profile/";

  const navigate = useNavigate()

  if(UserID !== ''){
    console.log("Came")
    itsMe = true;
    profileUrl = profileUrl + UserID;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
    setIsOpen(false);
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setIsOpen(false);
  };

  const logOut = async () => {
    localStorage.setItem('userId','');
    await navigate('/')
    await window.location.reload();
  }

  return (
    <>
      <nav className="w-1/3 justify-end flex">
        <div className="hidden w-full justify-between md:flex">
          <NavLink to="/" className="text-white text-2xl Padding">
            Home
          </NavLink>
          <NavLink to="/project" className="text-white text-2xl Padding">
            Project
          </NavLink>
          
          {!itsMe && (
            <>
            <button className="text-white text-2xl Padding" onClick={toggleLogin} >
            Log in
          </button>
          <button
            className="text-white text-2xl Padding"
            onClick={toggleSignup}
          >
            Sign Up
          </button>
            </>
          )}

          {itsMe && (
            <>
              <NavLink to={profileUrl} className="text-white text-2xl Padding">
            Profile
          </NavLink>
          <button
            className="text-white text-2xl Padding"
            onClick={logOut}
          >
            Log out
          </button>
            </>
          )}

        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex basis-full flex-col items-center ">
          <NavLink to="/" className="text-white text-2xl Padding">
            Home
          </NavLink>
          <NavLink to="/project" className="text-white text-2xl Padding">
            Project
          </NavLink>
          
          {!itsMe && (
            <>
            <button className="text-white text-2xl Padding" onClick={toggleLogin} >
            Log in
          </button>
          <button
            className="text-white text-2xl Padding"
            onClick={toggleSignup}
          >
            Sign Up
          </button>
            </>
          )}

          {itsMe && (
            <>
            <NavLink to={profileUrl} className="text-white text-2xl Padding">
            Profile
          </NavLink>
          <button
            className="text-white text-2xl Padding"
            onClick={logOut}
          >
            Log out
          </button>
            </>
          
          )}
          
        </div>
      )}

      {isLogin && (
        <>
          <div className="left-0 right-0 top-0 bottom-0 fixed z-20 bg-gray-600 rounded-md backdrop-filter backdrop-blur-sm bg-opacity-20"></div>
          <div className="Login z-20">
            <button
              className=" absolute right-1 mx-1 my-1 px-1 py-1 rounded-full bg-gray-500 text-white"
              onClick={toggleLogin}
            >
              <X />
            </button>
            <Login />
          </div>
        </>
      )}

      {isSignup && (
        <>
          <div className="left-0 right-0 top-0 bottom-0 fixed z-20 bg-gray-600 rounded-md backdrop-filter backdrop-blur-sm bg-opacity-20"></div>
          <div className="Login z-20">
            <button
              className=" absolute right-1 mx-1 my-1 px-1 py-1 rounded-full bg-gray-500 text-white"
              onClick={toggleSignup}
            >
              <X />
            </button>
            <Signup />
          </div>
        </>
      )}
    </>
  );
}

export default Nav;
