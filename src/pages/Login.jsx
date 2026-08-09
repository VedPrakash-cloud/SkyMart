import login from "../assets/Login_background.jpg";
import { NavLink, useNavigate } from "react-router";
import { Lock, Mail, Zap, LogIn, EyeOff, Eye } from "lucide-react";
import { MyLoginStore } from "../context/AppStore";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { setCurrentUser, showPassword,setShowPassword, showConfirmPassword, setShowConfirmPassword } = useContext(MyLoginStore);

  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirm, setResetConfimr] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const registeredUser = JSON.parse(localStorage.getItem("info") || "[]");
  const cartInfo = JSON.parse(localStorage.getItem("cart") || "[]"); 

  const handleLogin = (data) => {
    const authenticateUser = registeredUser.find(
      (val) => val.email === data.email && val.password === data.password,
    );

    if (authenticateUser) {
      toast.success("login Successfull..");
      localStorage.setItem("activeUser", JSON.stringify(authenticateUser));
      localStorage.setItem("cart", JSON.stringify(cartInfo));
      setCurrentUser(authenticateUser);
      navigate("/");
    } else {
      toast.error("Email or Password is not matching");
      return;
    }

    reset();
  };

  const handlePasswordReset = () => {
    setIsPasswordReset(true);
    setResetEmail("");
    setResetPassword("");
    setResetConfimr("");
  };

  const handleFindUser = (e) => {
    e.preventDefault();
    if(!verifiedUser){
      const verifyUser = registeredUser.find((val)=> val.email === resetEmail);

      if(verifyUser){
        setVerifiedUser(true);
      }else{
        toast.error("User not found, please try again!!!");
      }
      return;
    }

    if(resetPassword !== resetConfirm){
      toast.error("Password do not match");
      return;
    }

    const userIndex = registeredUser.findIndex((val)=>val.email === resetEmail);

    if(userIndex !== -1){
      registeredUser[userIndex].password = resetPassword;

      localStorage.setItem("info", JSON.stringify(registeredUser));

      toast.success("Password Updated Successfully!");

      setIsPasswordReset(false);
      setVerifiedUser(false);
      setResetPassword("");
      setResetConfimr("");
    }
  };

  const handleModalClose = () => {
    setIsPasswordReset(false);
    setVerifiedUser(false);
    setResetEmail("");
    setResetPassword("");
    setResetConfimr("");
  };

  return (
    <div className="h-screen flex m-auto bg-[#639dce]">
      <div className="bg-white flex justify-center-safe md:grid grid-cols-2 w-full md:w-[70%] m-auto h-screen md:h-4/5">
        <div
          className="h-full hidden md:flex w-full bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${login})` }}
        ></div>

        {/* login form side */}
        <div className="flex items-center-safe justify-center-safe p-10">
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="text-[#134c84] flex gap-2 items-center-safe">
              <Zap size={32} className="border rounded-lg p-1" />
              <h1 className="text-3xl font-semibold">Welcome to SkyMart</h1>
            </div>
            <div className="border my-5 p-5 rounded-4xl bg-[]#134c84">
              <h1 className="text-4xl font-bold mb-2 text-[#134c84]">
                Sign in
              </h1>
              <p className="text-sm text-gray-500 font-semibold">
                Enter your credentials to continue
              </p>

              {/* email */}

              <div className="my-4">
                <div className="flex relative items-center-safe">
                  <Mail className="absolute left-4 w-5 h-4 text-gray-400 pointer-events-none" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    type="email"
                    placeholder="Email address"
                    className="w-full border border-gray-500 placeholder-gray-500 rounded-2xl py-3 pl-10 pr-4 outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 font-semibold">
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              {/* password */}

              <div className="my-4">
                <div className="flex relative items-center-safe ">
                  <Lock className="absolute left-4 w-5 h-4 text-gray-400 pointer-events-none" />
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 charecter required",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                        message:
                          "Password Must contain 6-20 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special char (@$!%*?&)",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (min 6 chars)"
                    className="w-full border border-gray-500 placeholder-gray-500 rounded-2xl py-3 pl-10 pr-4 outline-none"
                  />
                  <button type="button" onClick={()=>setShowPassword((prev)=> !prev)} className="absolute right-4 w-5 h-4 text-gray-400 cursor-pointer">{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
                </div>
                {errors.password && (
                  <p className="text-red-500 font-semibold">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* forget-password */}

              <div className="flex justify-end my-4">
                <p
                  onClick={handlePasswordReset}
                  className="text-xs text-[#134c84] cursor-pointer"
                >
                  Forget Password?
                </p>
              </div>
                
                {/* sign-in button */}

              <div className="flex justify-center-safe">
                <button 
                className="flex justify-center cursor-pointer active:scale-95 items-center-safe gap-2 text-white bg-[#134c84] px-6 py-2">
                  Sign in <LogIn size={18} />
                </button>
              </div>

              {/* registration question */}

              <div className="w-full mt-1 text-center text-gray-500">
                Don't have an account?{" "}
                <NavLink
                  to={"/register"}
                  className="text-[#134c84] font-semibold"
                >
                  Create one
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Reset Password modal */}
      {isPasswordReset && (
        <div className="z-1 absolute h-screen w-screen bg-gray-500/50 md:bg-gray/30 backdrop-blur-xs flex items-center-safe justify-center-safe">
          <form
            onSubmit={handleFindUser}
            className="md:w-[30%] bg-white/50 p-10 rounded-2xl shadow-lg shadow-gray-600/30 text-[#134c84]"
          >
            <div className="flex items-center-safe justify-between font-semibold text-2xl mb-6">
              <h1>Reset Password</h1>
              <span
                onClick={handleModalClose}
                className="cursor-pointer active:scale-90"
              >
                X
              </span>
            </div>
            <div className="flex flex-col mb-4 font-semibold">
              <label htmlFor="email">Email</label>
              <div className="flex relative items-center-safe">
                  <Mail className="absolute left-4 w-5 h-4 text-gray-400 pointer-events-none" />
                  <input
                    onChange={(e)=>setResetEmail(e.target.value)}
                    value={resetEmail}
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full border border-gray-500 placeholder-gray-500 rounded-lg py-1 pl-10 pr-4 outline-none"
                  />
                </div>
            </div>
            {verifiedUser && (
              <div>
                <div className="flex flex-col mb-4 font-semibold">
                  <label htmlFor="new">New Password</label>
                  <div className="flex relative items-center-safe ">
                  <Lock className="absolute left-4 w-5 h-4 text-gray-400 pointer-events-none" />
                  <input
                    onChange={(e)=>setResetPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    value={resetPassword}
                    placeholder="Password (min 6 chars)"
                    className="w-full border border-gray-500 placeholder-gray-500 rounded-lg py-1 pl-10 pr-4 outline-none focus:border-[#134c84]"
                  />
                  <button type="button" onClick={()=>setShowPassword((prev)=> !prev)} className="absolute right-4 w-5 h-4 text-gray-400 cursor-pointer">{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
                </div>
                </div>
                <div className="flex flex-col mb-4 font-semibold">
                  <label htmlFor="confirm">Confirm Password</label>
                  <div className="flex relative items-center-safe">
              <Lock className="absolute left-4 w-5 h-4 text-gray-400 pointer-events-none" />
              <input
                onChange={(e)=>setResetConfimr(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={resetConfirm}
                className="w-full border border-gray-400 placeholder-gray-500 rounded-lg py-1 pl-10 pr-4 outline-none focus:border-[#134c84]"
              />
              <button type="button" onClick={()=>setShowConfirmPassword((prev)=> !prev)} className="absolute right-4 w-5 h-4 text-gray-400 cursor-pointer">{showConfirmPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
            </div>
                </div>
              </div>
            )}
            <div className="flex justify-end-safe">
              <button className="bg-[#134c84] text-white px-10 py-2 rounded-xl cursor-pointer active:scale-95">
                {verifiedUser ? "Save" : "Find User"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
