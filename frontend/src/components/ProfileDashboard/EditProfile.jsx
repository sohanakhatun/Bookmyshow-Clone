import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../Context/AuthContext";
import {
  User,
  AtSign,
  Phone,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function EditProfile() {
  const { user, setUser } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: user?.name,
    username: user?.username,
    phoneNumber: user?.phoneNumber,
    age: user?.age,
    avatar: user?.avatar,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const userId = user?.id;

      const res = await axios.patch(
        `http://localhost:5000/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      toast.success("Profile Updated Successfully");
      setIsModalOpen(false);
    } catch (err) {
      console.error("❌ Error updating user:", err);
      toast.err("Something went wrong!");
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={(e) => {
                setIsModalOpen(true);
              }}
            >
              Edit Profile
            </Button>
          </DialogTrigger>
          {isModalOpen && (
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                {/* Name */}
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="name"
                      name="name"
                      defaultValue={user?.name || formData.name}
                      onChange={(e) => handleChange(e)}
                      className="pl-10"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative mt-1">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="username"
                      name="username"
                      defaultValue={user?.username || formData.username}
                      onChange={(e) => handleChange(e)}
                      className="pl-10"
                      placeholder="@username"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="grid gap-3">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      defaultValue={formData.phoneNumber}
                      onChange={(e) => handleChange(e)}
                      className="pl-10"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Age */}
                <div className="grid gap-3">
                  <Label htmlFor="age">Age</Label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="age"
                      name="age"
                      defaultValue={formData.age}
                      onChange={(e) => handleChange(e)}
                      type="number"
                      className="pl-10"
                      placeholder="Enter your age"
                    />
                  </div>
                </div>

                {/* Avatar */}
                <div className="grid gap-3">
                  <Label htmlFor="avatar">Avatar</Label>
                  <div className="relative mt-1">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="avatar"
                      name="avatar"
                      type="url"
                      defaultValue={formData.avatar}
                      onChange={(e) => handleChange(e)}
                      className="pl-10"
                      placeholder="Paste image URL"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    editProfile(e);
                  }}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </form>
      </Dialog>
    </>
  );
}
