import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Check, X } from "lucide-react";
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
// import { useGetAdsQuery, useUpdateAdMutation } from "@/store/api";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AdsTable() {
  const [statusFilter, setStatusFilter] = useState("all");

  // const { data: ads = [], isLoading } = useGetAdsQuery();
  // const [updateAd] = useUpdateAdMutation();

  const ads: any = [];
  const filteredAds: any = [];

  // const filteredAds = ads.filter(
  //   (ad) => statusFilter === "all" || ad.status === statusFilter
  // );

  const handleAdAction = async (
    id: number,
    status: "approved" | "rejected"
  ) => {
    // await updateAd({
    //   id,
    //   updates: {
    //     status,
    //     reviewedAt: new Date(),
    //     reviewedBy: 1, // Current admin user ID
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
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Ad ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAds.map((ad:any) => (
              <motion.tr
                key={ad.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="table-row"
              >
                <TableCell>
                  <span className="font-medium">#{ad.id}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{ad.subject}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{ad.companyName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{ad.contactName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{ad.email}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      statusColors[ad.status as keyof typeof statusColors]
                    }
                  >
                    {ad.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(ad.createdAt).toLocaleDateString()}
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
                    {ad.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAdAction(ad.id, "approved")}
                          className="text-secondary hover:bg-secondary hover:text-secondary-foreground"
                        >
                          <Check size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAdAction(ad.id, "rejected")}
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
