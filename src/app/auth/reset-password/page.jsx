"use client";
// import { useResetPasswordMutation } from '@/features/auth/authApi';
import { notification } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // const [resetPassword, {isLoading, isError, error}] = useResetPasswordMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    const newErrors = {
      newPassword: '',
      confirmPassword: ''
    };

    // New Password validation
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter';
      isValid = false;
    } else if (!/[0-9]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one number';
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("forgot-password-otp-token");
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // try {
      //   // Simulate API call to reset password
      //   const response = await resetPassword({newPassword:formData.newPassword , confirmPassword:formData.confirmPassword , token: token }).unwrap()
      //   console.log(response)
      //   // Show success state
      //   setIsSuccess(true);
      //   notification.success({
      //     message: 'Password Reset Successful',
      //     description: 'Your password has been updated successfully',
      //   });

      //   // Reset form
      //   setFormData({
      //     newPassword: '',
      //     confirmPassword: ''
      //   });

      //   // Optionally redirect after delay
      //   setTimeout(() => {
      //     router.push('/auth/login');
      //   }, 2000);
      // } catch (error) {
      //   notification.error({
      //     message: 'Reset Failed',
      //     description: 'Failed to reset password. Please try again.',
      //   });
      // } finally {
      //   setIsSubmitting(false);
      // }
    }
  };

  return (
    <div className="">
      <div className="flex h-screen justify-center">
        {/* Left Section with Background Image */}
        <div className="hidden md:flex md:w-1/2 justify-center relative">
          <Image 
            src="/images/login.png" 
            alt="People smiling" 
            layout="fill" 
            objectFit="cover"
          />
        </div>

        {/* Right Section with Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold">Reset Password</h2>
              <p className="text-gray-600 mt-1">
                {isSuccess ? 'Password updated successfully!' : 'Create a new password for your account'}
              </p>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className={`w-full pl-10 pr-3 py-2 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                  {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
                  <p className="mt-1 text-xs text-gray-500">
                    Must be at least 8 characters with 1 uppercase letter and 1 number
                  </p>
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className={`w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="mt-2 text-gray-600">You can now login with your new password</p>
                </div>
                <button
                  onClick={() => router.push('/auth/login')}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;