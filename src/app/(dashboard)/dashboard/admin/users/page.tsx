"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Shield, UserX, UserCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { adminApi } from "@/lib/api"; 

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "freelancer" | "client" | "admin";
  status: "active" | "suspended";
  avatar?: string;
}

export default function ManageUsersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 1. Debounce search to protect database from input spam
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // 2. Fetch Users matching your exact backend return shape
  const { data: response, isLoading } = useQuery({
    queryKey: ["admin-users", debouncedSearch],
    queryFn: () => adminApi.getUsers({ search: debouncedSearch }).then((res) => res.data),
  });

  // Pull array out of your backend's API wrapper envelope
  const users = response?.data || [];

  // 3. Status Mutation using your exact toggleUserStatus helper
  const statusMutation = useMutation({
    mutationFn: (id: string) => adminApi.toggleUserStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  // 4. Role Mutation matching your exact route signatures
  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => 
      adminApi.updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  // Action Triggers
  const handleToggleStatus = (id: string) => {
    statusMutation.mutate(id);
  };

  const handlePromoteAdmin = (id: string) => {
    if (confirm("Are you sure you want to promote this user to Admin?")) {
      roleMutation.mutate({ id, role: "admin" });
    }
  };

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
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        Loading platform directory...
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      No accounts matched your query.
                    </td>
                  </tr>
                ) : (
                  users.map((user: AdminUser) => (
                    <tr key={user._id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <UserAvatar user={{ name: user.name, avatar: user.avatar }} className="h-8 w-8" />
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Promote to Admin"
                          onClick={() => handlePromoteAdmin(user._id)}
                          disabled={user.role === "admin" || roleMutation.isPending}
                        >
                          <Shield className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title={user.status === "active" ? "Suspend Account" : "Reactivate Account"}
                          onClick={() => handleToggleStatus(user._id)}
                          disabled={statusMutation.isPending}
                        >
                          {user.status === "active" ? (
                            <UserX className="h-4 w-4 text-destructive" />
                          ) : (
                            <UserCheck className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
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