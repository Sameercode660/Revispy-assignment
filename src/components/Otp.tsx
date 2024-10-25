import React, { useState, useRef, useEffect } from 'react'

function Otp({ length = 8, onSubmit, email = "mohdsameer789736@gmail.com", loadingState }: any) {

    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs: any = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: any, e: any) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];

        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);


        var combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) onSubmit(localStorage.getItem("id"), combinedOtp);

        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleClick = (index: any) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleKeyDown = (index: any, e: any) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            inputRefs.current[index - 1].focus();
        }
    };

    function maskEmail(email: any) {

        if (!email) {
            return ''
        }
        const [localPart, domain] = email.split('@');

        if (localPart.length <= 3) {
            return email;
        }

        return `${localPart.slice(0, 3)}****@${domain}`;
    }

    return (
        <div className='w-full flex justify-center items-center pt-10'>
            <div className='flex flex-col gap-4 border rounded-xl border-gray-300 w-[500px] h-[400px] justify-center items-center'>
                <div>
                    <span className='text-[1.6rem] font-semibold'>Verify your email</span>
                </div>
                <div className='text-center'>
                    <p>Enter the 8 digit code you have recieved on</p>
                    <p>{maskEmail(email)}</p>
                </div>
                <div className='w-[80%]'>
                    {otp.map((value, index) => {
                        return (
                            <input
                                key={index}
                                type="text"
                                ref={(input) => (inputRefs.current[index] = input)}
                                value={value}
                                onChange={(e) => handleChange(index, e)}
                                onClick={() => handleClick(index)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-[40px] h-[40px] border rounded border-gray-500 text-[1.6em] text-center m-1"
                            />
                        );
                    })}
                </div>
                <div className='w-[80%]'>
                    <button className='w-full bg-black text-white h-[2.5rem] rounded-md'>{loadingState ? 'VERIFYING...' : 'VERIFY'}</button>
                </div>
            </div>
        </div>
    )
}

export default Otp
