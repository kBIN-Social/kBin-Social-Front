// Navigation.js
import React from "react";
import Profile from "../Pages/Profile";
import ProfileEdit from "../Pages/ProfileEdit";
import NotFound from "../Pages/NotFound";
import ThreadDetail from "../Pages/ThreadDetail";
import Home from "../Pages/Home"
import Login from "../Pages/Login";
import ListMagazines from "../Pages/ListMagazines";
import MagazineForm from "../Components/MagazineForm";
import MagazineDetail from "../Pages/MagazineDetail"
import Search from "../Pages/Search";
import NewLink from "../Pages/NewLink";
import NewThread from "../Pages/NewThread";
import EditThread from "../Pages/EditThread";

export const nav = [
  { path: "/", name: "Home", element: <Home />, auth: false },
  {path: "/search",name : "Login",element: <Search/> ,auth: false},
  { path: "/newLink", name: "NewLink", element: <NewLink/>, auth: false },
  { path: "/newThread", name: "NewThread", element: <NewThread/>, auth: false },
  { path: "/threads/:id/edit", name: "EditThread", element: <EditThread/>, auth: false },
  { path: "/profile/:id", name: "Profile", element: <Profile />, auth: false },
  { path: "/profile/settings", name: "Settings", element: <ProfileEdit />, auth: true },
  {path: "/threads/:id", name: "ThreadDetail", element: <ThreadDetail></ThreadDetail>,auth:false },
  { path: "*", name: "NotFound404", element: <NotFound/>, auth: false },
  {path: "/login",name : "Login",element: <Login/> ,auth: false},
  {path: "/magazines/", name: "MagazineList", element: <ListMagazines/> ,auth:false },
  {path: "/magazines/:id", name: "MagazineDetail", element: <MagazineDetail/> ,auth:false },
  {path: "/newMagazine", name: "MagazineCreation", element: <MagazineForm/> ,auth:false }
];

