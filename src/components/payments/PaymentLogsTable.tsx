import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, DollarSign } from "lucide-react";
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
import { Input } from "@/components/ui/input";
// import { useGetPaymentLogsQuery } from "@/store/api";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

const purposeColors = {
  membership: "bg-blue-100 text-blue-800",
  ad_space: "bg-purple-100 text-purple-800",
  sponsored_post: "bg-orange-100 text-orange-800",
};

export default function PaymentLogsTable() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPayments: any = [];
  const payments: any = [];
  // const { data: payments = [], isLoading } = useGetPaymentLogsQuery();

  // const filteredPayments = payments.filter(payment => {
  //   const matchesSearch = payment.confirmationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        payment.userId.toString().includes(searchTerm);
  //   const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
  //   const matchesPurpose = purposeFilter === "all" || payment.purpose === purposeFilter;

  //   return matchesSearch && matchesStatus && matchesPurpose;
  // });

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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={purposeFilter} onValueChange={setPurposeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Purpose</SelectItem>
              <SelectItem value="membership">Membership</SelectItem>
              <SelectItem value="ad_space">Ad Space</SelectItem>
              <SelectItem value="sponsored_post">Sponsored Post</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Search by confirmation or user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">
            Showing {filteredPayments.length} of {payments.length} results
          </span>
          <div className="flex items-center space-x-2 text-sm font-medium">
            <DollarSign size={16} className="text-secondary" />
            <span>
              Total: $
              {filteredPayments
                .filter((p: any) => p.status === "confirmed")
                .reduce((sum: any, p: any) => sum + parseFloat(p.amount), 0)
                .toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Payment ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Confirmation</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment: any) => (
              <motion.tr
                key={payment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="table-row"
              >
                <TableCell>
                  <span className="font-medium">#{payment.id}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">User #{payment.userId}</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-secondary">
                    ${parseFloat(payment.amount).toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      purposeColors[
                        payment.purpose as keyof typeof purposeColors
                      ]
                    }
                  >
                    {payment.purpose.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      statusColors[payment.status as keyof typeof statusColors]
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-mono">
                    {payment.confirmationNumber || "N/A"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Eye size={16} />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
