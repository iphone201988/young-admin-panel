import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useUpdateUserBasicDetailsMutation,
  useUpdateUserCrdNumberVerificationMutation,
  useUpdateUserDocumentVerificationMutation,
} from "@/redux/api";
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

function documentVerificationLabel(status: string | null | undefined): string {
  if (status == null || status === "") return "Not set";
  switch (status) {
    case "approved":
      return "Verified";
    case "in_review":
      return "In review";
    case "reject":
      return "Rejected";
    default:
      return String(status);
  }
}

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
  const [updateDocVerification, { isLoading: isUpdatingDoc }] =
    useUpdateUserDocumentVerificationMutation();
  const [updateCrdVerification, { isLoading: isUpdatingCrd }] =
    useUpdateUserCrdNumberVerificationMutation();

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

  const docStatus = user.isDocumentVerified as string | undefined;
  const isDocApproved = docStatus === "approved";
  const canMarkVerified = docStatus !== "approved";
  const canMarkUnverified = docStatus === "approved" || docStatus === "reject";

  const handleVerifyDocument = async () => {
    if (!user?._id) return;
    try {
      await updateDocVerification({ id: user._id, verified: true }).unwrap();
      toast.success("Document marked as verified");
      onRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update document status");
    }
  };

  const handleUnverifyDocument = async () => {
    if (!user?._id) return;
    try {
      await updateDocVerification({ id: user._id, verified: false }).unwrap();
      toast.success("Document marked as not verified");
      onRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update document status");
    }
  };

  const hasCrdNumber = Boolean(user.crdNumber && String(user.crdNumber).trim());
  const isCrdVerified = Boolean(user.isCrdNumberVerified);
  const canMarkCrdVerified = hasCrdNumber && !isCrdVerified;
  const canMarkCrdUnverified = hasCrdNumber && isCrdVerified;

  const handleVerifyCrd = async () => {
    if (!user?._id) return;
    try {
      await updateCrdVerification({ id: user._id, verified: true }).unwrap();
      toast.success("CRD number marked as verified");
      onRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update CRD verification");
    }
  };

  const handleUnverifyCrd = async () => {
    if (!user?._id) return;
    try {
      await updateCrdVerification({ id: user._id, verified: false }).unwrap();
      toast.success("CRD number marked as not verified");
      onRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update CRD verification");
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-border shadow-sm p-6 flex flex-col",
        className
      )}
    >
      <div className="flex shrink-0 items-start justify-between gap-4">
        <h1 className="text-xl font-bold">User Details</h1>
        {user.profileImage ? (
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="rounded-full shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="View full profile image"
              >
                <img
                  src={getCompleteUrl(user.profileImage)}
                  alt="Profile"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border cursor-zoom-in"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-3 sm:p-4">
              <img
                src={getCompleteUrl(user.profileImage)}
                alt="User profile full view"
                className="w-full max-h-[80vh] object-contain rounded-md"
              />
            </DialogContent>
          </Dialog>
        ) : (
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-muted-foreground/30 bg-muted shrink-0"
            aria-hidden
          />
        )}
      </div>

      <div className="mt-4 text-sm grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="md:col-span-2 xl:col-span-3 rounded-md border border-border p-3">
          <p className="font-semibold text-foreground">User ID</p>
          <p className="font-mono text-muted-foreground break-all mt-1">{user._id}</p>
        </div>

        {editing ? (
          <>
            <div className="space-y-1.5 rounded-md border border-border p-3">
              <Label htmlFor="ud-firstName">First name</Label>
              <Input
                id="ud-firstName"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="space-y-1.5 rounded-md border border-border p-3">
              <Label htmlFor="ud-lastName">Last name</Label>
              <Input
                id="ud-lastName"
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="space-y-1.5 rounded-md border border-border p-3">
              <Label htmlFor="ud-username">Username</Label>
              <Input
                id="ud-username"
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="space-y-1.5 rounded-md border border-border p-3 md:col-span-2 xl:col-span-2">
              <Label htmlFor="ud-email">Email</Label>
              <Input
                id="ud-email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="space-y-1.5 rounded-md border border-border p-3">
              <Label htmlFor="ud-cc">Country code</Label>
              <Input
                id="ud-cc"
                value={form.countryCode}
                onChange={(e) => updateField("countryCode", e.target.value)}
                placeholder="e.g. 1"
                autoComplete="off"
              />
            </div>
            <div className="space-y-1.5 rounded-md border border-border p-3 md:col-span-2 xl:col-span-2">
              <Label htmlFor="ud-phone">Phone</Label>
              <Input
                id="ud-phone"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                autoComplete="off"
              />
            </div>
          </>
        ) : (
          <>
            <div className="rounded-md border border-border p-3">
              <p className="font-semibold">Name</p>
              <p className="text-muted-foreground mt-1">
                {[user.firstName, user.lastName].filter(Boolean).join(" ") || "—"}
              </p>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="font-semibold">Username</p>
              <p className="text-muted-foreground mt-1">{user.username ?? "—"}</p>
            </div>
            <div className="rounded-md border border-border p-3 md:col-span-2 xl:col-span-2">
              <p className="font-semibold">Email</p>
              <p className="text-muted-foreground mt-1 break-all">{user.email ?? "—"}</p>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="font-semibold">Phone</p>
              <p className="text-muted-foreground mt-1">{phoneDisplay}</p>
            </div>
          </>
        )}

        <div className="rounded-md border border-border p-3">
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
        <div className="rounded-md border border-border p-3">
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
          <div className="rounded-md border border-border p-3">
            <p className="font-semibold">Account</p>
            <p
              className={`mt-1 ${user.isDeleted ? "text-red-600 font-medium" : "text-green-600"}`}
            >
              {user.isDeleted ? "Deleted" : "Active"}
            </p>
          </div>
        )}
        {user.createdAt && (
          <div className="rounded-md border border-border p-3">
            <p className="font-semibold">Joined</p>
            <p className="text-muted-foreground mt-1">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
        <div className="md:col-span-2 xl:col-span-3 rounded-md p-2">
          <p className="font-semibold">CRD number (CRN)</p>
          <p className="text-muted-foreground mt-1 font-mono">
            {hasCrdNumber ? user.crdNumber : "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manual verification of the registration number entered by the user.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                !hasCrdNumber
                  ? "bg-muted text-muted-foreground"
                  : isCrdVerified
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-900"
              }`}
            >
              {!hasCrdNumber ? "No number on file" : isCrdVerified ? "Verified" : "Not verified"}
            </span>
            <Button
              type="button"
              size="sm"
              disabled={isUpdatingCrd || editing || !canMarkCrdVerified}
              onClick={handleVerifyCrd}
            >
              Mark verified
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isUpdatingCrd || editing || !canMarkCrdUnverified}
              onClick={handleUnverifyCrd}
            >
              Mark unverified
            </Button>
          </div>
        </div>
        <div className="md:col-span-2 xl:col-span-3 rounded-md p-2">
          <p className="font-semibold">Document (Didit)</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Override verification for documents submitted through Didit.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                isDocApproved
                  ? "bg-green-100 text-green-800"
                  : docStatus === "reject"
                    ? "bg-red-100 text-red-800"
                    : "bg-amber-100 text-amber-900"
              }`}
            >
              {documentVerificationLabel(docStatus)}
            </span>
            <Button
              type="button"
              size="sm"
              disabled={isUpdatingDoc || editing || !canMarkVerified}
              onClick={handleVerifyDocument}
            >
              Mark verified
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isUpdatingDoc || editing || !canMarkUnverified}
              onClick={handleUnverifyDocument}
            >
              Mark unverified
            </Button>
          </div>
        </div>
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
