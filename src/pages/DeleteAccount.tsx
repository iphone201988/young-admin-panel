import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const STORAGE_KEY = "deleteAccountRequest";

const DeleteAccount = () => {
  const [email, setEmail] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  useEffect(() => {
    const message = sessionStorage.getItem(STORAGE_KEY);
    if (message) {
      setSubmittedMessage(message);
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Simple, permissive email check to avoid false negatives in the UI
  // Simple, permissive email check to avoid false negatives in the UI
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, "Your request has been submitted.");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white border border-border shadow-sm rounded-xl p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delete Account</h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your account email to submit a deletion request.
          </p>
        </div>

        {submittedMessage && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
            {submittedMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;


