import { motion } from "framer-motion";
import { Megaphone, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdsTable from "@/components/ads/AdsTable";
import { useGetAllAdsQuery, useUpdateAdStatusMutation } from "@/redux/api";
import { useEffect, useState } from "react";
import DataTable from "@/components/table";
import { adStatus } from "@/lib/utils";
import { getAdsColumns } from "@/columns";
import AdModal from "@/components/AdModal";
import { toast } from "react-toastify";
// import { useGetAdsQuery } from "@/store/api";

export default function Ads() {
  const [currentPage,setCurrentPage]=useState(1);
  const { data, isLoading } = useGetAllAdsQuery({page:currentPage});
  const [ads, setAds] = useState([]);
  const [stats, setStats] = useState({
    pendingAds: 0,
    approvedAds: 0,
    rejectedAds: 0,
  });

  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const [updateAdStatus, { data: updatedAd, isLoading: updatingAd }] =
    useUpdateAdStatusMutation();

  const handleAdEdit = (id: string) => {
    const selected = ads.find((ad: any) => ad.id === id);
    setSelectedAd(selected);
    setShowModal(true);
  };

  // Handle status change
  const handleStatusChange = (id: string, status: string) => {
    console.log("Status change for ad:", id, "to", status);

    const value = Object.keys(adStatus).find((key) => adStatus[key] === status);
    updateAdStatus({ id, body: { status: value } }).unwrap();
    setShowModal(false);
  };

  const adsColumns = getAdsColumns(handleAdEdit);

  useEffect(() => {
    if (updatedAd?.success) {
      toast.success(updatedAd?.message);
    }
  }, [updatedAd]);

  useEffect(() => {
    if (data?.success) {
      const { pendingAds, approvedAds, rejectedAds } = data?.data;
      const finalData = data?.data?.ads?.map((ad: any) => ({
        id: ad?._id,
        postedBy: ad?.userId?.firstName
          ? ad?.userId?.firstName + " " + ad?.userId?.lastName
          : "",
        name: ad?.name,
        email: ad?.email,
        company: ad?.company,
        website: ad?.website,
        status: ad?.status ? adStatus[ad?.status] : "",
        file: ad?.file,
      }));

      setAds(finalData);
      setStats({
        pendingAds,
        approvedAds,
        rejectedAds,
      });
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
                  Pending Approval
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.pendingAds}
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
                  Approved Ads
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.approvedAds}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-secondary" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Rejected Ads
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.rejectedAds}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="text-red-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {showModal && selectedAd && (
          <AdModal
            open={showModal}
            onClose={() => setShowModal(false)}
            ad={selectedAd}
            onStatusChange={handleStatusChange}
          />
        )}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Advertisement Submissions</h3>
          <p className="text-sm text-muted-foreground">
            Review and approve advertisement requests
          </p>
        </div>
        <div className="p-6">
          <DataTable
          totalData={data?.pagination?.count}
            data={ads}
            columns={adsColumns}
            searchable={false}
            sortable={true}
            paginated={true}
            pageSize={20}
            isLoading={isLoading || updatingAd}
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
