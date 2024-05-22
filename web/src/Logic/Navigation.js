// Navigation.js
import React from "react";
import Profile from "../Pages/Profile";
import ProfileEdit from "../Pages/ProfileEdit";
import NotFound from "../Pages/NotFound";
import App from "../App";
import ThreadDetail from "../Components/ThreadDetail";

export const nav = [
  { path: "/", name: "Home", element: <App />, auth: false },
  { path: "/profile/:id", name: "Profile", element: <Profile />, auth: false },
  { path: "/profile/settings", name: "Settings", element: <ProfileEdit />, auth: true },
  {path: "/threads/detail", name: "ThreadDetail", element: <ThreadDetail></ThreadDetail>,auth:false }
  { path: "*", name: "NotFound404", element: <NotFound/>, auth: false },
];

