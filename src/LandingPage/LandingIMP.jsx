import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LandingNavbar from "./LandingNavbar";
import LandingTop from "./LandingTop";
import GameFront from "../GameFRONT";
import support from "../assets/ICONS AND BACKGROUNDS/customersupport.png";
import whatsapp from "../assets/ICONS AND BACKGROUNDS/whatsapp.png";
import telegram from "../assets/ICONS AND BACKGROUNDS/telegram.png";
import call from "../assets/ICONS AND BACKGROUNDS/call.png";
import useGameFront from "../Hooks/useGameFront";

function LandingImp() {
  const topStyle = {
    backgroundSize: 'cover',
    height: 'auto',
    width: '100%',
    paddingBottom: '20px'
  };

  const navigate = useNavigate();
  const [showSupport, setShowSupport] = useState(false);
  

  const token = useSelector((state) => state.userDetail.token);

  const resinfo = useGameFront(token);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [telegramNumber, setTelegramNumber] = useState('');

  useEffect(() => {
    if (resinfo) {
      setPhoneNumber(resinfo["mobile_1"] || "1234567890"); // Fallback if no mobile is found
      setTelegramNumber(resinfo["telegram_no"] || "username"); // Fallback if no telegram is found
    }
  }, [resinfo]);

  const memoizedNavbar = useMemo(() => <LandingNavbar />, []);
  const memoizedTop = useMemo(() => <LandingTop />, []);

  const toggleSupportIcons = () => {
    setShowSupport(!showSupport); // Toggle visibility
  };

  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const telegramUrl = `https://t.me/${telegramNumber}`;
  const callUrl = `tel:${phoneNumber}`;

  return (
    <>
      <div className="relative">
        {memoizedNavbar}
        {memoizedTop}
        <div className="" style={topStyle} onClick={() => navigate("/login")}>
          <GameFront />
        </div>

        {/* Floating customer support icon */}
        <div className="fixed bottom-[20px] right-[5px]">
          <div className="bg-white flex flex-col gap-[2px] justify-center items-center shadow-2xl border p-1 rounded-lg">
            <img
              src={support}
              alt="Support"
              className="w-10 h-10 cursor-pointer"
              onClick={toggleSupportIcons}
            />
            <p className="font-bold text-sm">Support</p>
          </div>

          {/* Support icons (WhatsApp, Telegram, Call) */}
          {showSupport && (
            <div className="absolute bottom-16 z-5 right-0 flex flex-col items-center space-y-3">
              <div className="bg-white shadow-lg p-1 rounded-xl">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <img src={whatsapp} alt="WhatsApp" className="w-12 h-12" />
                </a>
              </div>

              <div className="bg-white shadow-lg p-1 rounded-xl">
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                  <img src={telegram} alt="Telegram" className="w-10 h-10" />
                </a>
              </div>

              <div className="bg-white shadow-lg p-1 rounded-xl">
                <a href={callUrl}>
                  <img src={call} alt="Call" className="w-12 h-12" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LandingImp;
