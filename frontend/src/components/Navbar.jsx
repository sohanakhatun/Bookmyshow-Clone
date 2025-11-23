import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  Heart,
  Ticket,
  Search,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import AllLocations from "./Navigation/AllLocations";
import { useUserCity } from "../hooks/useLocation";
import SearchComponent from "./Navigation/SearchComponent";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="bg-white shadow-md border-b border-gray-100 w-full top-0 left-0 z-50 sticky">
        <div className="max-w-7xl mx-auto ">
          <div className="flex justify-between h-16 items-center gap-12 px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="block text-2xl whitespace-nowrap font-semibold text-black"
            >
              🎬 MovieTime
            </Link>
            <div className="flex gap-2 sm:flex-1">
              <SearchComponent />
              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6">
                <AllLocations />
                {user ? (
                  <div className="text-gray-700 cursor-pointer hover:text-black transition font-medium">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Avatar className="h-10 w-10 ">
                          <AvatarImage
                            src={user?.avatar || ""}
                            alt={user?.name}
                          />
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
                          className="mb-2 font-medium text-center w-full flex bg-zinc-800 hover:bg-zinc-700 text-white rounded-md p-2 justify-center"
                        >
                          My Profile
                        </Link>

                        <Button
                          variant="outline"
                          className="w-full flex justify-center"
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
              <div className="flex gap-5 md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden text-gray-700 hover:text-black"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <div className="px-5 py-5 space-y-6">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-1 ring-gray-300">
                      <AvatarImage src={user?.avatar || ""} alt={user?.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {user?.name ? (
                          user.name.charAt(0).toUpperCase()
                        ) : (
                          <User />
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-500">Logged in</p>
                    </div>
                  </div>

                  <div className="space-y-3 flex gap-[11px]">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">My Profile</Button>
                    </Link>
                    <AllLocations />
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">
                      <LogIn className="w-4 h-4 mr-2" /> Login
                    </Button>
                  </Link>

                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* --------------- BOTTOM MOBILE NAVBAR --------------- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-md p-2 flex justify-around z-50">
        <Link to="/dashboard" className="flex flex-col items-center text-sm">
          <User className="h-6 w-6" />
          <span>Account</span>
        </Link>

        <Link to="/liked" className="flex flex-col items-center text-sm">
          <Heart className="h-6 w-6" />
          <span>Liked</span>
        </Link>

        <Link to="/bookings" className="flex flex-col items-center text-sm">
          <Ticket className="h-6 w-6" />
          <span>Bookings</span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
