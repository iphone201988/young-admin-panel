import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { UserDetailsPanel } from "@/components/users/UserDetailsPanel";
import { UserActivityLogsTable } from "@/components/users/UserActivityLogsTable";
import { UserSupportChat } from "@/components/users/UserSupportChat";
import { useGetUserByIdQuery, useUpdateUserStatusMutation } from "@/redux/api";
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

  return (
    <div className="w-full flex flex-col min-h-0 lg:h-full">
      <div className="shrink-0 mb-3">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin/users">← Back to Users</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] xl:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] flex-1 min-h-0 lg:items-stretch lg:overflow-hidden">
        <div className="min-h-0 overflow-y-auto space-y-4 pr-1">
          <UserDetailsPanel
            user={user}
            onRefetch={refetch}
            isUpdatingStatus={isUpdating}
            onToggleDeactivate={handleStatusChange}
            onToggleDelete={handleDeleteRestore}
            className="min-h-[24rem]"
          />
          <UserActivityLogsTable userId={user._id} />
        </div>
        <UserSupportChat
          userId={id}
          className="min-h-[22rem] lg:h-full lg:max-h-full lg:min-h-0 overflow-hidden"
        />
      </div>
    </div>
  );
}
