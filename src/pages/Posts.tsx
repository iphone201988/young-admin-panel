import { motion } from "framer-motion";
import { FileText, Trash2, Flag, Share2, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetPostsQuery } from "@/redux/api";
import { useEffect, useState } from "react";
import moment from "moment";
import DataTable from "@/components/table";
import { getPostsColumns } from "@/columns";
import PostModal from "@/components/PostModal";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchUserId, setSearchUserId] = useState("");
  const debouncedSearch = useDebouncedValue(searchUserId.trim(), 400);
  const { data, isLoading } = useGetPostsQuery({
    page: currentPage,
    userId: debouncedSearch || undefined,
  });
  // console.log(data?.data?.posts)
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    totalDeletedPosts: 0,
    totalResharedPosts: 0,
    totalScheduledPosts: 0,
  });

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handlePostView = (id: string) => {
    const selected = posts.find((post: any) => post.id === id);
    setSelectedPost(selected);
    setShowModal(true);
  };
  const postsColumns = getPostsColumns(handlePostView);
  // const posts: any = [];
  // Calculate post statistics

  useEffect(() => {
    if (data?.success) {

      // console.log("called ")
      const finalData = data?.data?.posts.map((post: any) => ({
        id: post?._id,
        title: post?.title,
        author: post?.userId?.firstName
          ? post?.userId?.firstName + " " + post?.userId?.lastName
          : "",
        authorUserId: post?.userId?._id ?? "",
        description:
          post?.description?.length > 30
            ? post.description.substring(0, 30) + "..."
            : post?.description,
        fullDescription: post?.description ?? "",
        createdAt: moment(post?.createdAt).format("YYYY-MM-DD"),
        symbol: post?.symbol,
        topic: post?.topic,
        image: post?.image,
      }));

      setPosts(finalData);
     

      const {
        total,
        totalDeletedPosts,
        totalResharedPosts,
        totalScheduledPosts,
      } = data?.data;

      setStats({
        total,
        totalDeletedPosts,
        totalResharedPosts,
        totalScheduledPosts,
      });
    }
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 "
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        <Card>
          <CardContent className="p-6 h-full overflow-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Posts
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="text-secondary" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Scheduled Posts
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.totalScheduledPosts}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Flag className="text-amber-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Re-Shared Posts
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.totalResharedPosts}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                <Share2 className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Deleted Posts
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.totalDeletedPosts}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Trash2 className="text-red-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-border">
        {showModal && selectedPost && (
          <PostModal
            open={showModal}
            onClose={() => setShowModal(false)}
            post={selectedPost}
          />
        )}

        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">All Posts</h3>
            <p className="text-sm text-muted-foreground">
              Manage user posts and content moderation
            </p>
          </div>
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
        <div className="p-6  " >
          <DataTable
            totalData={data?.pagination?.count}
            data={posts}
            columns={postsColumns}
            searchable={false}
            sortable={true}
            pageSize={20}
            isLoading={isLoading}
            className="mb-8"
            totalPages={data?.pagination?.totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            paginated={true}
          />
        </div>
      </div>
    </motion.div>
  );
}
