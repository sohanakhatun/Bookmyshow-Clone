import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import { toast, Toaster } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {      
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );

      // json-server-auth returns accessToken and user
      const { accessToken, user } = response.data;
      login(user, accessToken);
      navigate("/dashboard");
      toast.success("Login Successful");
    } catch (err) {     
      toast.error(err.response.data || "Login Failed, Invalid credentials, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex  items-center justify-center from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="pl-10"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="pl-10"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-4 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-black hover:text-black font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
