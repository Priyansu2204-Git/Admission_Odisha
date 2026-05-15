import React, { useState } from "react";
import API_BASE from "../../config/api";

const VerifyOtp = () => {
  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");

  const verify = async () => {
    const res = await fetch(`${API_BASE}?r=auth/verify-otp`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({email,otp})
    });

    const data = await res.json();

    if(data.status==="success"){
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Verified");
      
      if (data.user.is_admin === 1) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/";
      }
    }else{
      alert(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} className="border p-2"/>
      <input placeholder="OTP" onChange={e=>setOtp(e.target.value)} className="border p-2 mt-2"/>
      <button onClick={verify} className="bg-blue-500 text-white px-4 py-2 mt-3">
        Verify
      </button>
    </div>
  );
};

export default VerifyOtp;