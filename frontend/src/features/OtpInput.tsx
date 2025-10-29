import { useState } from "react";
import { motion } from "framer-motion";

export default function OtpInput({
  otpEmailInput,
}: {
  otpEmailInput: string;
}) {
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [backResponse, setBackResponse] = useState<string>("");
  const [isBackError, setIsBackError] = useState<boolean>(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

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

  const handleOtpCheck = async () => {
    try {
      const request = await fetch("http://localhost:3000/checkOTP", {
        method: "POST",
        headers: {
          "Conent-Type": "application/json",
        },
        body: JSON.stringify({ enteredOtp, otpEmailInput }),
      });
      const response = await request.json();
      if (!request.ok) {
        throw new Error(response.message);
      }
      setIsBackError(false);
    } catch (err: any) {
      setIsBackError(true);
      setBackResponse(err);
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
