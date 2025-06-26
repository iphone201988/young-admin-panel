import { motion } from "framer-motion";
import { CreditCard, Flag, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { useGetStatsQuery } from "@/store/api";

export default function PendingActions() {
  // const { data: stats } = useGetStatsQuery();

  const pendingActions = [
    {
      icon: CreditCard,
      title: "CRD Verifications",
      description: ` pending approvals`,
      color: "amber",
      action: "Review",
    },
    {
      icon: Flag,
      title: "High Priority Complaints",
      description: "5 urgent reports",
      color: "red",
      action: "Handle",
    },
    {
      icon: Megaphone,
      title: "Megaphone Approvals",
      description: ` ads waiting`,
      color: "blue",
      action: "Approve",
    },
  ];

  const colorClasses = {
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    red: "bg-red-50 border-red-200 text-red-800",
    blue: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const buttonClasses = {
    amber: "text-amber-600 hover:text-amber-700",
    red: "text-red-600 hover:text-red-700",
    blue: "text-blue-600 hover:text-blue-700",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Pending Actions</CardTitle>
          <Badge variant="destructive">
            {/* {(stats?.pendingCRD || 0) + (stats?.pendingAds || 0) + 5} items */}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-lg border ${colorClasses[action.color as keyof typeof colorClasses]}`}
            >
              <div className="flex items-center space-x-3">
                <action.icon size={20} />
                <div>
                  <p className="text-sm font-medium">{action.title}</p>
                  <p className="text-xs opacity-70">{action.description}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className={buttonClasses[action.color as keyof typeof buttonClasses]}
              >
                {action.action}
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
