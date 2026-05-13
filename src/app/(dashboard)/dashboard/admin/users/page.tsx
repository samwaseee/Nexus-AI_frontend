"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Shield, UserX, UserCheck, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/shared/UserAvatar";
// import { adminApi } from "@/lib/api"; // Uncomment when hooking up backend

// Mock data for UI demonstration
const mockUsers = [
  { id: "1", name: "Sarah Developer", email: "sarah@example.com", role: "freelancer", status: "active" },
  { id: "2", name: "Chris Client", email: "chris@example.com", role: "client", status: "active" },
  { id: "3", name: "Spam Bot", email: "spam@scam.com", role: "client", status: "suspended" },
  { id: "4", name: "Admin Boss", email: "admin@nexus.com", role: "admin", status: "active" },
];

export default function ManageUsersPage() {
  const [search, setSearch] = useState("");

  // In production, uncomment this to use your real adminApi
  // const { data, isLoading } = useQuery({
  //   queryKey: ["admin-users", search],
  //   queryFn: () => adminApi.getUsers({ search }).then(res => res.data),
  // });
  const users = mockUsers; 
  const isLoading = false;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-muted-foreground">View, suspend, or upgrade platform users.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search by name or email..." 
            className="pl-8" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b text-muted-foreground">
                  <th className="h-12 px-4 font-medium">User</th>
                  <th className="h-12 px-4 font-medium">Role</th>
                  <th className="h-12 px-4 font-medium">Status</th>
                  <th className="h-12 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {isLoading ? (
                  <tr><td colSpan={4} className="p-4 text-center">Loading users...</td></tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <UserAvatar user={{ name: user.name }} className="h-8 w-8" />
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge variant={user.role === "admin" ? "default" : "outline"} className="capitalize">
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge variant={user.status === "active" ? "secondary" : "destructive"} className="capitalize">
                          {user.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle text-right flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Change Role"><Shield className="h-4 w-4 text-muted-foreground" /></Button>
                        {user.status === "active" ? (
                          <Button variant="ghost" size="icon" title="Suspend"><UserX className="h-4 w-4 text-destructive" /></Button>
                        ) : (
                          <Button variant="ghost" size="icon" title="Reactivate"><UserCheck className="h-4 w-4 text-green-500" /></Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}