import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  Flag,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import { useGetStatsQuery } from "@/store/api";
import { Skeleton } from "@/components/ui/skeleton";

const statCards = [
  {
    title: "Total Users",
    icon: Users,
    color: "blue",
    key: "totalUsers" as const,
    trend: "+8.2% from last month",
  },
  {
    title: "Pending CRD",
    icon: CreditCard,
    color: "amber",
    key: "pendingCRD" as const,
    trend: "Requires attention",
  },
  {
    title: "Active Complaints",
    icon: Flag,
    color: "red",
    key: "activeComplaints" as const,
    trend: "High priority: 5",
  },
  // {
  //   title: "Monthly Revenue",
  //   icon: DollarSign,
  //   color: "green",
  //   key: "monthlyRevenue" as const,
  //   trend: "+12.5% from last month",
  // },
];

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  amber: "bg-amber-100 text-amber-600",
  red: "bg-red-100 text-red-600",
  green: "bg-green-100 text-green-600",
};

const TrendIcon = ({ stat }: { stat: number }) => {
  return stat > 0 ? (
    <TrendingUp size={12} className="mr-1" />
  ) : (
    <TrendingDown size={12} className="mr-1 text-red-500" />
  );
};

export default function StatsCards({ data, isLoading }: any) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statCards.map((card, index) => (
        <motion.div
          key={card.key}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {card.key == "totalUsers" && data?.totalUsers}
                    {card.key == "pendingCRD" && data?.pendingCRDs}
                    {card.key == "activeComplaints" && data?.pendingReports}
                  </p>
                  <p className="text-sm text-secondary mt-1 flex items-center">
                    {card.key == "totalUsers" && (
                      <>
                        <TrendIcon stat={data?.growth?.userGrowthPercent} />
                        <span
                          className={`${
                            data?.growth?.userGrowthPercent > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {data?.growth?.userGrowthPercent} from last month
                        </span>
                      </>
                    )}
                    {card.key == "pendingCRD" && (
                      <>
                        <TrendIcon stat={data?.growth?.crdGrowthPercent} />
                        <span
                          className={`${
                            data?.growth?.crdGrowthPercent > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {data?.growth?.crdGrowthPercent} from last month
                        </span>
                      </>
                    )}
                    {card.key == "activeComplaints" && (
                      <>
                        <TrendIcon stat={data?.growth?.reportGrowthPercent} />
                        <span
                          className={`${
                            data?.growth?.reportGrowthPercent > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {data?.growth?.reportGrowthPercent} from last month
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    colorClasses[card.color as keyof typeof colorClasses]
                  }`}
                >
                  <card.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
