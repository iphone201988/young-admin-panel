import { motion } from "framer-motion";
import { Plus, CheckCircle, MessageSquare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentActivity from "@/components/dashboard/RecentActivity";
import PendingActions from "@/components/dashboard/PendingActions";
import BarChartComponent from "@/components/BarChart";
import { useGetDashboardStatsQuery } from "@/redux/api";

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardStatsQuery();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Stats Cards */}
      <StatsCards data={data?.data} isLoading={isLoading}/>
      <BarChartComponent data={data?.data?.postsPerMonth}/>

      {/* Action Buttons */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-wrap gap-4"
      > */}
        {/* <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center space-x-2">
          <Plus size={16} />
          <span>Add New User</span>
        </Button> */}
        {/* <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground flex items-center space-x-2">
          <CheckCircle size={16} />
          <span>Bulk Approve</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <MessageSquare size={16} />
          <span>Send Message</span>
        </Button> */}
        {/* <Button variant="outline" className="flex items-center space-x-2">
          <Download size={16} />
          <span>Export Data</span>
        </Button> */}
      {/* </motion.div> */}

      {/* Quick Actions and Recent Activity */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <RecentActivity />
        <PendingActions />
      </motion.div> */}
    </motion.div>
  );
}
