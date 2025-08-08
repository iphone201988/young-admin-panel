import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTable from "@/components/users/UserTable";
import CRDVerificationTable from "@/components/crd/CRDVerificationTable";
import PaymentLogsTable from "@/components/payments/PaymentLogsTable";
import AddUserModal from "@/components/users/AddUserModal";
import DataTable from "@/components/table";
import { useGetAllUsersQuery } from "@/redux/api";
import { userRole } from "@/lib/utils";
import { userColumns } from "@/columns";

const Users = () => {
  const [currentPage,setCurrentPage]=useState(1);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const { data, isLoading } = useGetAllUsersQuery({page:currentPage });
  
  useEffect(() => {
    console.log("users....", data)
    if (data?.success) {
      const finalData = data?.data?.users?.map((user: any) => ({
        id: user._id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.countryCode + user.phone,
        role: userRole[user.role],
        status: user.isDeactivated ? "Inactive" : "Active",
        isDeleted: user?.isDeleted,
        isDeactivated: user?.isDeactivated,
      }));

      setUsers(finalData);
    }
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Main Content Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold">All Users</h3>
          </div>
          <div className="p-6">
            <DataTable
            totalData={data?.pagination?.count}
              data={users}
              columns={userColumns}
              searchable={false}
              sortable={true}
              paginated={true}
              pageSize={20}
              isLoading={isLoading}
              className="mb-8"
              totalPages={data?.pagination?.totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />
    </motion.div>
  );
};

export default Users;
