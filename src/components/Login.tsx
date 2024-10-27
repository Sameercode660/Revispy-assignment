'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function Login() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter();


    async function handleLogin() {
        try {
            setEmailError(false);
            setPasswordError(false);

            if (!email) {
                setEmailError(true);
                return;
            }

            if (!password) {
                setPasswordError(true);
                return;
            }
            
            const data = {
                email,
                password
            }

            setLoading(true)

            const response  = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, data);
            
            setLoading(false)

            if(response.data.status) {
                router.push('/main')
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full flex justify-center items-center pt-[100px]'>
            <div className='w-[450px] h-[500px] border border-gray-300 rounded-xl flex flex-col gap-6 items-center justify-center'>
                <div>
                    <h1 className='text-[1.5rem] font-semibold'>Login</h1>
                </div>

                <div className='text-center'>
                    <p className='text-[1.3rem]'>Welcome Back to ECOMMERCE</p>
                    <p className='text-[14px] text-gray-600'>The next gen business marketplace</p>
                </div>
                <div className='flex flex-col w-[70%]'>
                    <label htmlFor="email" className='text-gray-600'>Email</label>
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        type="text" name="email" id="email" placeholder='Enter' className={`w-full h-[2.5rem] p-4 outline-none border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md `} />
                </div>
                <div className='flex flex-col w-[70%]'>
                    <label htmlFor="name" className='text-gray-600'>Password</label>
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        type="text" name="password" id="password" placeholder='Enter'  className={`w-full h-[2.5rem] p-4 outline-none border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md `} />
                </div>

                <div className='w-[70%] '>
                    <button className='w-full text-center bg-black text-white h-[2.5rem] rounded-md' onClick={handleLogin}>{loading ? 'LOGIN...' : 'LOGIN'}</button>
                </div>
                <div className='w-[70%] border-b border-gray-300'></div>

                <div>
                    <span className='text-gray-600 text-[16px]'>Don&apos;t have an Account? <Link className='font-semibold' href="./">SIGN UP</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Login
