import WalletIcon from "./Images/wallet.png";
import HamburgerIcon from "./Images/Hamburger.png";
import "./Navbar.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import "./Sidebar.css";
import sidebarBackground from "./Images/bg.jpg";
import logoutImg from "./Images/logout.png";
import logo from "./assets/ICONS AND BACKGROUNDS/Transparent logo.png";
import call24 from "./Images/call_24.png";
import Home from "./Images/home.png";
import profile from "./Images/profile.png";
import AddFund from "./Images/add.png";
import Wallet from "./Images/wallet.png";
import WinHistory from "./Images/win_history.png";
import BidHistory from "./Images/bid_history.png";
import Rating from "./Images/rating.png";
import Share from "./Images/share.png";
import ChangePass from "./Images/reset_pass.png";
import lock_icon from "./Images/lock_icon.png";
import user_profile from "./Images/user_profile.png";
import question from "./Images/question.png";
import website from "./Images/website.png";
import share_icon from "./Images/share_icon.png";
import policy from "./Images/policy.png";
import telegram_icon from "./Images/telegram_icon.png";
import acc from "./Images/acc.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./Util/loginSlice";
import useGameFront from "./Hooks/useGameFront";
import { removePass } from "./Util/passslice";
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
import { RiUser3Fill } from "react-icons/ri";
import { FaDownload } from "react-icons/fa6";
function Navbar() {
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

  const username = useSelector((state) => state.userDetail.username);
  const token = useSelector((state) => state.userDetail.token);
  const mobile = useSelector((state) => state.userDetail.mobile);
  const [isBackdropActive, setBackdropActive] = useState(false);
  const [isSidebarActive, setSidebarActive] = useState(false);
  const navigate = useNavigate();
  const resinfo = useGameFront(token);
  console.log(resinfo);
  const telegram = resinfo["telegram_no"];
  console.log("phone number:",telegram);

  const handleHamburgerClick = () => {
    console.log(isBackdropActive);
    setBackdropActive(!isBackdropActive);
    setSidebarActive(!isSidebarActive);
  };
  const handleBackdropClick = () => {
    console.log(isBackdropActive);
    setBackdropActive(!isBackdropActive);
    setSidebarActive(!isSidebarActive);
  };
  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(logout());
    dispatch(removePass());
    navigate('/') 
  }
  const handleSidebarItemClick = () => {
    setBackdropActive(false);
    setSidebarActive(false);
  };

  const handleClick = () => {
    // window.location.href = resinfo1['web_starline_chart_url'];
    window.open('https://lotus365matka.in/uploads/images/GT_1718623233.apk', '_blank');
  };

  const handleClick1 = () => {
    handleSidebarItemClick();
    navigate('/profile');
  };  

  return (
    <nav className=" text-white relative p-2" style={{background :'rgba(30,50,35,255)'}}>
      <div className="container flex mx-auto flex-1 justify-between items-center ">
        <div className="flex items-center ">
          <div onClick={handleHamburgerClick} style={Hamburg} className="mr-4">
            <GiHamburgerMenu className="w-[40px] h-[30px]"/>
          </div>

          <div className="text-xl fading-text">
            <div className="w-40 flex items-center text-white font-bold ">
              <marquee scrollamount="4"> LOTUS<span className="text-yellow-400">365</span> MATKA</marquee>
            </div>
          </div>

          <ul className="font-bold text-lg flex flex-shrink: 0 absolute right-10 top-15">
            <li className="flex items-center">
              <NavLink to="/imp7" className=" flex items-center">
              <FaWallet className="w-8 h-6 mr-2" />
                <span>{resinfo.wallet_amt}</span>
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
          <div className="px-6 pt-4 pb-3  text-white bg-my-gradient" >
            {/* User Info */}
            <div className="text-center">
              <div className="flex">
                <FaUser className="w-8 h-6 mt-2  "/>
                <div className="flex flex-col">
                {/* <RiUser3Fill className="w- h-10 mt-2"/> */}
                <div className="text-xl font-bold ml-1">
                  {username ? username.substring(0,10).concat(username.length>10?"...":""): "sumit"}

                </div>
                <div className="text-sm opacity-75 ml-1 ">{mobile}</div>
                </div>
              </div>
            </div>
            {/* Logout Button */}

          </div>
          <hr className="text-white" />
          <ul className="space-y-1.5 ">

          <li className="">
              <NavLink
                to="/imp"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg "
                onClick={handleSidebarItemClick}             
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
                to="/imp9"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
                onClick={handleSidebarItemClick}
              >
                <FaRegCreditCard className="w-8 h-6 ml-3 mr-2" />
                Add Funds
              </NavLink>
            </li>

            <li className="">
              <NavLink
                to="/imp7"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
                onClick={handleSidebarItemClick}
              >
                <FaWallet className="w-8 h-6 ml-3 mr-2" />
                Wallet
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/imp3"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
                onClick={handleSidebarItemClick}
              >
                <FaHistory className="w-8 h-6 ml-3 mr-2" />
                Win History
              </NavLink>
            </li>

            <li className="">
              <NavLink
                to="/imp4"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
                onClick={handleSidebarItemClick}
              >
                <FaHistory className="w-8 h-6 ml-3 mr-2" />
                Bid History
              </NavLink>
            </li>

            {/* <li className="">
              <NavLink
                to="/htp"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
                onClick={handleSidebarItemClick}
              >
                <FaBookOpen className="w-8 h-6 ml-3 mr-2" />
                How To Play
              </NavLink>
            </li> */}
            <li className="">
              <NavLink
                to="/gameRates"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
                onClick={handleSidebarItemClick}
              >
                <FaStar className="w-8 h-6 ml-3 mr-2" />
                Game Rates
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/change"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
                onClick={handleSidebarItemClick}
              >
                <IoMdSettings className="w-8 h-6 ml-3 mr-2" />
                Change Password
              </NavLink>
            </li>
            <li className="">
              <NavLink
                // to="/change"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
                onClick={handleClick}
              >
                <FaDownload className="w-8 h-6 ml-3 mr-2" />
                Download App
              </NavLink>
            </li>
      

            {/* <li className="">
              <NavLink
                to="/privacy"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
              >
                <MdPolicy className="w-8 h-6 ml-3 mr-2" />
                Privacy Policy
              </NavLink>
            </li> */}

            
            {/* <li className="">
              <NavLink
                to="/about"
                className= "flex   py-2 px-4 hover:bg-white hover:text-black rounded-lg"
                onClick={handleSidebarItemClick}
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
          <button  type="button" className="text-white bg-yellow-600 hover:bg-yellow-500 border rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " onClick={handleClick1}>My Profile</button>
          <button type="button" className="text-white bg-yellow-600 hover:bg-yellow-500 rounded-lg border text-sm px-5 py-2.5 me-2 mb-2" onClick={handlelogout}>Logout</button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default React.memo(Navbar);
