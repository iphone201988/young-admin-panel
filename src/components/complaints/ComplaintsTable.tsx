import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, CheckCircle, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useGetComplaintsQuery, useUpdateComplaintMutation } from "@/store/api";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  investigating: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  dismissed: "bg-gray-100 text-gray-800",
};

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
};

export default function ComplaintsTable() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // const { data: complaints = [], isLoading } = useGetComplaintsQuery();
  // const [updateComplaint] = useUpdateComplaintMutation();

  const complaints: any = [];
  const filteredComplaints: any = [];

  // const filteredComplaints = complaints.filter((complaint) => {
  //   const matchesStatus =
  //     statusFilter === "all" || complaint.status === statusFilter;
  //   const matchesPriority =
  //     priorityFilter === "all" || complaint.priority === priorityFilter;
  //   return matchesStatus && matchesPriority;
  // });

  const handleComplaintAction = async (id: number, status: string) => {
    // await updateComplaint({
    //   id,
    //   updates: {
    //     status,
    //     resolvedAt:
    //       status === "resolved" || status === "dismissed" ? new Date() : null,
    //     resolvedBy: status === "resolved" || status === "dismissed" ? 1 : null,
    //   },
    // });
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
      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="dismissed">Dismissed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Complaint ID</TableHead>
              <TableHead>Reported User</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.map((complaint:any) => (
              <motion.tr
                key={complaint.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="table-row"
              >
                <TableCell>
                  <span className="font-medium">#{complaint.id}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    User #{complaint.reportedUserId}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    User #{complaint.reporterUserId}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{complaint.reason}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      priorityColors[
                        complaint.priority as keyof typeof priorityColors
                      ]
                    }
                  >
                    {complaint.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      statusColors[
                        complaint.status as keyof typeof statusColors
                      ]
                    }
                  >
                    {complaint.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Eye size={16} />
                    </Button>
                    {complaint.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleComplaintAction(complaint.id, "resolved")
                          }
                          className="text-secondary hover:bg-secondary hover:text-secondary-foreground"
                        >
                          <CheckCircle size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleComplaintAction(complaint.id, "dismissed")
                          }
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
