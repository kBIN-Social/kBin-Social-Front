import React from "react";
import { Route, Routes } from "react-router-dom";
//import { UserContext} from "./UserContext";
import { useUser } from "./UserContext";
import { nav } from "./Navigation";

export const RenderRoutes = () => {
  const user = useUser();

  return (
    <Routes>
        <>
          {nav.map((page) => (
            page.auth === false || (page.auth && user) ?  
              <Route
                key={page.path}
                path={page.path}
                element={page.element} // Pasar el token como prop al elemento
              />
            :
              null
          ))}
        </>
    </Routes>
  );
};

