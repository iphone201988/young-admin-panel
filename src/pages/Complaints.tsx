import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useGetComplaintsQuery,
  useUpdateReportStatusMutation,
} from "@/redux/api";
import { useEffect, useState } from "react";
import DataTable from "@/components/table";
import moment from "moment";
import ComplaintModal from "@/components/EditProfilePopup";
import { getComplaintcolumns } from "@/columns";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export default function Complaints() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchUserId, setSearchUserId] = useState("");
  const debouncedSearch = useDebouncedValue(searchUserId.trim(), 400);
  const { data, isLoading } = useGetComplaintsQuery({
    page: currentPage,
    userId: debouncedSearch || undefined,
  });
  const [complaints, setComplaints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [updateReportStatus, { data: updatedData, isLoading: updatingReport }] =
    useUpdateReportStatusMutation();

  const [stats, setStats] = useState({
    totalComplaints: 0,
    notResolved: 0,
  });

  const handleComplainEdit = async (e: any, id: any) => {
    e.preventDefault();
    const selected = complaints.find((c: any) => c.id === id);
    setSelectedComplaint(selected);
    setShowModal(true);
  };

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    updateReportStatus(id).unwrap();
    setShowModal(false);
  };

  const complaintsColumns = getComplaintcolumns(handleComplainEdit);

  useEffect(() => {
    if (data?.success) {
      const { totalComplaints, notResolved } = data?.data;
      const finalData = data?.data?.complaints.map((complaint: any) => ({
        id: complaint._id,
        user: complaint?.userId?.firstName
          ? complaint?.userId?.firstName + " " + complaint?.userId?.lastName
          : "",
        reportedUserId: complaint?.userId?._id ?? "",
        reporter:
          complaint?.reporterUserId?.firstName +
          " " +
          complaint?.reporterUserId?.lastName,
        reason: complaint.reason,
        createdAt: moment(complaint.createdAt).format("YYYY-MM-DD"),
        isResolved: complaint.isResolved,
        screenshots: complaint.screenshots,
        additionalDetails: complaint.additionalDetails,
      }));

      setComplaints(finalData);
      setStats({ totalComplaints, notResolved });
    }
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Complaints
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.notResolved}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="text-amber-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Resolved
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.totalComplaints - stats?.notResolved}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="text-secondary" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.totalComplaints}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {showModal && selectedComplaint && (
          <ComplaintModal
            open={showModal}
            onClose={() => setShowModal(false)}
            complaint={selectedComplaint}
            onStatusChange={handleStatusChange}
          />
        )}
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold">All Complaints</h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by User ID"
              value={searchUserId}
              onChange={(e) => {
                setSearchUserId(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="p-6">
          <DataTable
            totalData={data?.pagination?.count}
            data={complaints}
            columns={complaintsColumns}
            searchable={false}
            sortable={true}
            paginated={true}
            pageSize={20}
            isLoading={isLoading || updatingReport}
            className="mb-8"
            totalPages={data?.pagination?.totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </motion.div>
  );
}
