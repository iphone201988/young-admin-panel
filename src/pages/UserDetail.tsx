import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useGetUserByIdQuery, useUpdateUserStatusMutation } from "@/redux/api";
import { userRole } from "@/lib/utils";
import { getCompleteUrl } from "@/lib/utils";
import { toast } from "react-toastify";

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useGetUserByIdQuery(id!, {
    skip: !id,
  });
  const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();

  const user = data?.data?.user;

  const handleStatusChange = async () => {
    if (!user?._id) return;
    try {
      await updateUserStatus({
        id: user._id,
        isDeactivated: !user.isDeactivated,
      }).unwrap();
      toast.success(user.isDeactivated ? "User activated successfully" : "User deactivated successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteRestore = async () => {
    if (!user?._id) return;
    try {
      await updateUserStatus({
        id: user._id,
        isDeleted: !user.isDeleted,
      }).unwrap();
      toast.success(user.isDeleted ? "User restored successfully" : "User deleted successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update account");
    }
  };

  if (!id) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-border shadow-sm p-8 text-center">
          <p className="text-muted-foreground mb-4">Invalid user.</p>
          <Button asChild variant="outline">
            <Link to="/admin/users">Back to Users</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-border shadow-sm p-8 text-center">
          <p className="text-muted-foreground mb-4">User not found.</p>
          <Button asChild variant="outline">
            <Link to="/admin/users">Back to Users</Link>
          </Button>
        </div>
      </div>
    );
  }

  const displayRole = userRole[user.role] ?? user.role;
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "—";
  const phone = user.countryCode && user.phone ? `${user.countryCode} ${user.phone}` : user.phone || "—";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin/users">← Back to Users</Link>
        </Button>
      </div>
      <div className="bg-white rounded-xl border border-border shadow-sm p-6 space-y-6">
        <h1 className="text-xl font-bold">User Details</h1>

        {user.profileImage && (
          <div className="flex justify-center">
            <img
              src={getCompleteUrl(user.profileImage)}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>
        )}

        <div className="space-y-3 text-sm">
          <p>
            <strong>User ID:</strong>{" "}
            <span className="font-mono text-muted-foreground">{user._id}</span>
          </p>
          <p>
            <strong>Name:</strong> {fullName}
          </p>
          <p>
            <strong>Username:</strong> {user.username ?? "—"}
          </p>
          <p>
            <strong>Email:</strong> {user.email ?? "—"}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                user.role === "admin"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {displayRole}
            </span>
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.isDeactivated ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
              }`}
            >
              {user.isDeactivated ? "Inactive" : "Active"}
            </span>
          </p>
          {user.isDeleted != null && (
            <p>
              <strong>Account:</strong>{" "}
              <span className={user.isDeleted ? "text-red-600 font-medium" : "text-green-600"}>
                {user.isDeleted ? "Deleted" : "Active"}
              </span>
            </p>
          )}
          {user.createdAt && (
            <p>
              <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
          {user.crdNumber && (
            <p>
              <strong>CRD Number:</strong> {user.crdNumber}
            </p>
          )}
          {user.isDocumentVerified != null && (
            <p>
              <strong>Document Verified:</strong> {user.isDocumentVerified ? "Yes" : "No"}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <Button
            variant={user.isDeactivated ? "default" : "outline"}
            onClick={handleStatusChange}
            disabled={isUpdating}
          >
            {user.isDeactivated ? "Activate account" : "Deactivate account"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteRestore}
            disabled={isUpdating}
          >
            {user.isDeleted ? "Restore account" : "Delete account"}
          </Button>
        </div>
      </div>
    </div>
  );
}
