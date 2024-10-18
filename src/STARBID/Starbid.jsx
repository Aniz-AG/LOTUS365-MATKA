import { BiArrowBack } from "react-icons/bi";
import DatePickerButton from "../Date";
import topBackground from "../Images/new1.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Starbid({ onDataFetch }) {
  const backStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    paddingBottom: '',
  };

  // Reduced card size and increased horizontal padding (paddingX)
  const cardStyle = {
    width: '300px', // Reduced size
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 20px', // Increased horizontal padding (paddingX)
  };

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useSelector(state => state.userDetail.token);

  useEffect(() => {
    fetchData(changedate(selectedDate), changedate(selectedEndDate));
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);

    const startdate1 = changedate(selectedDate);
    const enddate1 = changedate(selectedEndDate);

    try {
      await fetchData(startdate1, enddate1);
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchData = async (startdate1, enddate1) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee");

    const raw = JSON.stringify({
      env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
      unique_token: token,
      bid_from: startdate1,
      bid_to: enddate1
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://lotus365matka.in/api-starline-bid-history-data",
      requestOptions
    );
    const result = await response.json();
    if (result?.status === true) onDataFetch(true, result);
    else onDataFetch(false, null);
  };

  const changedate = (selectedDate) => {
    if (selectedDate === null) return;
    const startday = selectedDate.getDate();
    const startmonth = selectedDate.getMonth() + 1;
    const startyear = selectedDate.getFullYear();
    return `${startmonth}/${startday}/${startyear}`;
  };

  const back = () => {
    navigate('/imp');
  };

  return (
    <>
    <div className="shadow-md z-10 ">
      <div className="font-bold flex items-center justify-center text-lg mt-2 text-white"><h1>STARLINE BIDS</h1></div>
      <div className="text-black">
        <div className="flex justify-center item-center p-1">
          <div className="shadow-md" style={{ width: '300px', display: 'flex', flexDirection: 'column', padding: '5px' }}>
            <p className="font-bold text-sm text-white ml-2">From Date</p>
            <DatePickerButton selectedDate={selectedDate} onDateChange={handleDateChange} />
            <p className="mt-1 font-bold text-sm text-white ml-2">To Date</p>
            <DatePickerButton selectedDate={selectedEndDate} onDateChange={handleEndDateChange} />
            <div className="flex justify-center">
              <button
                className="p-2 rounded mt-2 bg-yellow-600 hover:bg-yellow-500 w-full font-bold text-sm text-white"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Starbid;
