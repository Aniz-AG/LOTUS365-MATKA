import topBackground from "./Images/bg.png";
import chart from "./Images/chart.png";
import closed from "./assets/ICONS AND BACKGROUNDS/closed.png";
import open from "./assets/ICONS AND BACKGROUNDS/play now.png";
import closedIcon from "./assets/ICONS AND BACKGROUNDS/36.0.png";
import play from "./assets/ICONS AND BACKGROUNDS/35.0.png";
import { useEffect, useState } from "react";
import useStarline from "./Hooks/useStarline";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";

function StarlineGame() {
  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([{}]);
  const unique = useSelector(state => state.userDetail.token);
  const resinfo = useStarline();

  useEffect(() => {
    if (resinfo && resinfo["result"]) {
      setStatus(true);
      setGameRates(resinfo["result"]);
    }
  }, [resinfo]);

  const navigate = useNavigate();

  return (
    <div className="px-5 mt-2 pt-4">
      {gameRates.map((game) => (
        <div key={game.game_id} className="mb-10 border-2 border-black shadow-md rounded-lg flex flex-col bg-white relative">
          <div className="relative">
            {/* Game Status */}
            <div className="absolute top-[-25px] right-[5px] w-[160px] h-[28px] flex items-center justify-center bg-white">
              <img
                src={game.msg_status === 1 ? play : closedIcon}
                alt="Game Status"
                className="w-full h-full"
              />
              <p className={`absolute font-bold text-xs ${game.msg_status === 1 ? "text-green-500" : "text-red-500"}`}>
                {game.msg_status === 1 ? "BETTING IS RUNNING" : "BETTING IS CLOSED"}
              </p>
            </div>
          </div>

          {/* Game Name and Status */}
          <div className="flex flex-row p-0"> {/* Adjusted padding */}
            {/* Game Name */}
            <div className="w-[50%] flex items-center justify-center">
              <div className="flex flex-col items-center">
                <p className="font-bold text-xs md:text-lg lg:text-2xl text-gray-800">
                  {game.game_name}
                </p>
                <p className="font-medium text-sm text-gray-500">{game.open_result ? `${game.open_result}` : "***_*"}</p>
              </div>
            </div>

            {/* Market Status */}
            <div className="w-[0%] flex items-center justify-center">
              {/* <div className={classNames("text-xs md:text-sm lg:text-lg font-bold", {
                  "text-red-600": game.msg_status === 2,
                  "text-green-600": game.msg_status === 1,
                })}>
                {game.msg_status === 2 ? "MARKET CLOSED" : "MARKET RUNNING"}
              </div> */}
            </div>

            {/* Play Button */}
            <div className="w-[200px] flex items-center justify-center pl-[60px] pt-[12px] pb-[5px]">
              <button
                onClick={() => {
                  if (game.msg_status === 1) {
                    navigate("/stargame", {
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
                <img
                  src={game.msg_status === 1 ? open : closed}
                  alt={game.msg_status === 1 ? "Play Now" : "Closed"}
                  className="h-[32px]"
                />
              </button>
            </div>
          </div>

          {/* Close Time Container (10% height) */}
          <div className="flex flex-row h-[10%] justify-center items-center bg-yellow-300 border-t border-black">
            <p className="text-red-600 font-bold text-xs md:text-lg lg:text-lg">
              Open - {game.open_time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StarlineGame;
