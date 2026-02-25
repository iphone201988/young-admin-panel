import { Link, useParams, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { getCompleteUrl } from "@/lib/utils";

export default function PostDetail() {
  const { id } = useParams();
  const location = useLocation();
  const post = location.state?.post;

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-border shadow-sm p-8 text-center">
          <p className="text-muted-foreground mb-4">Post not found or no details available.</p>
          <Button asChild variant="outline">
            <Link to="/admin/posts">Back to Posts</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin/posts">← Back to Posts</Link>
        </Button>
      </div>
      <div className="bg-white rounded-xl border border-border shadow-sm p-6 space-y-6">
        <h1 className="text-xl font-bold">Post Details</h1>

        <div className="space-y-3 text-sm">
          <p>
            <strong>Post ID:</strong>{" "}
            <span className="font-mono text-muted-foreground">{post.id}</span>
          </p>
          <p>
            <strong>Title:</strong> {post.title}
          </p>
          <p>
            <strong>Author:</strong> {post.author}
          </p>
          {post.authorUserId && (
            <p>
              <strong>Author User ID:</strong>{" "}
              <span className="font-mono text-muted-foreground">{post.authorUserId}</span>
            </p>
          )}
          <p>
            <strong>Created At:</strong> {post.createdAt}
          </p>
          <p>
            <strong>Symbol:</strong> {post.symbol}
          </p>
          <p>
            <strong>Topic:</strong> {post.topic}
          </p>
          <p>
            <strong>Description:</strong>
          </p>
          <p className="whitespace-pre-line border rounded p-3 bg-muted/20">
            {post.fullDescription ?? post.description}
          </p>
        </div>

        {post.image && (
          <div>
            <p className="font-medium mb-2">Image</p>
            <img
              src={getCompleteUrl(post.image)}
              alt="Post"
              className="w-full max-h-96 object-contain rounded border"
            />
          </div>
        )}
      </div>
    </div>
  );
}
