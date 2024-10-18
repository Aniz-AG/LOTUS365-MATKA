import WalletIcon from "../Images/wallet.png";
import HamburgerIcon from "../Images/Hamburger.png";
import "./LandingNavbar.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import sidebarBackground from "../Images/bg.png";
import logoutImg from "../Images/logout.png";
import logo from "../Images/logo.png";
import call24 from "../Images/call_24.png";
import Home from "../Images/home.png";
import profile from "../Images/profile.png";
import AddFund from "../Images/add.png";
import Wallet from "../Images/wallet.png";
import WinHistory from "../Images/win_history.png";
import BidHistory from "../Images/bid_history.png";
import Rating from "../Images/rating.png";
import Share from "../Images/share.png";
import ChangePass from "../Images/reset_pass.png";
import lock_icon from "../Images/lock_icon.png";
import user_profile from "../Images/user_profile.png";
import question from "../Images/question.png";
import website from "../Images/website.png";
import share_icon from "../Images/share_icon.png";
import policy from "../Images/policy.png";
import telegram_icon from "../Images/telegram_icon.png";
import acc from "../Images/acc.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { BsFileEarmarkRuledFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { MdPolicy } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { LuLogIn } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";


function LandingNavbar() {
  const Hamburg = {
    transform: "translateY(3px)",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };
  const sidebarStyle = {
    // backgroundImage: `url(${sidebarBackground})`,
    background: 'linear-gradient(to bottom, rgb(5, 46, 25) 0%, rgb(5, 56, 39) 80%)',
    backgroundSize: "cover",
    /* Add other background properties as needed */
  };

  const [isBackdropActive, setBackdropActive] = useState(false);
  const [isSidebarActive, setSidebarActive] = useState(false);
  const navigate = useNavigate();

  const handleHamburgerClick = () => {
    setBackdropActive(!isBackdropActive);
    setSidebarActive(!isSidebarActive);
  };
  const handleBackdropClick = () => {
    setBackdropActive(!isBackdropActive);
    setSidebarActive(!isSidebarActive);
  };

  const handlelogout = () => {
    navigate("login");
  };

  const handleClick = () => {
    // window.location.href = resinfo1['web_starline_chart_url'];
    window.open('https://lotus365matka.in/uploads/images/GT_1718623233.apk', '_blank');
  };
  

  return (
    <nav className=" text-white relative p-2 bg-my-gradient" >
      <div className="container flex mx-auto flex-1 justify-between items-center ">
        <div className="flex items-center ">
          <div onClick={handleHamburgerClick} style={Hamburg} className="mr-4">
            <GiHamburgerMenu className="w-[40px] h-[30px]"/>
          </div>

          <div className="text-xl fading-text">
            <div className="w-40 flex items-center font-bold text-white ">
              <marquee scrollamount="4"> LOTUS<span className="text-yellow-400">365</span> MATKA</marquee>
            </div>
          </div>

          <ul className="font-bold flex flex-shrink: 0 absolute right-10 top-15">
            <li className="flex items-center">
              <NavLink to="/login" className="flex items-center">
                <button className="bg-yellow-400 h-[30px] font-semibold py-1.5 px-4 shadow-sm shadow-black rounded-md w-full flex items-center justify-center">
                  <LuLogIn className="mr-2 text-black" />
                  <p className="text-center text-black">
                    Login
                  </p>
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          onClick={handleBackdropClick}
          className={isBackdropActive ? "backdrop--active" : "backdrop"}
        ></div>
        <div
          className={isSidebarActive ? "sidebar--active" : "sidebar"}
          style={sidebarStyle}
        >
          <div className="px-6 pt-4 pb-3 bg-my-gradient" >
            {/* User Info */}
            <div className="text-center">
              <div className="flex">
                <FaUser className="w-8 h-6 mt-2  "/>
                <div className="flex flex-col items-center justify-cente">
                <div className="text-xl font-bold ml-2">
                  {/* {username ? username : "sumit"} */}
                  Username
                </div>
                <div className="text-sm  opacity-75 ml-1 ">Phone Number</div>
                </div>
              </div>


            </div>
            {/* Logout Button */}

          </div>
          <hr className="text-white" />
          <ul className="space-y-1.5 ">

          <li className="">
              <NavLink
                to="/login"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
              >
                <IoMdHome className="w-8 h-6 ml-3 mr-2" />
                Home
              </NavLink>
            </li>
            
            {/* <li>
              <NavLink
                to="/profile"
                className="block py-2 px-4 hover:bg-gray-700 rounded-lg"
              >
                <img
                  src={profile}
                  alt="Add Funds"
                  className="w-8 h-8 mr-2 inline-block"
                />
                Profile
              </NavLink>
            </li> */}
            
            <li className="">
              <NavLink
                to="/login"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
              >
                <FaRegCreditCard className="w-8 h-6 ml-3 mr-2" />
                Add Funds
              </NavLink>
            </li>

            <li className="">
              <NavLink
                to="/login"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
              >
                <FaWallet className="w-8 h-6 ml-3 mr-2" />
                Wallet
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/login"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
              >
                <FaHistory className="w-8 h-6 ml-3 mr-2" />
                Win History
              </NavLink>
            </li>

            <li className="">
              <NavLink
                to="/login"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
              >
                <FaHistory className="w-8 h-6 ml-3 mr-2" />
                Bid History
              </NavLink>
            </li>

            <li className="">
              <NavLink
                to="/login"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
              >
                <FaBookOpen className="w-8 h-6 ml-3 mr-2" />
                How To Play
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/login"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
              >
                <FaStar className="w-8 h-6 ml-3 mr-2" />
                Game Rates
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/login"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
              >
                <IoMdSettings className="w-8 h-6 ml-3 mr-2" />
                Change Password
              </NavLink>
            </li>
      

            {/* <li className="">
              <NavLink
                to="/login"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
              >
                <MdPolicy className="w-8 h-6 ml-3 mr-2" />
                Privacy Policy
              </NavLink>
            </li>

            
            <li className="">
              <NavLink
                to="/login"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
              >
                <IoMdPeople className="w-8 h-6 ml-3 mr-2" />
                About Us
              </NavLink>
            </li> */}

            
            {/* <li>
            <div
              className="mb-4 flex items-center justify-center   "
              onClick={handleClick}
            >
              <button className=" text-xl font-bold  py-1 px-4 bg-amber-400 text-black  rounded-xl">
                {"Download APP"}
              </button>
              <div className="text-xl font-bold ml-5 bg-yellow-400 p-2 rounded-xl">{"Download APP"}</div>
            </div>
            </li> */}
            <li className="">
              <NavLink
                to="/change"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
                onClick={handleClick}
              >
                <FaDownload className="w-8 h-6 ml-3 mr-2" />
                Download App
              </NavLink>
            </li>

            {/* <li onClick={handlelogout}>
              <NavLink className="block py-2 px-4 hover:bg-gray-700 rounded-lg">
                <img
                  src={logoutImg}
                  alt="User Profile"
                  className="w-8 h-8 mr-2 inline-block"
                />
                Log out
              </NavLink>
            </li> */}

            <hr className="my-4" />
          </ul>
          <div className="flex flex-col p-4">
          <button type="button" className=" bg-yellow-600 hover:bg-yellow-500  focus:outline-none text-white  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={()=>{navigate('/login')}}>My Profile</button>
          <button type="button" className="text-white bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={handlelogout}>Login</button>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default React.memo(LandingNavbar);
