import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserBasicDetailsMutation } from "@/redux/api";
import { cn, userRole } from "@/lib/utils";
import { getCompleteUrl } from "@/lib/utils";
import { toast } from "react-toastify";

export type UserDetailsPanelProps = {
  user: Record<string, any>;
  onRefetch: () => void;
  isUpdatingStatus: boolean;
  onToggleDeactivate: () => void;
  onToggleDelete: () => void;
  className?: string;
};

type BasicForm = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  countryCode: string;
  phone: string;
};

function formFromUser(user: Record<string, any>): BasicForm {
  return {
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    username: user.username ?? "",
    email: user.email ?? "",
    countryCode: user.countryCode ?? "",
    phone: user.phone ?? "",
  };
}

export function UserDetailsPanel({
  user,
  onRefetch,
  isUpdatingStatus,
  onToggleDeactivate,
  onToggleDelete,
  className,
}: UserDetailsPanelProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<BasicForm>(() => formFromUser(user));

  const [updateBasic, { isLoading: isSaving }] = useUpdateUserBasicDetailsMutation();

  useEffect(() => {
    if (!editing) {
      setForm(formFromUser(user));
    }
  }, [user, editing]);

  const displayRole = userRole[user.role] ?? user.role;
  const phoneDisplay =
    user.countryCode && user.phone
      ? `${user.countryCode} ${user.phone}`
      : user.phone || "—";

  const handleCancel = () => {
    setForm(formFromUser(user));
    setEditing(false);
  };

  const handleSave = async () => {
    if (!user?._id) return;
    try {
      await updateBasic({
        id: user._id,
        body: {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          username: form.username.trim(),
          email: form.email.trim(),
          countryCode: form.countryCode.trim(),
          phone: form.phone.trim(),
        },
      }).unwrap();
      toast.success("User details updated");
      setEditing(false);
      onRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user");
    }
  };

  const updateField = (key: keyof BasicForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-border shadow-sm p-6 flex flex-col min-h-0 h-full max-h-full",
        className
      )}
    >
      <div className="flex shrink-0 items-start justify-between gap-4">
        <h1 className="text-xl font-bold">User Details</h1>
        {user.profileImage ? (
          <img
            src={getCompleteUrl(user.profileImage)}
            alt="Profile"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border shrink-0"
          />
        ) : (
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-muted-foreground/30 bg-muted shrink-0"
            aria-hidden
          />
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto mt-4 pr-1 -mr-1 space-y-4 text-sm">
        <div>
          <p className="font-semibold text-foreground">User ID</p>
          <p className="font-mono text-muted-foreground break-all mt-1">{user._id}</p>
        </div>

        {editing ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ud-firstName">First name</Label>
                <Input
                  id="ud-firstName"
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ud-lastName">Last name</Label>
                <Input
                  id="ud-lastName"
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ud-username">Username</Label>
              <Input
                id="ud-username"
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ud-email">Email</Label>
              <Input
                id="ud-email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5 sm:col-span-1">
                <Label htmlFor="ud-cc">Country code</Label>
                <Input
                  id="ud-cc"
                  value={form.countryCode}
                  onChange={(e) => updateField("countryCode", e.target.value)}
                  placeholder="e.g. 1"
                  autoComplete="off"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="ud-phone">Phone</Label>
                <Input
                  id="ud-phone"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="font-semibold">Name</p>
              <p className="text-muted-foreground mt-1">
                {[user.firstName, user.lastName].filter(Boolean).join(" ") || "—"}
              </p>
            </div>
            <div>
              <p className="font-semibold">Username</p>
              <p className="text-muted-foreground mt-1">{user.username ?? "—"}</p>
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-muted-foreground mt-1 break-all">{user.email ?? "—"}</p>
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-muted-foreground mt-1">{phoneDisplay}</p>
            </div>
          </>
        )}

        <div>
          <p className="font-semibold">Role</p>
          <span
            className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
              user.role === "admin"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {displayRole}
          </span>
        </div>
        <div>
          <p className="font-semibold">Status</p>
          <span
            className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
              user.isDeactivated ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
            }`}
          >
            {user.isDeactivated ? "Inactive" : "Active"}
          </span>
        </div>
        {user.isDeleted != null && (
          <div>
            <p className="font-semibold">Account</p>
            <p
              className={`mt-1 ${user.isDeleted ? "text-red-600 font-medium" : "text-green-600"}`}
            >
              {user.isDeleted ? "Deleted" : "Active"}
            </p>
          </div>
        )}
        {user.createdAt && (
          <div>
            <p className="font-semibold">Joined</p>
            <p className="text-muted-foreground mt-1">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
        {user.crdNumber && (
          <div>
            <p className="font-semibold">CRD Number</p>
            <p className="text-muted-foreground mt-1">{user.crdNumber}</p>
          </div>
        )}
        {user.isDocumentVerified != null && (
          <div>
            <p className="font-semibold">Document Verified</p>
            <p className="text-muted-foreground mt-1">
              {user.isDocumentVerified ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-border pt-4 mt-4 flex flex-wrap items-center gap-2">
        {editing ? (
          <>
            <Button type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving…" : "Save changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button type="button" variant="outline" onClick={() => setEditing(true)}>
            Edit details
          </Button>
        )}
        <Button
          variant={user.isDeactivated ? "default" : "outline"}
          onClick={onToggleDeactivate}
          disabled={isUpdatingStatus || editing}
        >
          {user.isDeactivated ? "Activate account" : "Deactivate account"}
        </Button>
        <Button
          variant="destructive"
          onClick={onToggleDelete}
          disabled={isUpdatingStatus || editing}
        >
          {user.isDeleted ? "Restore account" : "Delete account"}
        </Button>
      </div>
    </div>
  );
}
