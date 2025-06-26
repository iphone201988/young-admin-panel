import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";
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
// import { useGetPostsQuery, useDeletePostMutation } from "@/store/api";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  active: "bg-green-100 text-green-800",
  deleted: "bg-red-100 text-red-800",
  flagged: "bg-amber-100 text-amber-800",
};

export default function PostsTable() {
  const [statusFilter, setStatusFilter] = useState("all");

  // const { data: posts = [], isLoading } = useGetPostsQuery();
  // const [deletePost] = useDeletePostMutation();

  const posts: any = [];
  const filteredPosts: any = [];

  // const filteredPosts = posts.filter(post =>
  //   statusFilter === "all" || post.status === statusFilter
  // );

  const handleDeletePost = async (postId: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      // await deletePost({ id: postId, deletedBy: 1 }); // Current admin user ID
    }
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="deleted">Deleted</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Post ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <motion.tr
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="table-row"
              >
                <TableCell>
                  <span className="font-medium">#{post.id}</span>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="font-medium truncate">{post.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {post.content.substring(0, 50)}...
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">User #{post.userId}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      statusColors[post.status as keyof typeof statusColors]
                    }
                  >
                    {post.status}
                  </Badge>
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
                    {post.status === "active" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 size={16} />
                      </Button>
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
