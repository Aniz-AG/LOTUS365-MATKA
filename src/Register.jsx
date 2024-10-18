import React, { useState, useRef ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { register } from "./Util/registerSlice";
import bgImage from "./assets/ICONS AND BACKGROUNDS/login signup back.png";
import logo from "./assets/ICONS AND BACKGROUNDS/Transparent logo.png";
import whatsapp from './assets/ICONS AND BACKGROUNDS/whatsapp.png'; // Import the WhatsApp icon
import useGameFront from "./Hooks/useGameFront";

function Register() {
  const cardStyle = {
    width: "375px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    position: "relative",
    backgroundColor: "transparent",
  };

  const username = useRef();
  const phoneno = useRef();
  const password = useRef();
  const [formErrors, setFormErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const errors = validate(
      username.current.value,
      phoneno.current.value,
      password.current.value
    );

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      const otpData = await fetchData(phoneno.current.value);
      if (otpData?.status) {
        dispatch(register({
          username: username.current.value,
          phone: phoneno.current.value,
          password: password.current.value,
          otp: otpData?.otp,
        }));
        navigate('/Otp');
      } else {
        setErrorMsg("Failed to fetch OTP data");
      }
    } catch (error) {
      setErrorMsg("Error registering: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validate = (username, phoneno, password) => {
    const errors = {};
    const regex = /^[6-9]{1}[0-9]{9}$/;
    if (!username) {
      errors.username = "Username is required";
    }
    if (!phoneno) {
      errors.phoneno = "Phone No is required!";
    } else if (!regex.test(phoneno)) {
      errors.phoneno = "Phone No is not valid!";
    }
    if (!password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const fetchData = async (phoneno) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        env_type: "Prod",
        app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
        mobile: phoneno,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://lotus365matka.in/api-check-mobile",
        requestOptions
      );
      const result = await response.json();
      if (result?.status) {
        return result;
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };
  const token = useSelector((state) => state.userDetail.token);

  const resinfo = useGameFront(token);

  const [adminPhone, setAdminPhone] = useState('');

  useEffect(() => {
    if (resinfo) {
      setAdminPhone(resinfo["mobile_1"] || "1234567890"); // Fallback if no mobile is found
    }
  }, [resinfo]);
  const whatsappUrl = `https://wa.me/${adminPhone}`;

  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <form style={cardStyle} className="flex flex-col p-5 z-4 mt-4 mx-8" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center mb-6">
          <img src={logo} alt="Center Image" className="w-40 h-40 rounded-xl mb-4 translate-y-[-80px] mr-[120px]" />
          <h3 className="font-bold text-white text-[12px] translate-y-[-50px]">I'm waiting for you, please enter your details</h3>
        </div>
        <input
          type="text"
          placeholder="Username"
          className="pl-1 mb-2 border-b-2 border-[#dcbc44] text-white focus:outline-none bg-transparent"
          ref={username}
          name="username"
        />
        <p className="text-red-500">{formErrors.username}</p>

        <input
          type="text"
          placeholder="Phone Number"
          className="py-1 pl-1 mb-2 border-b-2 border-[#dcbc44] text-white focus:outline-none bg-transparent"
          ref={phoneno}
          name="phoneno"
        />
        <p className="text-red-500">{formErrors.phoneno}</p>

        <input
          type={showCurrentPassword ? "text" : "password"}
          placeholder="Password"
          ref={password}
          className="py-1 pl-2 border-b-2 border-[#dcbc44] text-white focus:outline-none bg-transparent"
          name="password"
        />
        <p className="text-red-500">{formErrors.password}</p>
        <p className="text-red-500">{errorMsg}</p>

        <div className="relative -top-6">
          <button
            type="button"
            className="absolute right-4"
            onClick={handleToggleCurrentPassword}
          >
            {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <div className="flex justify-center mb-5 mx-auto">
          <button
            className="p-3 border border-black-500 mt-4 px-[50px] font-bold text-white bg-gradient-to-r from-yellow-800 to-yellow-300 w-full rounded-xl"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>

        <div className="flex justify-center text-white">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-500 font-bold">
              Login
            </Link>
          </p>
        </div>

        <div className="flex justify-center text-white mt-6">
          <p>Contact admin</p>
        </div>

        {/* WhatsApp Icon */}
        <div className="flex justify-center mt-2">
          <button
            onClick={() => window.open(whatsappUrl, "_blank")}
            className=" flex flex-row items-center justify-center py-1"
          >
            <img
              src={whatsapp}
              alt="Whatsapp Icon"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-2"
            />
            <p className="font-bold text-white text-xs">WhatsApp</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
