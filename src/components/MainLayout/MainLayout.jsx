import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout({ userData, logOut }){
    return(
     <>
     <Navbar userData = { userData } logOut = {logOut}/>
     <Outlet></Outlet>
     </>
    )
}