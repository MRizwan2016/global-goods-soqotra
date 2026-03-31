
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { User } from "@/types/auth";
import { UserCheck, UserX, Settings, Pencil, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UserPermissionsPanel from "./UserPermissionsPanel";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserListProps {
  users: User[];
  loading: Record<string, boolean>;
  toggleUserStatus: (userId: string) => Promise<void>;
}

const UserList = ({ users, loading, toggleUserStatus }: UserListProps) => {
  const { currentUser, isAdmin } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ email: "", mobileNumber: "", country: "" });
  const [saving, setSaving] = useState(false);

  const handleToggleStatus = async (userId: string) => {
    await toggleUserStatus(userId);
  };

  const openPermissionsDialog = (user: User) => {
    setSelectedUser(user);
    setPermissionsDialogOpen(true);
  };

  const startEditing = (user: User) => {
    setEditingUserId(user.id);
    setEditForm({
      email: user.email,
      mobileNumber: user.mobileNumber || "",
      country: user.country || "",
    });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setEditForm({ email: "", mobileNumber: "", country: "" });
  };

  const saveUserDetails = async (userId: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          email: editForm.email,
          mobile_number: editForm.mobileNumber,
          country: editForm.country,
        })
        .eq("user_id", userId);

      if (error) {
        toast.error("Failed to update user details");
        console.error("Update error:", error);
      } else {
        toast.success("User details updated successfully");
        setEditingUserId(null);
        // Reload page to reflect changes
        window.location.reload();
      }
    } catch (err) {
      toast.error("Error saving user details");
    } finally {
      setSaving(false);
    }
  };

  const getUserColors = (userIndex: number) => {
    const colors = [
      'bg-cyan-50 border-cyan-200', 'bg-blue-50 border-blue-200',
      'bg-indigo-50 border-indigo-200', 'bg-purple-50 border-purple-200',
      'bg-pink-50 border-pink-200', 'bg-rose-50 border-rose-200',
      'bg-orange-50 border-orange-200', 'bg-amber-50 border-amber-200',
      'bg-yellow-50 border-yellow-200', 'bg-lime-50 border-lime-200',
      'bg-green-50 border-green-200', 'bg-emerald-50 border-emerald-200',
      'bg-teal-50 border-teal-200',
    ];
    return colors[userIndex % colors.length];
  };

  const getCircleColors = (userIndex: number) => {
    const colors = [
      'bg-cyan-100 text-cyan-700', 'bg-blue-100 text-blue-700',
      'bg-indigo-100 text-indigo-700', 'bg-purple-100 text-purple-700',
      'bg-pink-100 text-pink-700', 'bg-rose-100 text-rose-700',
      'bg-orange-100 text-orange-700', 'bg-amber-100 text-amber-700',
      'bg-yellow-100 text-yellow-700', 'bg-lime-100 text-lime-700',
      'bg-green-100 text-green-700', 'bg-emerald-100 text-emerald-700',
      'bg-teal-100 text-teal-700',
    ];
    return colors[userIndex % colors.length];
  };

  return (
    <div className="space-y-4">
      {users.map((user, index) => {
        const userColors = getUserColors(index);
        const circleColors = getCircleColors(index);
        const userNumber = index + 1;
        const isEditing = editingUserId === user.id;
        
        return (
          <div 
            key={user.id} 
            className={`group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${userColors}`}
          >
            <div className="flex items-start gap-4">
              {/* User Number Circle */}
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200 ${circleColors}`}>
                  <span className="text-lg font-bold">{userNumber}</span>
                </div>
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Primary Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{user.fullName}</h3>
                      {user.isAdmin && (
                        <Badge variant="secondary" className="bg-white/70 text-xs">Admin</Badge>
                      )}
                      <Badge
                        variant={user.isActive ? "default" : "destructive"}
                        className={`text-xs ${user.isActive ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    {isEditing ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm w-16">Email:</span>
                          <Input
                            value={editForm.email}
                            onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                            className="h-8 text-sm max-w-xs"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm w-16">Mobile:</span>
                          <Input
                            value={editForm.mobileNumber}
                            onChange={(e) => setEditForm(prev => ({ ...prev, mobileNumber: e.target.value }))}
                            className="h-8 text-sm max-w-xs"
                            placeholder="Enter mobile number"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm w-16">Country:</span>
                          <Input
                            value={editForm.country}
                            onChange={(e) => setEditForm(prev => ({ ...prev, country: e.target.value }))}
                            className="h-8 text-sm max-w-xs"
                            placeholder="Enter country"
                          />
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" onClick={() => saveUserDetails(user.id)} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white">
                            <Save className="h-3 w-3 mr-1" />
                            {saving ? "Saving..." : "Save"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEditing}>
                            <X className="h-3 w-3 mr-1" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Email:</span> {user.email}</p>
                        <p><span className="font-medium">Mobile:</span> {user.mobileNumber || "—"}</p>
                        <p><span className="font-medium">Country:</span> {user.country || "—"}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:items-end">
                    {isAdmin && !isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditing(user)}
                        className="bg-white/70 hover:bg-white border-gray-300"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit Details
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openPermissionsDialog(user)}
                      disabled={!isAdmin}
                      className="bg-white/70 hover:bg-white border-gray-300"
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      {isAdmin ? "Permissions" : "Admin Only"}
                    </Button>
                    
                    {!user.isAdmin && (
                      <Button
                        variant={user.isActive ? "destructive" : "default"}
                        size="sm"
                        onClick={() => handleToggleStatus(user.id)}
                        disabled={loading[user.id]}
                        className={!user.isActive ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                      >
                        {loading[user.id] ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                        ) : user.isActive ? (
                          <><UserX className="h-4 w-4 mr-1" /> Deactivate</>
                        ) : (
                          <><UserCheck className="h-4 w-4 mr-1" /> Activate</>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Dialog open={permissionsDialogOpen} onOpenChange={setPermissionsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage User Permissions</DialogTitle>
            <DialogDescription>
              Configure access permissions for {selectedUser?.fullName}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UserPermissionsPanel
              key={selectedUser.id}
              user={users.find(u => u.id === selectedUser.id) || selectedUser}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserList;
