import React from "react";
import { Outlet } from "react-router-dom";
import HomePage from "../../website/HomePage";

const NavbarLayout = () => {
  return (
    <>
      <HomePage />
      <Outlet />
    </>
  );
};

export default NavbarLayout;
