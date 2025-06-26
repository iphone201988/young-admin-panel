import { motion } from "framer-motion";
import { Users, CreditCard, Flag, DollarSign, TrendingUp } from "lucide-react";
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
  {
    title: "Monthly Revenue",
    icon: DollarSign,
    color: "green",
    key: "monthlyRevenue" as const,
    trend: "+12.5% from last month",
  },
];

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  amber: "bg-amber-100 text-amber-600",
  red: "bg-red-100 text-red-600",
  green: "bg-green-100 text-green-600",
};

export default function StatsCards() {
  const stats: any = {};
  // const { data: stats, isLoading } = useGetStatsQuery();

  // if (isLoading) {
  //   return (
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  //       {Array.from({ length: 4 }).map((_, i) => (
  //         <Card key={i}>
  //           <CardContent className="p-6">
  //             <Skeleton className="h-20 w-full" />
  //           </CardContent>
  //         </Card>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                    {card.key === "monthlyRevenue"
                      ? `$${stats?.[card.key]?.toLocaleString() || 0}`
                      : stats?.[card.key]?.toLocaleString() || 0}
                  </p>
                  <p className="text-sm text-secondary mt-1 flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    {card.trend}
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
