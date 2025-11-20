import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Heart,
  LogOut,
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Edit,
} from "lucide-react";

import MyMovies from "../Movies/MyMovies";
import LikedMovies from "../Movies/LikedMovies";
import EditProfile from "./EditProfile";
import { useUserCity } from "../../hooks/useLocation";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const { currentUserCity } = useUserCity();

  return (
    <div className="min-h-screen  from-background to-muted/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <Card className="sticky top-8">
              <CardContent className="pt-6">
                {/* Avatar */}
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/10 mb-4">
                    <AvatarImage src={user?.avatar || ""} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                      {user?.name ? (
                        user.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="h-8 w-8" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-foreground">
                    {user?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <p className="text-sm text-muted-foreground">
                    @{user?.username}
                  </p>
                </div>

                <Separator className="my-4" />

                {/* Logout Button */}
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <Tabs defaultValue="yourMovies" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="yourMovies"
                  className="gap-2 cursor-pointer"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span className="hidden sm:inline">Your Movies</span>
                </TabsTrigger>
                <TabsTrigger
                  value="likedMovies"
                  className="gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Liked Movies</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="gap-2 cursor-pointer">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
              </TabsList>

              {/* My Movies Tab */}
              <TabsContent value="yourMovies">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Movies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MyMovies />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Liked Movies Tab */}
              <TabsContent value="likedMovies">
                <Card>
                  <CardHeader>
                    <CardTitle>Liked Movies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LikedMovies />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>Profile Information</CardTitle>
                      <EditProfile />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name
                        </label>
                        <p className="text-foreground font-medium">
                          {user?.name}
                        </p>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </label>
                        <p className="text-foreground font-medium">
                          {user?.email}
                        </p>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </label>
                        <p className="text-foreground font-medium">
                          {user?.phoneNumber}
                        </p>
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                        </label>
                        <p className="text-foreground font-medium">
                          {currentUserCity}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Bio */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        About
                      </label>
                      <p className="text-foreground">{user?.bio}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <div className="text-3xl font-bold text-primary">
                            0
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Movies Attended
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <div className="text-3xl font-bold text-primary">
                            {user.likedMovies ? user.likedMovies.length : 0}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Liked Movies
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
