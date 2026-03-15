import React from "react";
import { NavLink } from "react-router";
import ProFastLogo from "./ProFastLogo";
import { MdOutlineArrowOutward } from "react-icons/md";

const Navbar = () => {
  const activeLink = "font-bold bg-trust-lime  border-b-2 border-trust-lime";
  const normalLink = "text-trust-dark  transition-colors";


  const navItems = <>
    <li><NavLink to="/" end className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink></li>
    <li><NavLink to="/services" className={({ isActive }) => isActive ? activeLink : normalLink}>Services</NavLink></li>
    <li><NavLink to="/coverage" className={({ isActive }) => isActive ? activeLink : normalLink}>Coverage</NavLink></li>
    <li><NavLink to="/about" className={({ isActive }) => isActive ? activeLink : normalLink}>About Us</NavLink></li>
    <li><NavLink to="/pricing" className={({ isActive }) => isActive ? activeLink : normalLink}>Pricing</NavLink></li>
    <li><NavLink to="/rider" className={({ isActive }) => isActive ? activeLink : normalLink}>Be a Rider</NavLink></li>
  </>



  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <ProFastLogo></ProFastLogo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost">Sign In</button>
        <button className="btn border-none btn-primary bg-trust-lime text-black ml-2">Sign Up
          <span className="text-2xl"><MdOutlineArrowOutward /></span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
