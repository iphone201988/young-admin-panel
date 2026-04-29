import { Link, useLocation, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { getCompleteUrl } from "@/lib/utils";
import { useGetComplaintByIdQuery } from "@/redux/api";
import moment from "moment";

export default function ComplaintDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const stateComplaint = location.state?.complaint;
  const { data, isLoading, isError } = useGetComplaintByIdQuery(id!, { skip: !id });
  const complaintFromApi = data?.data?.complaint;

  const complaint = complaintFromApi
    ? {
        id: complaintFromApi?._id,
        user: complaintFromApi?.userId?.firstName
          ? `${complaintFromApi?.userId?.firstName} ${complaintFromApi?.userId?.lastName}`
          : "",
        reportedUserId: complaintFromApi?.userId?._id ?? "",
        reporter: complaintFromApi?.reporterUserId?.firstName
          ? `${complaintFromApi?.reporterUserId?.firstName} ${complaintFromApi?.reporterUserId?.lastName}`
          : "",
        reporterUserId: complaintFromApi?.reporterUserId?._id ?? "",
        reason: complaintFromApi?.reason,
        createdAt: moment(complaintFromApi?.createdAt).format("YYYY-MM-DD"),
        isResolved: complaintFromApi?.isResolved,
        screenshots: complaintFromApi?.screenshots ?? [],
        additionalDetails: complaintFromApi?.additionalDetails,
        reportedPost: complaintFromApi?.postId
          ? {
              id: complaintFromApi?.postId?._id,
              title: complaintFromApi?.postId?.title,
              description: complaintFromApi?.postId?.description,
              image: complaintFromApi?.postId?.image,
              symbol: complaintFromApi?.postId?.symbol,
              topic: complaintFromApi?.postId?.topic,
              createdAt: complaintFromApi?.postId?.createdAt,
              author: complaintFromApi?.postId?.userId?.firstName
                ? `${complaintFromApi?.postId?.userId?.firstName} ${complaintFromApi?.postId?.userId?.lastName}`
                : "",
              authorUserId: complaintFromApi?.postId?.userId?._id ?? "",
            }
          : null,
      }
    : stateComplaint;

  if (isLoading && !complaint) {
    return (
      <div className="w-full p-4 md:p-6 flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  if (isError || !complaint) {
    return (
      <div className="w-full p-4 md:p-6">
        <div className="bg-white rounded-xl border border-border shadow-sm p-8 text-center">
          <p className="text-muted-foreground mb-4">Complaint not found or no details available.</p>
          <Button asChild variant="outline">
            <Link to="/admin/complaints">Back to Complaints</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6">
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin/complaints">← Back to Complaints</Link>
        </Button>
      </div>
      <div className="bg-white rounded-xl border border-border shadow-sm p-6 space-y-6">
        <h1 className="text-xl font-bold">Complaint Details</h1>

        <div className="space-y-3 text-sm">
          <p>
            <strong>Complaint ID:</strong>{" "}
            <span className="font-mono text-muted-foreground">{complaint.id}</span>
          </p>
          <p>
            <strong>Reported User:</strong> {complaint.user || "—"}
          </p>
          {complaint.reportedUserId && (
            <p>
              <strong>Reported User ID:</strong>{" "}
              <span className="font-mono text-muted-foreground">{complaint.reportedUserId}</span>
            </p>
          )}
          <p>
            <strong>Reporter:</strong> {complaint.reporter}
          </p>
          {complaint.reporterUserId && (
            <p>
              <strong>Reporter User ID:</strong>{" "}
              <span className="font-mono text-muted-foreground">{complaint.reporterUserId}</span>
            </p>
          )}
          <p>
            <strong>Reason:</strong> {complaint.reason}
          </p>
          <p>
            <strong>Date:</strong> {complaint.createdAt}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                complaint.isResolved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {complaint.isResolved ? "Resolved" : "Pending"}
            </span>
          </p>
          {complaint.additionalDetails && (
            <>
              <p>
                <strong>Additional Details:</strong>
              </p>
              <p className="whitespace-pre-line border rounded p-3 bg-muted/20">
                {complaint.additionalDetails}
              </p>
            </>
          )}
        </div>

        <div className="rounded-lg border border-border p-4">
          <h2 className="text-base font-semibold mb-3">Admin Communication Shortcuts</h2>
          <div className="flex flex-wrap gap-2">
            {complaint.reportedUserId && (
              <Button asChild size="sm" variant="outline">
                <Link to={`/admin/users/${complaint.reportedUserId}`}>Open Reported User Profile</Link>
              </Button>
            )}
            {complaint.reporterUserId && (
              <Button asChild size="sm" variant="outline">
                <Link to={`/admin/users/${complaint.reporterUserId}`}>Open Reporter Profile</Link>
              </Button>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Open each user profile to use the support chat and communicate with both parties.
          </p>
        </div>

        {complaint.reportedPost && (
          <div className="rounded-lg border border-border p-4 space-y-2">
            <h2 className="text-base font-semibold">Reported Post</h2>
            <p>
              <strong>Post ID:</strong>{" "}
              <span className="font-mono text-muted-foreground">{complaint.reportedPost.id}</span>
            </p>
            <p>
              <strong>Title:</strong> {complaint.reportedPost.title || "—"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {complaint.reportedPost.description
                ? String(complaint.reportedPost.description).slice(0, 180)
                : "—"}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button asChild size="sm" variant="outline">
                <Link
                  to={`/admin/posts/${complaint.reportedPost.id}`}
                  state={{
                    post: {
                      id: complaint.reportedPost.id,
                      title: complaint.reportedPost.title,
                      author: complaint.reportedPost.author,
                      authorUserId: complaint.reportedPost.authorUserId,
                      description: complaint.reportedPost.description,
                      fullDescription: complaint.reportedPost.description,
                      createdAt: complaint.reportedPost.createdAt
                        ? moment(complaint.reportedPost.createdAt).format("YYYY-MM-DD")
                        : "-",
                      symbol: complaint.reportedPost.symbol,
                      topic: complaint.reportedPost.topic,
                      image: complaint.reportedPost.image,
                    },
                  }}
                >
                  View Reported Post
                </Link>
              </Button>
              {complaint.reportedPost.authorUserId && (
                <Button asChild size="sm" variant="outline">
                  <Link to={`/admin/users/${complaint.reportedPost.authorUserId}`}>
                    Open Post Author Profile
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}

        {complaint.screenshots?.length > 0 && (
          <div>
            <p className="font-medium mb-2">Screenshots</p>
            <div className="grid grid-cols-2 gap-2">
              {complaint.screenshots.map((src: string, idx: number) => (
                <img
                  key={idx}
                  src={getCompleteUrl(src)}
                  alt={`Screenshot ${idx + 1}`}
                  className="w-full h-40 object-cover rounded border"
                />
              ))}
            </div>
          </div>
        )}

        <div className="pt-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/complaints">Back to Complaints</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
