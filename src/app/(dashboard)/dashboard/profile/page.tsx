"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, Lock, Mail, Loader2, Briefcase, MapPin, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/api";

// Matching your Backend User Schema
interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: "client" | "freelancer" | "admin";
  avatar?: string;
  headline?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  hourlyRate?: number;
  portfolioUrl?: string;
}

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const [successMsg, setSuccessMsg] = useState("");

  // Form States
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  // Fetch Current Profile
  const { data: response, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => api.get("/users/profile").then((res) => res.data),
  });

  const profile: UserProfile | undefined = response?.data;

  // Initialize form when data loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        headline: profile.headline || "",
        bio: profile.bio || "",
        location: profile.location || "",
        skills: profile.skills || [],
        hourlyRate: profile.hourlyRate || 0,
        portfolioUrl: profile.portfolioUrl || "",
      });
    }
  }, [profile]);

  // Update Profile Mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<UserProfile>) => api.put("/users/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      showSuccess("Profile updated successfully!");
    },
  });

  // Change Password Mutation
  const changePasswordMutation = useMutation({
    mutationFn: (data: any) => api.post("/users/change-password", data),
    onSuccess: () => {
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showSuccess("Password changed successfully!");
    },
  });

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    changePasswordMutation.mutate({
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your public profile and security preferences.</p>
      </div>

      {successMsg && (
        <div className="bg-green-500/10 text-green-600 border border-green-500/20 p-4 rounded-md flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          {successMsg}
        </div>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
          <TabsTrigger value="general">General Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* ─── GENERAL PROFILE TAB ─────────────────────────────────────────── */}
        <TabsContent value="general" className="mt-6">
          <form onSubmit={handleProfileSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Public Profile</CardTitle>
                <CardDescription>
                  This is how others will see you on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-muted overflow-hidden border">
                    <img 
                      src={profile?.avatar || `https://api.dicebear.com/8.x/initials/svg?seed=${profile?.name}`} 
                      alt="Avatar" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{profile?.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {profile?.email} (Cannot be changed)
                    </p>
                    <div className="mt-2 text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-md inline-block uppercase tracking-wider">
                      {profile?.role} Account
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="location" 
                        className="pl-9" 
                        placeholder="e.g. San Francisco, CA"
                        value={formData.location} 
                        onChange={(e) => setFormData({...formData, location: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input 
                    id="headline" 
                    placeholder="e.g. Senior Full-Stack Developer"
                    value={formData.headline} 
                    onChange={(e) => setFormData({...formData, headline: e.target.value})} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About Me (Bio)</Label>
                  <Textarea 
                    id="bio" 
                    rows={4}
                    placeholder="Tell clients about your experience and what you do best..."
                    value={formData.bio} 
                    onChange={(e) => setFormData({...formData, bio: e.target.value})} 
                  />
                </div>

                {/* Freelancer Specific Fields */}
                {profile?.role === "freelancer" && (
                  <>
                    <div className="border-t pt-6 mt-6">
                      <h4 className="font-medium mb-4 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" /> Freelancer Details
                      </h4>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="rate">Hourly Rate ($)</Label>
                          <Input 
                            id="rate" 
                            type="number" 
                            value={formData.hourlyRate} 
                            onChange={(e) => setFormData({...formData, hourlyRate: Number(e.target.value)})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="portfolio">Portfolio URL</Label>
                          <Input 
                            id="portfolio" 
                            type="url" 
                            placeholder="https://"
                            value={formData.portfolioUrl} 
                            onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})} 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills (Comma separated)</Label>
                      <Input 
                        id="skills" 
                        placeholder="React, Next.js, TypeScript"
                        value={formData.skills?.join(", ")} 
                        onChange={(e) => {
                          const skillsArray = e.target.value.split(",").map(s => s.trim()).filter(s => s !== "");
                          setFormData({...formData, skills: skillsArray});
                        }} 
                      />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="bg-muted/30 py-4 flex justify-end border-t">
                <Button type="submit" disabled={updateProfileMutation.isPending}>
                  {updateProfileMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* ─── SECURITY TAB ────────────────────────────────────────────────── */}
        <TabsContent value="security" className="mt-6">
          <form onSubmit={handlePasswordSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Ensure your account is using a long, random password to stay secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="current" 
                      type="password" 
                      className="pl-9"
                      required
                      value={passwords.currentPassword} 
                      onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input 
                    id="new" 
                    type="password" 
                    required
                    value={passwords.newPassword} 
                    onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input 
                    id="confirm" 
                    type="password" 
                    required
                    value={passwords.confirmPassword} 
                    onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})} 
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 py-4 flex justify-start border-t">
                <Button type="submit" variant="destructive" disabled={changePasswordMutation.isPending}>
                  {changePasswordMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}