"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateOurTeamMutation } from "@/api/admin/our-team/ourTeamApi";
import { useGenerateOtpMutation } from "@/api/auth/authApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ProfileSettings() {
  const { user, isLoading } = useAuth();
  const [updateOurTeam, { isLoading: isUpdating }] = useUpdateOurTeamMutation();
  const [generateOtp, { isLoading: isGeneratingOtp }] = useGenerateOtpMutation();

  const [showOtpDialog, setShowOtpDialog] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const updateProfile = async (otpCode = null) => {
    const toastId = toast.loading("Updating profile...");
    try {
      const payload = {
        id: user.id,
        ...formData,
      };
      
      if (otpCode) {
        payload.otp = otpCode;
      }

      await updateOurTeam(payload).unwrap();
      toast.success("Profile updated successfully", { id: toastId });
      setShowOtpDialog(false);
      setOtp("");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile", {
        id: toastId,
      });
    }
  };

  const handleSave = async () => {
    // Check if email changed
    if (formData.email && user.email && formData.email !== user.email) {
      const toastId = toast.loading("Sending verification code...");
      try {
        await generateOtp(formData.email).unwrap();
        toast.success("Verification code sent to your new email", { id: toastId });
        setShowOtpDialog(true);
      } catch (error) {
        toast.error(error?.data?.message || "Failed to send verification code", { id: toastId });
      }
      return;
    }

    // Normal save if email didn't change
    updateProfile();
  };

  const handleDisplayOtpDialogChange = (open) => {
    setShowOtpDialog(open);
    if (!open) {
      setOtp("");
    }
  }

  const handleVerifyAndSave = async () => {
    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }
    
    // We pass the OTP to updateProfile, which sends it to backend for verification + update
    setIsVerifying(true);
    await updateProfile(otp);
    setIsVerifying(false);
  };

  const firstName = formData.firstName;
  const lastName = formData.lastName;
  const email = formData.email;
  const role = user?.role || user?.position || "";
  const bio = formData.bio;

  const initials = `${(firstName?.[0] || "").toUpperCase()}${(lastName?.[0] || "").toUpperCase()}` || "U";
  const avatarSrc = user?.profileImage || "/avatars/01.png";

  if (isLoading) {
    return (
      <div className="max-w-2xl glass-card border-white/20 p-4 sm:p-6 rounded-xl text-white/70">
        Loading your profile…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl glass-card border-white/20 p-4 sm:p-6 rounded-xl text-white/70">
        No logged-in user found. Please log in again.
      </div>
    );
  }

  return (
    <div className="max-w-2xl glass-card border-white/20 p-4 sm:p-6 rounded-xl">
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 mb-8">
        <div className="relative group cursor-pointer">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-[#EFFC76] shadow-sm mx-auto sm:mx-0">
            <AvatarImage src={avatarSrc} alt={`${firstName} ${lastName}`.trim() || "User"} />
            <AvatarFallback className="bg-[#EFFC76] text-black">{initials}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">Profile Picture</h3>
          <p className="text-sm text-white/70 mb-2">
            Upload a new avatar. Recommended size 400x400px.
          </p>
          <div className="flex gap-3 justify-center sm:justify-start">
             <Button
              variant="outline"
              size="sm"
              className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10"
             >
              Change
             </Button>
             <Button
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
             >
              Remove
             </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white/80">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={handleChange}
              className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white/80">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={handleChange}
              className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleChange}
            className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-white/80">Role</Label>
          <Input
            id="role"
            defaultValue={role}
            disabled
            className="bg-white/10 text-white/60 border border-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-white/80">Bio</Label>
          <Textarea 
            id="bio" 
            placeholder="Write a short bio..." 
            className="min-h-[120px] bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
            value={bio}
            onChange={handleChange}
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={isUpdating}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button min-w-[120px]"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
      <Dialog open={showOtpDialog} onOpenChange={handleDisplayOtpDialogChange}>
        <DialogContent className="sm:max-w-md bg-[#0A0A0A] border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Verify Email Address</DialogTitle>
            <DialogDescription className="text-white/60">
              We've sent a 6-digit code to <strong>{formData.email}</strong>. 
              Please enter it below to confirm your email change.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 py-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="otp" className="sr-only">
                OTP Code
              </Label>
              <Input
                id="otp"
                placeholder="000000"
                className="text-center text-lg tracking-widest bg-white/5 border-white/20 text-white"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              onClick={handleVerifyAndSave}
              disabled={isVerifying || otp.length < 6}
              className="w-full bg-[#EFFC76] hover:bg-[#e0ef5f] text-black"
            >
              {isVerifying ? "Verifying..." : "Verify & Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
