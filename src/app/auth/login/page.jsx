"use client";
// import { useLoginMutation } from '@/features/auth/authApi';
// import { saveToken } from '@/features/auth/authService';
import { message} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    rememberMe: ''
  });

  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const [Login , {isLoading}] = useLoginMutation();


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Remember me validation (if you need to enforce it)
    // if (!formData.rememberMe) {
    //   newErrors.rememberMe = 'You must agree to remember me';
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // try {
      //   const response = await Login({email:formData.username , password : formData.password}).unwrap();
      //   // saveToken(response?.data?.accessToken)
      //   router.push("/")
      //   setFormData({
      //     username: '',
      //     password: '',
      //     rememberMe: false
      //   });
      // } catch (error) {
      //   console.error('Login error:', error);
      //   alert(error?.data?.message);

      //   console.log(error?.data?.message)
      // } finally {
      //   setIsSubmitting(false);
      // }
    }
  };

  return (
    <div className="">
      <div className="flex h-screen justify-center">
        {/* Left Section with Background Image and Overlay */}
        <div className="hidden md:flex md:w-1/2 justify-center relative">
          <Image 
            src="/images/login.png" 
            alt="People smiling" 
            layout="fill" 
            objectFit="cover"
          />
        </div>

        {/* Right Section with Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className="text-gray-600 mt-1">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="James123"
                    className={`w-full pl-10 pr-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className={`w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="/auth/forget-password" className="text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              {/* Uncomment if you need to validate the checkbox */}
              {/* {errors.rememberMe && <p className="mt-1 text-sm text-red-600">{errors.rememberMe}</p>} */}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-gray-600">
              You don't have an account yet?{' '}
              <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;