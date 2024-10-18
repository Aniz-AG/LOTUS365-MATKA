import logo from "./assets/ICONS AND BACKGROUNDS/Transparent logo.png";
import whatsapp from './assets/ICONS AND BACKGROUNDS/whatsapp.png'; // Import the WhatsApp icon
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./Util/loginSlice";
import { addPass } from "./Util/passslice";
import bgImage from "./assets/ICONS AND BACKGROUNDS/login signup back.png";
import useGameFront from "./Hooks/useGameFront";

function Login() {
  const [formErrors, setFormErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); // State to hold the phone number for WhatsApp
  const phoneno = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userDetail.token);

  const resinfo = useGameFront(token);

  const [adminPhone, setAdminPhone] = useState('');

  useEffect(() => {
    if (resinfo) {
      setAdminPhone(resinfo["mobile_1"] || "1234567890"); // Fallback if no mobile is found
    }
  }, [resinfo]);
  const whatsappUrl = `https://wa.me/${adminPhone}`;

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const response = await fetch("https://example.com/api/get-whatsapp-phone");
        const data = await response.json();
        if (data.phone) {
          setPhoneNumber(data.phone);
        }
      } catch (error) {
        console.error("Error fetching phone number:", error);
      }
    };

    fetchPhoneNumber();
  }, []);

  const handleToggleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleAdduser = (username_, unique_token, mobile, password) => {
    dispatch(addPass({ password: password }));
    dispatch(login({ username: username_, token: unique_token, mobile: mobile }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const errors = validate(phoneno.current.value, password.current.value);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      await fetchData(phoneno.current.value, password.current.value);
    } catch (error) {
      setErrorText("Username or password incorrect");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validate = (phoneno, password) => {
    const errors = {};
    const regex = /^[6-9]{1}[0-9]{9}$/;

    if (!phoneno) {
      errors.phoneno = "Phone No is required!";
    } else if (!regex.test(phoneno)) {
      errors.phoneno = "Phone No is not Valid!";
    }

    if (!password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const fetchData = async (phoneno, password) => {
    const response = await fetch("https://lotus365matka.in/api-user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee"
      },
      body: JSON.stringify({
        env_type: "Prod",
        app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
        device_id: "{{android_id}}",
        password: password,
        mobile: phoneno,
      }),
    });
    const result = await response.json();

    if (result?.status === true) {
      handleAdduser(result.user_name, result.unique_token, result.mobile, password);
      navigate('/imp');
    } else {
      throw new Error("Invalid username and password");
    }
  };

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
      <form className="flex flex-col p-5 pt-0 z-4" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center mb-6">
          <img src={logo} alt="Center Image" className="w-40 h-40 rounded-xl mb-[60px] translate-y-[-70px] mr-[120px]" />
          <h3 className="font-bold text-[13px] text-white translate-y-[-50px]">I am waiting for you, please enter your details</h3>
        </div>
        <div className="flex flex-col gap-[20px]">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Phone Number"
            ref={phoneno}
            className="py-2 pl-1 border-b-2 border-gold-500 text-white focus:outline-none"
            style={{
              backgroundColor: "inherit", 
              borderBottom: "2px solid goldenrod",
              boxShadow: "none", 
            }}
            name="phoneno"
          />
         
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Password"
            ref={password}
            className="py-2 pl-1 text-white focus:outline-none"
            style={{
              backgroundColor: "inherit", 
              borderBottom: "2px solid goldenrod",
              boxShadow: "none", 
            }}
            name="password"
          />
        </div>
        <p className="text-red-500">{formErrors.password}</p>
        <div className="relative -top-14">
          <button
            type="button"
            className={`absolute ${formErrors.password ? "top-2" : "top-5"} right-4`}
            onClick={handleToggleCurrentPassword}
          >
            {showCurrentPassword ? <FiEyeOff className="text-white"/> : <FiEye />}
          </button>
        </div>

        {errorText && <p className="text-red-500">{errorText}</p>}
        <div className="flex justify-center items-center mb-5 w-[80px] mx-auto">
          <button
            className="text-white font-bold py-3 border border-black-500 rounded-xl mt-4 px-[60px] bg-gradient-to-r from-yellow-700 to-yellow-300 hover:bg-yellow-500 transition duration-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </div>
        <div className="flex justify-center">
          <p className="text-white">
            Don't Have an account?{" "}
            <Link to="/r" className="text-yellow-500 font-bold">  Sign Up</Link>
          </p>
        </div>
        <div className="flex justify-center mt-2">
          <Link to="/forgotpass" className="text-blue-500 font-bold">Forgot Password?</Link>
        </div>

        {/* Contact admin section with WhatsApp icon */}
        <div className="flex justify-center mt-5">
          <p className="text-white">Contact Admin: </p>
          <button 
            onClick={() => window.open(whatsappUrl, "_blank")} // Opens WhatsApp in a new tab
            className="flex items-center justify-center ml-2"
          >
            <img 
              src={whatsapp} 
              alt="WhatsApp Icon" 
              className="translate-y-[-4px] w-8 h-8 rounded-full" 
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
