import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/assets/Logo.png';
import Side from '@/assets/8407.jpg';
import { Eye, EyeOff } from 'lucide-react';  // <<-- Import icons

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex items-center justify-center w-1/2 bg-white">
        <div className="w-96 p-8 border rounded-2xl shadow-lg flex flex-col items-center">
          <div className="">
            <img
              src={Logo}
              alt="Login Logo"
              className="w-30 h-30 object-contain"
            />
          </div>
          <span className='mb-5 text-lg font-semibold'>Sign In</span>

          <div className="w-full space-y-4">
            <Input placeholder="Email" />

            <div className="relative">
              <Input
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

            <Button onClick={() => window.location.href = '/dashboard'} className="w-full mt-6 cursor-pointer">Login</Button>

          <p className="mt-4 text-muted-foreground text-sm font-semibold">
            Don't have an account?{' '}
            <a className="text-gray-950 hover:underline" href="/signup">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center w-1/2 bg-[#FFFFFF]">
        <div className="w-3/4 h-3/4">
          <img
            src={Side}
            alt="Main Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
