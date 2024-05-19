// Navigation.js
import React from "react";
import Profile from "../Pages/Profile";
import ProfileEdit from "../Pages/ProfileEdit";
import App from "../App";

export const nav = [
  { path: "/", name: "Home", element: <App />, auth: false },
  { path: "/profile/:id", name: "Profile", element: <Profile />, auth: false },
  { path: "/profile/settings", name: "Settings", element: <ProfileEdit />, auth: true },
];

