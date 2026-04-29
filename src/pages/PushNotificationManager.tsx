import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useSendGlobalNotificationMutation } from "@/redux/api";

export default function PushNotificationManager() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendGlobalNotification, { isLoading }] = useSendGlobalNotificationMutation();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required");
      return;
    }

    try {
      const response = await sendGlobalNotification({
        title: title.trim(),
        message: message.trim(),
      }).unwrap();
      toast.success(response?.message || "Global notification sent successfully");
      setTitle("");
      setMessage("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send notification");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Push Notification Manager</h3>
        <p className="text-sm text-muted-foreground">
          Send a global alert to all users with active push tokens.
        </p>
      </div>

      <form onSubmit={handleSend} className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notification title"
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message"
            className="w-full min-h-36 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Global Alert"}
        </Button>
      </form>
    </div>
  );
}
