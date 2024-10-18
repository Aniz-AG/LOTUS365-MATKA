import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import useGaliGameFront from "./Hooks/useGaliGameFront";
import open from "./assets/ICONS AND BACKGROUNDS/play now.png";
import closed from "./assets/ICONS AND BACKGROUNDS/closed.png";
import running from "./assets/ICONS AND BACKGROUNDS/35.0.png"; // Import the running icon
import closedIcon from "./assets/ICONS AND BACKGROUNDS/36.0.png"; // Import the closed icon

function GALIGAME() {
  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([{}]);
  const unique = useSelector((state) => state.userDetail.token);

  const resinfo = useGaliGameFront();
  useEffect(() => {
    if (resinfo && resinfo["result"]) {
      setStatus(true);
      setGameRates(resinfo["result"]);
    }
  }, [resinfo]);

  const navigate = useNavigate();

  return (
    <div className="px-5 mt-2 z-1">
      {gameRates.map((game) => (
        <div
          key={game.game_id}
          className="mb-10 border-2 border-black shadow-md rounded-lg flex flex-col bg-white relative"
        >
         <div className="relative">
            <div className="absolute top-[-25px] right-[5px] w-[160px] h-[30px] flex items-center justify-center bg-white">
              {/* PNG Image */}
              <img
                src={game.msg_status === 1 ? running : closedIcon}
                alt="Game Status"
                className="w-full h-full"
              />
              {/* Text Overlay */}
              <p className={`absolute font-bold text-xs ${game.msg_status === 1 ? "text-green-500" : "text-red-500"}`}>
                {game.msg_status === 1 ? "BETTING IS RUNNING" : "BETTING IS CLOSED"}
              </p>
            </div>
         </div>

          {/* Game Name and Status */}
          <div className="flex flex-row p-1">
            {/* First Section: Game Name */}
            <div className="w-[50%] flex items-center justify-center">
              <div className="flex flex-col items-center p-0">
                <p className="font-bold text-xs md:text-lg lg:text-2xl text-gray-800 p-0">
                  {game.game_name}
                </p>
                <p className="font-bold text-sm text-gray-500">{game.open_result ? `${game.open_result}` :"**"}</p>
              </div>
            </div>
            {/* Second Section: Market Status */}
            {/* <div className="w-[0%] flex items-center justify-center">
              <div
                className={classNames(
                  "text-xs md:text-sm lg:text-lg font-bold",
                  {
                    "text-red-600": game.msg_status === 2,
                    "text-green-600": game.msg_status === 1,
                  }
                )}
              >
                {game.msg_status === 2 ? "MARKET CLOSED" : "MARKET RUNNING"}
              </div>
            </div> */}

            {/* Third Section: Play Button */}
            <div className="w-[190px] flex items-center justify-center pl-[70px] pt-[15px]">
              <button
                onClick={() => {
                  if (game.msg_status === 1) {
                    navigate("/galiallgame", {
                      state: {
                        gameId: game.game_id,
                        openTime: game.open_time,
                        gameName: game.game_name,
                      },
                    });
                  }
                }}
                className="focus:outline-none"
              >
                {game.msg_status === 1 ? (
                  <img
                    src={open}
                    alt="Play Now"
                    className="h-[32px]"
                  />
                ) : (
                  <img
                    src={closed}
                    alt="Closed"
                    className="h-[32px]"
                  />
                )}
              </button>
            </div>
          </div>

          {/* B: Close Time Container (10% height) */}
          <div className="flex flex-row h-[10%] justify-center items-center bg-yellow-300 border-t border-black">
            <p className="text-red-600 font-bold text-xs md:text-lg lg:text-lg">
              Close - {game.open_time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GALIGAME;
