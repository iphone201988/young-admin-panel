import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { getCompleteUrl } from "@/lib/utils";

export default function ComplaintDetail() {
  const location = useLocation();
  const complaint = location.state?.complaint;

  if (!complaint) {
    return (
      <div className="max-w-2xl mx-auto p-6">
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
    <div className="max-w-2xl mx-auto p-6">
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
