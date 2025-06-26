import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Ban, Unlock, User as UserIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useGetUsersQuery, useUpdateUserMutation } from "@/store/api";
import { Skeleton } from "@/components/ui/skeleton";
import UserModal from "./UserModal";
import type { User } from "@/shared/schema";

const statusColors = {
  active: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  suspended: "bg-red-100 text-red-800",
  banned: "bg-gray-100 text-gray-800",
};

export default function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const { data: users = [], isLoading } = useGetUsersQuery();
  // const [updateUser] = useUpdateUserMutation();

  const users: any = [];
  const filteredUsers: any = [];

  // const filteredUsers = users.filter(user => {
  //   const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        user.email.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus = statusFilter === "all" || user.status === statusFilter;
  //   const matchesVerification = verificationFilter === "all" || user.crdStatus === verificationFilter;

  //   return matchesSearch && matchesStatus && matchesVerification;
  // });

  const handleUserAction = async (userId: number, action: string) => {
    let updates: Partial<User> = {};

    switch (action) {
      case "suspend":
        updates = { status: "suspended" };
        break;
      case "activate":
        updates = { status: "active" };
        break;
      case "ban":
        updates = { status: "banned" };
        break;
    }

    if (Object.keys(updates).length > 0) {
      // await updateUser({ id: userId, updates });
    }
  };

  const handleSelectUser = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((user: any) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // if (isLoading) {
  //   return (
  //     <div className="space-y-4">
  //       {Array.from({ length: 5 }).map((_, i) => (
  //         <Skeleton key={i} className="h-16 w-full" />
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-wrap gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={verificationFilter}
            onValueChange={setVerificationFilter}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Verification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Verification</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} results
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedUsers.length === filteredUsers.length &&
                    filteredUsers.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>CRD Number</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Complaints</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user: any) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="table-row"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) =>
                      handleSelectUser(user.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <UserIcon size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {user.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">
                    {user.crdNumber || "N/A"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.registrationDate).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      statusColors[user.status as keyof typeof statusColors]
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span
                    className={`text-sm ${
                      user.complaintsCount > 0
                        ? "text-red-600 font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {user.complaintsCount}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openUserModal(user)}
                      className="text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <Edit size={16} />
                    </Button>
                    {user.status === "suspended" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUserAction(user.id, "activate")}
                        className="text-secondary hover:bg-secondary hover:text-secondary-foreground"
                      >
                        <Unlock size={16} />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUserAction(user.id, "suspend")}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Ban size={16} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User Modal */}
      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </motion.div>
  );
}
