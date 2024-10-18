import { BiArrowBack } from "react-icons/bi";
import WalletIcon from "../Images/wallet.png";
import topBackground from "../Images/bg.png";
import { useNavigate, useLocation } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/outline";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import useGameFront from "../Hooks/useGameFront";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarModal from "./StarModal.jsx"

function Sdoublepana() {
  const singleDigitArray  = [
    "100",
    "110",
    "112",
    "113",
    "114",
    "115",
    "116",
    "117",
    "118",
    "119",
    "122",
    "133",
    "144",
    "155",
    "166",
    "177",
    "188",
    "199",
    "200",
    "220",
    "223",
    "224",
    "225",
    "226",
    "227",
    "228",
    "229",
    "233",
    "244",
    "255",
    "266",
    "277",
    "288",
    "299",
    "300",
    "330",
    "334",
    "335",
    "336",
    "337",
    "338",
    "339",
    "344",
    "355",
    "366",
    "377",
    "388",
    "399",
    "400",
    "440",
    "445",
    "446",
    "447",
    "448",
    "449",
    "455",
    "466",
    "477",
    "488",
    "499",
    "500",
    "550",
    "556",
    "557",
    "558",
    "559",
    "566",
    "577",
    "588",
    "599",
    "600",
    "660",
    "667",
    "668",
    "669",
    "677",
    "688",
    "699",
    "700",
    "770",
    "778",
    "779",
    "788",
    "799",
    "800",
    "880",
    "889",
    "899",
    "900",
    "990",
  ];
  const todayDate = new Date().toISOString().split("T")[0];
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  
  const newDate = new Date();
  const day = newDate.getDate();
  const monthIndex = newDate.getMonth();
  const year = newDate.getFullYear();
  
  const formattedDate = day + "-" + months[monthIndex] + "-" + year;
  const [submit, setSubmit]= useState('');

  

  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
  };
  const backStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    paddingBottom: "400px",
  };
  const cardStyle = {
    width:"400px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  };

  const digit = useRef();
  const date = useRef();
  const point = useRef();
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  const unique = useSelector((state) => state.userDetail.token);
  const resinfo = useGameFront(unique);
  const [walletAmt, setWalletAmt] = useState();
  const [submittedData, setSubmittedData] = useState([]);
  const [res, setRes] = useState({});
  const [isProceed, setIsProceed] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const closeModal = ()=> setShowModal(false);
  const clearSubmittedData = () => {
    setIsProceed(false);
    setSubmittedData([]); // Function to clear submittedData
  };

  const [isOpen, setIsOpen] = useState(true);
  const { gameId, openTime, gameName, pana } = useLocation().state;
  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Cookie",
        "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee"
      );
      const raw = JSON.stringify({
        env_type: "Prod",
        app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
        unique_token: unique,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const response = await fetch(
        "https://lotus365matka.in/api-user-wallet-balance",
        requestOptions
      );
      const result = await response.json();
      if (result && result.wallet_amt !== undefined) {
        setWalletAmt(result.wallet_amt);
      }

      setRes(result);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [res.wallet_amt]);


  useEffect(() => {
    if (res && res.wallet_amt) {
      setWalletAmt(resinfo.wallet_amt);
    }
  }, [res.wallet_amt]);

  useEffect(() => {
    calculateTimeLeft(); // Call calculateTimeLeft whenever openTime changes
  }, [openTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    setFormErrors({});
    const errors = validate(digit.current.value, point.current.value);

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      if (errors.digit) {
        toast(errors.digit);
      } else {
        toast(errors.point);
      }
      return;
    } else {
      setIsProceed(true);
      setFormErrors({});

      const newDataObject = {
        digits: digit.current.value,
        closedigits: "",
        points: point.current.value,
        session: "",
      };
      const newWalletAmt = walletAmt - point.current.value;

      setWalletAmt(newWalletAmt);

      setSubmittedData((prevData) => {
        const updatedData = [...prevData, newDataObject];
        return updatedData;
      });
      setDigitValue("");
      setPointValue("");
    }
  };
  const setDigitValue = (value) => {
    digit.current.value = value;
  };

  const setPointValue = (value) => {
    point.current.value = value;
  };

  const validate = (digit, point) => {
    const errors = {};
    if (!digit) {
      errors.digit = "Please enter the number";
    } else if (!singleDigitArray.includes(digit)) {
      errors.digit = `Number ${digit} is not valid`;
    }
    if (!point) {
      errors.point = "Please enter point";
    } else if (parseInt(point) < 10) {
      errors.point = "Required minimum bid amount is 10";
    } else if (parseInt(point) > walletAmt) {
      errors.point = "Insufficient balance please refill your account";
    }
    return errors;
  };

  const calculateTimeLeft = () => {
    
    const openTimeWithoutSuffix = openTime.replace(/\s[AaPp][Mm]$/, "");
    const openDateString = new Date().toLocaleDateString(); // Get current date as a string
    const open = `${openDateString}T${openTimeWithoutSuffix}`;
    const parts = open.split("T");
    const dateParts = parts[0].split("/");
    const timeParts = parts[1].split(":");
    const formattedDateString = `${dateParts[2]}-${dateParts[0].padStart(
      2,
      "0"
    )}-${dateParts[1].padStart(2, "0")}T${timeParts[0].padStart(
      2,
      "0"
    )}:${timeParts[1].padStart(2, "0")}:00`;
    let openDate = new Date(
      `${dateParts[2]}-${dateParts[0].padStart(2, "0")}-${dateParts[1].padStart(
        2,
        "0"
      )}T${timeParts[0].padStart(2, "0")}:${timeParts[1].padStart(2, "0")}:00`
    );
    if (openTime.match(/[Pp][Mm]$/)) {
      const openHours = openDate.getHours();
      openDate.setHours(openHours === 12 ? 12 : openHours + 12);
    }

    const openMillisec = Date.parse(openDate);
    if (openMillisec <= Date.now()) {
      setIsOpen(false);
    }
  };
  const totalPoints=submittedData.reduce((acc, curr) => acc + parseInt(curr.points), 0)
  return (
    <> 
      <div style={backStyle} className="text-white bg-my-gradient-1" >
      <div className="font-bold flex items-center justify-center text-lg underline pt-2"><h1>Double Pana</h1></div>
        <div className="flex justify-center items-center">
          <div className="" style={cardStyle}>
            <input
              type="date"
              value={todayDate}
              readOnly
              className="shadow-md w-full flex justify-center py-2 px-4 text-black border border-black-500 rounded-xl text-center"
            />
            <p className="mt-2 ml-2 font-bold text-white">Open Digit</p>
            <input
              type="number"
              inputMode="numeric"
              ref={digit}
              placeholder="Enter Digit"
              className="shadow-md w-full py-2 px-4 border border-black-500 rounded-xl text-black"
              list="digitList" // Step 2: Add list attribute
              autoComplete="off" 
            />
            <datalist id="digitList">
  {singleDigitArray.map((digit, index) => (
    <option key={index} value={digit} />
  ))}
</datalist>
            <p className="mt-2 ml-2 font-bold text-white">Points</p>
            <input
              type="number"
              inputMode="numeric"
              ref={point}
              placeholder="Enter Points"
              className="shadow-md w-full  py-2 px-4 border border-black-500 rounded-xl text-black"
            />
            <div className="flex  mb-4 text-white">
              <button
                className={`py-2 px-4 border border-black-500 rounded-xl bg-yellow-600 hover:bg-yellow-500 cursor-pointer mt-4 ${
                  isProceed ? "w-11/12" : "w-full"
                }`}
                onClick={handleSubmit}
              >
                Proceed
              </button>
              {isProceed && (
                  <>
                    <button
                      className="py-2 px-4 border border-black-500 rounded-xl bg-yellow-600 hover:bg-yellow-500 cursor-pointer mt-4 w-full ml-3"
                      onClick={() => setShowModal(true)}
                    >
                      Submit
                    </button>
                    {showModal &&(
                    <StarModal 
                    closeModal={closeModal}
                    totalIndex={submittedData.length} 
                    totalPoints={totalPoints}
                    submittedData={submittedData}   
                    gameId={gameId} 
                    gameName= {gameName}
                    pana= {pana}
                    date={formattedDate}
                    clearSubmittedData={clearSubmittedData}
                  />)}
                  </>
                )}
            </div>
            {submittedData.map((data, index) => {
              const handleClickRemoveDiv = (indexToRemove) => () => {
                const newData = submittedData.filter(
                  (_, i) => i !== indexToRemove
                );
                setSubmittedData(newData);
                setFormErrors({});
                const removedItem = submittedData[indexToRemove];
                const removedItemPoint = parseInt(removedItem.points);
                
                // Check if removedItemPoint is a valid number
                if (!isNaN(removedItemPoint)) {
                  const newWalletAmt = walletAmt + removedItemPoint;
                  setWalletAmt(newWalletAmt);
                } else {
                  console.error('Invalid points data:', removedItem);
                }
                if (newData.length === 0) {
                  setIsProceed(false); // Set isProceed to false if only one item is left
                }
              };

              return (
                <div key={index} className="w-full flex mb-3 ">
                  <div
                    className="shadow-md w-10/12  p-1  border border-black-500 bg-white text-black flex justify-between"
                    style={{ borderRadius: "25px" }}
                  >
                    <div className="flex flex-col items-center ml-4">
                      <h3>Close Digit</h3>
                      <h3>{data.digits}</h3>
                    </div>
                    <div className="flex flex-col items-center mr-4">
                      <h3>Points</h3>
                      <h3>{data.points}</h3>
                    </div>
                  </div>
                  <button
                    className="shadow-md border bg-white py-2 px-4 flex items-center justify-center ml-1"
                    style={{ borderRadius: "20px" }}
                    onClick={handleClickRemoveDiv(index)}
                  >
                    <TrashIcon className="h-6 w-6 text-red-500" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sdoublepana;
