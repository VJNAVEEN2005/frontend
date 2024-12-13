import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Profileheader from "../components/Profileheader";
import Editprofile from "../components/Editprofile";
import host from '../serverdb.json'

function Profile() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const UserID = localStorage.getItem("userId");
  console.log(UserID);
  var itsMe = false;

  if (UserID == id) {
    console.log("Came");
    itsMe = true;
  }

  

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

  return (
    <>
      {!itsMe && (
        
        <>
        <Profileheader/>
        </>
      )}

      {
        itsMe && (

          <Editprofile/>

        )
      }
      
    </>
  );
}

export default Profile;
