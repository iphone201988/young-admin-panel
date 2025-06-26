import { motion } from "framer-motion";
import { Check, X, Clock } from "lucide-react";
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
// import { useGetCRDVerificationsQuery, useUpdateCRDVerificationMutation } from "@/store/api";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function CRDVerificationTable() {
  // const { data: verifications = [], isLoading } = useGetCRDVerificationsQuery();
  // const [updateVerification] = useUpdateCRDVerificationMutation();
  const verifications: any = [];
  const handleVerificationAction = async (
    id: number,
    status: "approved" | "rejected"
  ) => {
    // await updateVerification({
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
      className="bg-white rounded-xl shadow-sm border border-border overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>User ID</TableHead>
            <TableHead>CRD Number</TableHead>
            <TableHead>Submitted Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {verifications.map((verification: any) => (
            <motion.tr
              key={verification.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="table-row"
            >
              <TableCell>
                <span className="font-medium">#{verification.userId}</span>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm">
                  {verification.crdNumber}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {new Date(verification.submittedAt).toLocaleDateString()}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    statusColors[
                      verification.status as keyof typeof statusColors
                    ]
                  }
                >
                  {verification.status}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {verification.notes || "No notes"}
                </span>
              </TableCell>
              <TableCell>
                {verification.status === "pending" && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleVerificationAction(verification.id, "approved")
                      }
                      className="text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <Check size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleVerificationAction(verification.id, "rejected")
                      }
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                )}
                {verification.status !== "pending" && (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock size={16} />
                    <span className="text-sm">
                      {verification.reviewedAt
                        ? new Date(verification.reviewedAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                )}
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
