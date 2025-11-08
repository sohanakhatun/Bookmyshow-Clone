import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, LogIn } from "lucide-react"; 
import { useAuth } from "../Context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Button } from "./ui/button";

import AllLocations from "./Navigation/AllLocations";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100  w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / App Name */}
          <Link to="/" className="text-2xl font-semibold text-black">
            BookMyShow
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <AllLocations />
            {user ? (
              <div className="text-gray-700 cursor-pointer hover:text-black transition font-medium">
                <HoverCard>
                  <HoverCardTrigger>
                    <Avatar className="h-10 w-10 ">
                      <AvatarImage src={user?.avatar || ""} alt={user?.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-md font-semibold">
                        {user?.name ? (
                          user.name.charAt(0).toUpperCase()
                        ) : (
                          <User className="h-8 w-8" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <Link
                      to="/dashboard"
                      className="mb-2 font-medium text-center w-full flex bg-zinc-800 hover:bg-zinc-700 text-white rounded-md p-2 justify-center transition-all"
                    >
                      My Profile
                    </Link>

                    <Button
                      variant="outline"
                      className="w-full flex justify-center text-zinc-700 hover:bg-zinc-100"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </HoverCardContent>
                </HoverCard>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-black focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/"
              className="block text-gray-700 hover:text-indigo-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/login"
              className="block text-gray-700 hover:text-indigo-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block text-gray-700 hover:text-indigo-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
