import { useState } from "react";
import { motion } from "framer-motion";

export default function OtpInput({
  otp,
  setOtp
}: {
  otp: string[];
  setOtp:any
}) {


  const handleChange = (e: any, index: number) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`Otp-input-${index + 1}`)?.focus();
      }
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className=' flex flex-col items-center gap-[20px] mt-[30px]'
    >
      <p className="text-green-600">OTP Sent! Check your email and enter the code below.</p>
      <div className='otp-container'>
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`Otp-input-${index}`}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            className='otp-input'
          />
        ))}
      </div>
    </motion.div>
  );
}
