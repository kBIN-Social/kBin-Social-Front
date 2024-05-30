// Navigation.js
import React from "react";
import Profile from "../Pages/Profile";
import ProfileEdit from "../Pages/ProfileEdit";
import NotFound from "../Pages/NotFound";
import ThreadDetail from "../Pages/ThreadDetail";
import Home from "../Pages/Home"
import Login from "../Pages/Login";
import Search from "../Pages/Search";
import NewLink from "../Pages/NewLink";

export const nav = [
  { path: "/", name: "Home", element: <Home />, auth: false },
  {path: "/search",name : "Login",element: <Search/> ,auth: false},
  { path: "/profile/:id", name: "Profile", element: <Profile />, auth: false },
  { path: "/profile/settings", name: "Settings", element: <ProfileEdit />, auth: true },
  {path: "/threads/:id", name: "ThreadDetail", element: <ThreadDetail></ThreadDetail>,auth:false },
  { path: "/threads/newLink", name: "NewLink", element: <NewLink />, auth: true },
  { path: "*", name: "NotFound404", element: <NotFound/>, auth: false },
  {path: "/login",name : "Login",element: <Login/> ,auth: false}
];

