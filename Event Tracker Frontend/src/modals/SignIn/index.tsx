import React, { useEffect, useRef, useState } from "react";
import { useModalState } from "@/context/Modal";
import FacebookIcon from "@/svg/Facebook";
import GoogleIcon from "@/svg/Google";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import { motion } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "@/context/Auth";
interface LoginProps {
  initialView?: "Login" | "SignUp";
}

const SignInLogin: React.FC<LoginProps> = ({ initialView = "Login" }) => {
  const { showModal, closeModal } = useModalState();
  const modalRef = useRef<HTMLDivElement>(null);
  const forgotPasswordRef = useRef<HTMLDivElement>(null);
  const [forgotEmailAddress, setForgotEmailAddress] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmSignUpPassword, setShowConfirmSignUpPassword] =
    useState(false);
  const [activeComponent, setActiveComponent] =
    useState<React.ReactNode | null>(
      initialView === "SignUp" ? "SignUp" : "Login"
    );
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [signupFormData, setsignupFormData] = useState({
    email: "",
    idNumber: "",
    password: "",
    confirmpassword: "",
  });
  const { signup, login } = useAuth();
  // Login

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClickSignIn = () => {
    login(loginFormData);
  };
  // Sign Up

  const handleClickSignUp = () => {
    signup(signupFormData);
  };

  const handleSignUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setsignupFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Forgot Password

  const handleClickForgotPassword = () => {
    setForgotPassword(true);
  };
  const handleClickForgotPasswordButton = () => {
    setForgotPassword(false);
  };

  // UseEffect

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const isOutsideModal =
        modalRef.current && !modalRef.current.contains(e.target as Node);
      const isOutsideForgotPassword =
        forgotPasswordRef.current &&
        !forgotPasswordRef.current.contains(e.target as Node);
      const isAlertChild =
        e.target instanceof Element && e.target.closest(".MuiAlert-root");

      if (isOutsideModal && forgotPassword === false && !isAlertChild) {
        closeModal();
      }
      if (isOutsideForgotPassword) {
        setForgotPassword(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal, setForgotPassword, forgotPassword]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setLoginFormData({
        email: "",
        password: "",
      });
      setsignupFormData({
        email: "",
        idNumber: "",
        password: "",
        confirmpassword: "",
      });
      setShowSignUpPassword(false);
      setShowConfirmSignUpPassword(false);
      setShowLoginPassword(false);
    }
  }, [activeComponent]);

  // Component Show

  const handleClickRegister = () => {
    setActiveComponent("SignUp");
  };

  const handleClickHaveAccount = () => {
    setActiveComponent("Login");
  };

  // Show Passwords

  const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id == "passwordsignupvisibility") {
      setShowSignUpPassword(!showSignUpPassword);
    } else if (e.currentTarget.id == "comfirmpasswordsignupvisibility") {
      setShowConfirmSignUpPassword(!showConfirmSignUpPassword);
    } else if (e.currentTarget.id == "passwordloginvisibility") {
      setShowLoginPassword(!showLoginPassword);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex h-[100%] w-[100%]  flex-col items-center justify-center bg-white/50 backdrop-blur-md">
      <motion.div
        className=" flex flex-col justify-center max-h-[90%] overflow-hidden rounded-[25px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.3 }}
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 },
        }}
      >
        {activeComponent && activeComponent === "Login" && (
            <div
              className=" customized_scrollbar max-h-[100%] xs:px-[25px] medium:px-[50px] medium:py-[20px]"
              ref={modalRef}
            >
              <p className=" top-[10px] right-[10px] text-right text-[14px] ">
                Not a member?
                <Button
                  style={{
                    textTransform: "none",
                    fontFamily: "Inter",
                  }}
                  onClick={handleClickRegister}
                >
                  Register Now
                </Button>
              </p>
              <div className=" flex flex-col justify-center text-center xs:gap-[2px] large:gap-[30px]">
                <div>
                  <h1 className="mt-[30px] text-[33px] font-semibold ">
                    Welcome!
                  </h1>
                  <p className="mt-[20px] text-zinc-600 xs:mb-[20px] medium:mb-[40px] ">
                    Sign in to access your account
                  </p>
                </div>

                <form className=" ">
                  <TextField
                    id="loginEmail"
                    name="email"
                    label="Username/Email"
                    variant="outlined"
                    autoComplete="email"
                    value={loginFormData.email}
                    onChange={handleLoginInputChange}
                    InputProps={{
                      style: { borderRadius: "15px" },
                    }}
                  />
                  <TextField
                    id="loginPassword"
                    name="password"
                    label="Password"
                    variant="outlined"
                    autoComplete="current-password"
                    value={loginFormData.password}
                    onChange={handleLoginInputChange}
                    type={showLoginPassword ? "text" : "password"}
                    InputProps={{
                      style: { borderRadius: "15px" },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            id="passwordloginvisibility"
                            onClick={(id) => handleClickShowPassword(id)}
                            edge="end"
                          >
                            {showLoginPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
                <div className="flex justify-end">
                  <a
                    onClick={handleClickForgotPassword}
                    className="text-[14px] text-zinc-600 hover:cursor-pointer"
                  >
                    Forgot Password?
                  </a>
                </div>
                <Button
                  style={{
                    marginTop: "30px",
                    height: "65px",
                    textTransform: "none",
                    textDecorationColor: "none",
                    backgroundColor: "#A83332",
                    color: "white",
                    fontFamily: "Inter",
                    fontSize: "20px",
                    borderRadius: "15px",
                    opacity: 0.9,
                  }}
                  onClick={handleClickSignIn}
                >
                  Sign In
                </Button>

                <p className="text-[15px] text-zinc-600">OR</p>
                <div className="mb-[50px] grid grid-flow-col justify-center gap-4">
                  <button className="flex items-center rounded-[15px] border border-zinc-600 border-opacity-50 py-[10px] px-[10px] text-[15px] text-zinc-600 shadow">
                    <div className="h-[50px] w-[50px]">
                      <GoogleIcon />
                    </div>
                    Sign up with Google
                  </button>
                  <button className="flex items-center rounded-[15px] border border-zinc-600 border-opacity-50 py-[10px] px-[10px] text-[15px] text-zinc-600 shadow">
                    <div className="h-[50px] w-[50px]">
                      <FacebookIcon />
                    </div>
                    Sign up with Facebook
                  </button>
                </div>
              </div>
            </div>
        )}
        {activeComponent && activeComponent === "SignUp" && (
        
            <div
              className=" customized_scrollbar max-h-[100%] xs:px-[25px] medium:px-[50px] medium:py-[20px]"
              ref={modalRef}
            >
              <div className="flex flex-col justify-center text-center xs:gap-[2px] large:gap-[30px]">
                <h1 className="text-3xl font-semibold xs:my-[10px] medium:mb-[40px]">
                  Create Account
                </h1>
                <div className="grid grid-flow-col justify-center gap-4">
                  <button className="flex items-center rounded-[15px] border border-zinc-600 border-opacity-50 py-[10px] px-[10px] text-[15px] text-zinc-600 shadow">
                    <div className="h-[50px] w-[50px]">
                      <GoogleIcon />
                    </div>
                    Sign up with Google
                  </button>
                  <button className="flex items-center rounded-[15px] border border-zinc-600 border-opacity-50 py-[10px] px-[10px] text-[15px] text-zinc-600 shadow">
                    <div className="h-[50px] w-[50px]">
                      <FacebookIcon />
                    </div>
                    Sign up with Facebook
                  </button>
                </div>
                <p className="text-[15px] text-zinc-600">OR</p>
                <form className="grid grid-flow-row xs:gap-[2px] large:gap-[40px] ">
                  <TextField
                    id="email"
                    name="email"
                    label="Username/Email"
                    variant="outlined"
                    autoComplete="email"
                    value={signupFormData.email}
                    onChange={handleSignUpInputChange}
                    InputProps={{
                      style: { borderRadius: "15px" },
                    }}
                  />
                  <TextField
                    id="id"
                    name="idNumber"
                    label="Id Number"
                    variant="outlined"
                    autoComplete="off"
                    value={signupFormData.idNumber}
                    onChange={handleSignUpInputChange}
                    InputProps={{
                      style: { borderRadius: "15px" },
                    }}
                  />
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    autoComplete="new-password"
                    value={signupFormData.password}
                    onChange={handleSignUpInputChange}
                    type={showSignUpPassword ? "text" : "password"}
                    InputProps={{
                      style: { borderRadius: "15px" },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            id="passwordsignupvisibility"
                            onClick={(id) => handleClickShowPassword(id)}
                            edge="end"
                          >
                            {showSignUpPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <TextField
                    id="confirmpassword"
                    name="confirmpassword"
                    label="Confirm Password"
                    autoComplete="new-password"
                    variant="outlined"
                    type={showConfirmSignUpPassword ? "text" : "password"}
                    value={signupFormData.confirmpassword}
                    onChange={handleSignUpInputChange}
                    InputProps={{
                      style: { borderRadius: "15px" },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            id="comfirmpasswordsignupvisibility"
                            onClick={(id) => handleClickShowPassword(id)}
                            edge="end"
                          >
                            {showConfirmSignUpPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
                <Button
                  style={{
                    marginTop: "30px",
                    height: "65px",
                    textTransform: "none",
                    textDecorationColor: "none",
                    backgroundColor: "#A83332",
                    color: "white",
                    fontFamily: "Inter",
                    fontSize: "20px",
                    borderRadius: "15px",
                    opacity: 0.9,
                  }}
                  onClick={handleClickSignUp}
                >
                  Sign Up
                </Button>
                <p className="text-[14px] text-zinc-600">
                  Already have an account?
                  <Button
                    style={{
                      textTransform: "none",
                      fontFamily: "Inter",
                      padding: 0,
                    }}
                    onClick={handleClickHaveAccount}
                  >
                    Log in
                  </Button>
                </p>
              </div>
            </div>
        )}
        {forgotPassword && (
          <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
            <div ref={forgotPasswordRef}>
              <form className="mb-4 w-96 rounded bg-white px-8 pt-6 pb-8 shadow-md">
                <h2 className="mb-6 text-2xl font-semibold">Forgot Password</h2>
                <div className="mb-4">
                  <label className="text-gray-700 mb-2 block text-sm font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
                    placeholder="Enter your email address"
                    value={forgotEmailAddress}
                    onChange={(e) => setForgotEmailAddress(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    sx={{
                      textTransform: "none",
                      textDecorationColor: "none",
                      backgroundColor: "#0012FF",
                      color: "white",
                      fontFamily: "Inter",
                      fontSize: "20px",
                      borderRadius: "15px",
                      opacity: 0.9,
                      "&:hover": {
                        backgroundColor: "#35a1ff",
                      },
                    }}
                    className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                    onClick={handleClickForgotPasswordButton}
                  >
          
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SignInLogin;
