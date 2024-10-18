import logo from "./Images/logo.png";
import { BiArrowBack } from "react-icons/bi";
import topBackground from './Images/bg.png';
import { useNavigate } from "react-router-dom";
import useHowtoPlay from "./Hooks/useHowtoPlay";
import { useState, useEffect } from "react";

function Htp() {
  
  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([]);
  const divStyle = {
    padding: "20px",
    borderBottom: '2px solid white'
  };
  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
    position: "relative",
  };
  const backStyle = {
    backgroundSize: 'cover', // This will make the background image cover the container without 
    backgroundPosition: 'center',
    position:'relative'
  };

  const navigate = useNavigate();
  const back = () => {
    navigate("/imp");
  };
  const resinfo = useHowtoPlay();
  useEffect(() => {
    if (resinfo && resinfo["result"]) {
      setStatus(true);
      setGameRates(resinfo["result"]);
    }
  }, [resinfo]);
  console.log(resinfo);

  const renderHowToPlayContent = () => {
    return {__html: resinfo?.content?.[0]?.how_to_play_content};
  }

  return (
    <div className="relative h-svh">
                <div className="font-bold flex items-center justify-center text-2xl mt-2 mb-2"><h1>How To Play</h1></div>
      
      <div className="flex items-center justify-center border w-auto py-3 shadow-md " style={backStyle}>
        
        <div className="text-black flex flex-col p-5" dangerouslySetInnerHTML={renderHowToPlayContent()}>
        </div>
      </div>
    </div>
  );
}
export default Htp;
