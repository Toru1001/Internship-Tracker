import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/assets/Logo.png';
import Side from '@/assets/8407.jpg';
import { Eye, EyeOff } from 'lucide-react';
import { signup } from '@/lib/authService';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('Intern');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };

  const handleSignUp = async () => {
    try {
      const name = `${firstname} ${lastname}`;
      const response = await signup(email, name, password, repassword, role);
      const { user } = response.data;
      console.log(user);
      window.location.href = '/login';
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex flex-row-reverse min-h-screen">
      <div className="flex items-center justify-center w-1/2 bg-white">
        <div className="w-96 p-8 border rounded-2xl shadow-lg flex flex-col items-center">
          <img src={Logo} alt="Login Logo" className="w-30 h-30 object-contain" />
          <span className="mb-5 text-lg font-semibold">Sign Up</span>

          <div className="w-full space-y-4">
            <Input placeholder="First Name" onChange={(e) => setFirstname(e.target.value)} />
            <Input placeholder="Last Name" onChange={(e) => setLastname(e.target.value)} />
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

            <div className="relative">
              <Input
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Input
                placeholder="Confirm Password"
                type={showRePassword ? 'text' : 'password'}
                onChange={(e) => setRepassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleRePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-center">
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Intern">Intern</SelectItem>
                <SelectItem value="Supervisor">Supervisor</SelectItem>
              </SelectContent>
            </Select>
            </div>
            
          </div>

          <Button className="w-full mt-6 cursor-pointer" onClick={handleSignUp}>
            Sign Up
          </Button>

          <p className="mt-4 text-muted-foreground text-sm font-semibold">
            Already have an account?{' '}
            <a className="text-gray-950 hover:underline" href="/login">
              Sign In
            </a>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center w-1/2 bg-[#FFFFFF]">
        <div className="w-3/4 h-3/4">
          <img src={Side} alt="Main Logo" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
