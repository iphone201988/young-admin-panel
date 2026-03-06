import { motion } from "framer-motion";
import { Mail, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useGetContactSubmissionsQuery,
  useReplyToContactMutation,
} from "@/redux/api";
import { useEffect, useState } from "react";
import DataTable from "@/components/table";
import moment from "moment";
import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

const contactColumns = (
  onReply: (e: React.MouseEvent, row: any) => void
) => [
  {
    header: "Date",
    accessor: "createdAt",
    render: (value: string) => value || "—",
  },
  {
    header: "Name",
    accessor: "name",
    render: (value: string) => value || "—",
  },
  {
    header: "Email",
    accessor: "email",
    render: (value: string) => value || "—",
  },
  {
    header: "Subject",
    accessor: "subject",
    render: (value: string) => value || "—",
  },
  {
    header: "Message",
    accessor: "messagePreview",
    render: (value: string) =>
      value ? (
        <span title={value}>{value.length > 60 ? `${value.slice(0, 60)}…` : value}</span>
      ) : (
        "—"
      ),
  },
  {
    header: "Status",
    accessor: "isReplied",
    render: (value: boolean) => (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          value
            ? "bg-green-100 text-green-800"
            : "bg-amber-100 text-amber-800"
        }`}
      >
        {value ? "Replied" : "Pending"}
      </span>
    ),
  },
  {
    header: "Actions",
    render: (_: any, row: any) => (
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => onReply(e, row)}
        className="text-primary border-primary hover:bg-primary/10"
      >
        Reply
      </Button>
    ),
  },
];

export default function ContactUs() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetContactSubmissionsQuery({
    page: currentPage,
  });
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyToContact, { isLoading: replying }] = useReplyToContactMutation();

  const handleReplyClick = (e: React.MouseEvent, row: any) => {
    e.preventDefault();
    setSelectedSubmission(row);
    setReplyMessage("");
    setReplyModalOpen(true);
  };

  const handleSendReply = async () => {
    if (!selectedSubmission?.id || !replyMessage.trim()) {
      toast.error("Please enter a reply message.");
      return;
    }
    try {
      await replyToContact({
        id: selectedSubmission.id,
        message: replyMessage.trim(),
      }).unwrap();
      toast.success("Reply sent successfully. The user will receive it by email.");
      setReplyModalOpen(false);
      setSelectedSubmission(null);
      setReplyMessage("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send reply.");
    }
  };

  useEffect(() => {
    if (data?.success && data?.data?.submissions) {
      const list = data.data.submissions.map((s: any) => ({
        id: s._id,
        name: s.name || "—",
        email: s.email || "—",
        subject: s.subject || "—",
        messagePreview: s.message ? String(s.message).slice(0, 80) : "—",
        message: s.message,
        company: s.company,
        file: s.file,
        createdAt: moment(s.createdAt).format("YYYY-MM-DD HH:mm"),
        userId: s.userId,
        isReplied: !!(s.repliedAt != null && s.repliedAt),
      }));
      setSubmissions(list);
    }
  }, [data]);

  const total = data?.data?.total ?? 0;
  const totalPages = data?.pagination?.totalPages ?? 1;
  const columns = contactColumns(handleReplyClick);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total submissions
                </p>
                <p className="text-3xl font-bold text-foreground">{total}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="text-primary" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Dialog.Root open={replyModalOpen} onOpenChange={setReplyModalOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[100]" />
            <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl space-y-4 z-[101]">
              <Dialog.Title className="text-lg font-bold">
                Reply to contact
              </Dialog.Title>
              {selectedSubmission && (
                <>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">To:</strong>{" "}
                      {selectedSubmission.email}
                    </p>
                    <p>
                      <strong className="text-foreground">Subject:</strong>{" "}
                      {selectedSubmission.subject}
                    </p>
                    {selectedSubmission.message && (
                      <div className="mt-2 p-2 bg-muted rounded text-xs max-h-24 overflow-y-auto">
                        {selectedSubmission.message}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="reply-message">Your reply</Label>
                    <Textarea
                      id="reply-message"
                      placeholder="Type your reply to the user…"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="mt-1 min-h-[120px]"
                      disabled={replying}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setReplyModalOpen(false)}
                      disabled={replying}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSendReply}
                      disabled={replying || !replyMessage.trim()}
                    >
                      {replying ? "Sending…" : "Send reply"}
                    </Button>
                  </div>
                </>
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Contact Us submissions</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Emails sent from the app contact form. Reply to send a response to the user&apos;s email.
          </p>
        </div>
        <div className="p-6">
          <DataTable
            totalData={total}
            data={submissions}
            columns={columns}
            searchable={false}
            sortable={true}
            paginated={true}
            pageSize={20}
            isLoading={isLoading}
            className="mb-8"
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </motion.div>
  );
}
