import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useCreateEventsByUserTypeMutation } from "@/redux/api";

const TOPIC_OPTIONS = [
  "Member",
  "Financial Advisor",
  "Startups",
  "Small Businesses",
  "VC/ Investors",
  "Insurance",
  "Brokers/ Dealers",
  "Investment Managers",
  "Other",
];

const USER_TYPE_OPTIONS = [
  { value: "general_member", label: "General Member" },
  { value: "financial_advisor", label: "Financial Advisor" },
  { value: "financial_firm", label: "Financial Firm" },
  { value: "small_business", label: "Small Business" },
  { value: "startup", label: "Startup" },
  { value: "investor", label: "Investor" },
  { value: "life_insurance", label: "Life Insurance" },
  { value: "broker", label: "Broker" },
  { value: "investment_mangers", label: "Investment Managers" },
];

export default function CalendarEventManager() {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState(TOPIC_OPTIONS[0]);
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>([]);
  const [createEventsByUserType, { isLoading }] = useCreateEventsByUserTypeMutation();

  const allSelected = useMemo(
    () => selectedUserTypes.length === USER_TYPE_OPTIONS.length,
    [selectedUserTypes],
  );

  const toggleUserType = (value: string) => {
    setSelectedUserTypes((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedUserTypes([]);
      return;
    }
    setSelectedUserTypes(USER_TYPE_OPTIONS.map((opt) => opt.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !scheduledDate || !selectedUserTypes.length) {
      toast.error("Title, description, date/time, and user types are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("topic", topic);
      formData.append("description", description.trim());
      formData.append("scheduledDate", new Date(scheduledDate).toISOString());
      formData.append("userTypes", selectedUserTypes.join(","));
      if (attachment) {
        formData.append("file", attachment);
      }

      const response = await createEventsByUserType(formData).unwrap();

      toast.success(response?.message || "Events created successfully");
      setTitle("");
      setDescription("");
      setScheduledDate("");
      setAttachment(null);
      setSelectedUserTypes([]);
      setTopic(TOPIC_OPTIONS[0]);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create events");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Calendar Events by User Type</h3>
        <p className="text-sm text-muted-foreground">
          Add events to user calendars based on selected user types.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm"
            >
              {TOPIC_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description"
            className="w-full min-h-32 px-4 py-2 border rounded-md text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Scheduled Date & Time</label>
            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Attachment (optional)</label>
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
            {attachment && (
              <p className="text-xs text-muted-foreground">Selected: {attachment.name}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">User Types</label>
            <Button type="button" size="sm" variant="outline" onClick={toggleSelectAll}>
              {allSelected ? "Clear All" : "Select All"}
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 border rounded-md p-3">
            {USER_TYPE_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedUserTypes.includes(option.value)}
                  onChange={() => toggleUserType(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Events"}
        </Button>
      </form>
    </div>
  );
}
