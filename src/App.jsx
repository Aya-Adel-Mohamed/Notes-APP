
import './App.css';
import {RouterProvider, createHashRouter, Navigate} from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout.jsx';
import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import Profile from './components/Profile/profile.jsx';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function App() {
  let [userData,setUserData]= useState(null);
  function saveUser(){
   let token = localStorage.getItem("token");
   let decoded=jwt_decode(token);
   setUserData(decoded);
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      saveUser();
    }
  },[]);

  function ProductedRoute(props){
    if(localStorage.getItem('token')){
      return props.children
    }else{
      return <Navigate to='/login'/>
    }
  }
  
  function logOut(){
    localStorage.removeItem('token');
    setUserData(null);
    return <Navigate to='/login'/>
  }
  const routers = createHashRouter([
    {path:"/", element: <MainLayout userData={userData} logOut={logOut}/>,children:[
      {index:true,element:<ProductedRoute><Home/></ProductedRoute>},
      {path:'register',element:<Register/>},
      {path:'login',element:<Login saveUser={saveUser}/>},
      {path:'profile' ,element:<ProductedRoute><Profile userData={userData}/></ProductedRoute>},
      {path:'*',element:<ProductedRoute><NotFound/></ProductedRoute>}
    ]}
  ])
  return (
<>
<RouterProvider router={routers}></RouterProvider>
</>
  );
} 
export default App;
