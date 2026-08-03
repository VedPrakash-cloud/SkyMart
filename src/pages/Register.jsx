import { Zap, Lock, User, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { MyLoginStore } from "../context/AppStore";

const Register = () => {
  
  const navigate = useNavigate();

  const [registrationForm, setRegistrationForm,] =useState(JSON.parse(localStorage.getItem("info"))|| []);

  const {showConfirmPassword, setShowConfirmPassword, showPassword,setShowPassword} = useContext(MyLoginStore)
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode:"onChange"
  });

  const password = watch("password")


  const handleFormSubmit = (data) => {    
    const registeredUser = JSON.parse(localStorage.getItem("info"))||[];
    
    if(registeredUser.find((val) =>val.email === data.email)){
      alert("Email already registered");
      return;
    }else{
      alert("registration successfull")

      const {confirmPassword: _, ...userData} = data;

      const completeForm = {
        createdAt:new Date().toISOString(),
        id:crypto.randomUUID(),
        avatar: userData.UserName[0].toUpperCase(),
        ...userData
      }
      const formData = [...registrationForm, completeForm];
      setRegistrationForm(formData)
      localStorage.setItem("info", JSON.stringify(formData))
    }
    
    reset();
    navigate("/login");
    
  };

  return (
    <div className="flex justify-center-safe items-center-safe p-5 h-screen">
      <div className="md:w-[35%]">
        <div className="text-[#134c84] flex gap-2 items-center-safe">
          <Zap size={32} className="border rounded-lg p-1" />
          <h1 className="text-3xl font-semibold">Welcome to SkyMart</h1>
        </div>

        {/* registration form entry from here */}

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="border my-5 p-5 rounded-4xl bg-[]#134c84"
        >
          <h1 className="text-4xl font-bold mb-2 text-[#134c84]">
            Create account
          </h1>
          <p className="text-sm text-gray-500 font-semibold">
            Join SkyMart and start shopping
          </p>
          <div className="my-4">
            <div className="flex relative items-center-safe">
              <User className="absolute left-4 w-5 h-4 text-gray-400 pointer-events-none" />
              <input
                {...register("UserName", {
                  required: "Name is required",
                })}
                type="text"
                placeholder="Full name"
                className="w-full border border-gray-500 placeholder-gray-500 rounded-2xl py-3 pl-10 pr-4 outline-none"
              />
            </div>
            {errors.UserName && (
              <p className="text-red-500 font-semibold">
                {errors.UserName.message}
              </p>
            )}
          </div>
          <div className="my-4">
            <div className="flex relative items-center-safe">
              <Mail className="absolute left-4 w-5 h-4 text-gray-400 pointer-events-none" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern:{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message:"Enter a valid email address"
                  }
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
          <div className="my-4">
            <div className="flex relative items-center-safe ">
              <Lock className="absolute left-4 w-5 h-4 text-gray-400 pointer-events-none" />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength:{
                    value:6,
                    message:"Minimum 6 charecter required"
                  },
                  pattern:{
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                    message:"Password Must contain 6-20 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special char (@$!%*?&)"
                  }
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
          <div className="my-4">
            <div className="flex relative items-center-safe">
              <Lock className="absolute left-4 w-5 h-4 text-gray-400 pointer-events-none" />
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate:(value)=>value === password || "Please use the same password"
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full border border-gray-500 placeholder-gray-500 rounded-2xl py-3 pl-10 pr-4 outline-none"
              />
              <button type="button" onClick={()=>setShowConfirmPassword((prev)=> !prev)} className="absolute right-4 w-5 h-4 text-gray-400 cursor-pointer">{showConfirmPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 font-semibold">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex justify-center-safe">
            <button className="flex justify-center cursor-pointer rounded active:scale-95 items-center-safe gap-2 text-white bg-[#134c84] px-6 py-2">
              Create Account <ArrowRight size={18} />
            </button>
          </div>
          <div className="w-full mt-1 text-center text-gray-500">
            Don't have an account?{" "}
            <NavLink to={"/login"} className="text-[#134c84] font-semibold">
              Sign in
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
