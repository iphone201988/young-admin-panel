import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetAdminFaqsQuery,
  useUpdateFaqMutation,
} from "@/redux/api";

type FaqItem = {
  _id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
};

export default function ContentManagement() {
  const { data, isLoading } = useGetAdminFaqsQuery();
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const faqs: FaqItem[] = useMemo(() => data?.data?.faqs ?? [], [data]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const [drafts, setDrafts] = useState<Record<string, { question: string; answer: string; order: number }>>(
    {},
  );

  useEffect(() => {
    const nextDrafts: Record<string, { question: string; answer: string; order: number }> = {};
    faqs.forEach((faq) => {
      nextDrafts[faq._id] = {
        question: faq.question || "",
        answer: faq.answer || "",
        order: faq.order || 0,
      };
    });
    setDrafts(nextDrafts);
  }, [faqs]);

  const handleCreate = async () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast.error("Question and answer are required");
      return;
    }

    try {
      await createFaq({
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
        order: faqs.length + 1,
        isActive: true,
      }).unwrap();
      setNewQuestion("");
      setNewAnswer("");
      toast.success("FAQ created successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create FAQ");
    }
  };

  const handleSave = async (faqId: string) => {
    const draft = drafts[faqId];
    if (!draft?.question.trim() || !draft?.answer.trim()) {
      toast.error("Question and answer cannot be empty");
      return;
    }

    try {
      await updateFaq({
        id: faqId,
        body: {
          question: draft.question.trim(),
          answer: draft.answer.trim(),
          order: Number(draft.order) || 0,
        },
      }).unwrap();
      toast.success("FAQ updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update FAQ");
    }
  };

  const toggleStatus = async (faq: FaqItem) => {
    try {
      await updateFaq({
        id: faq._id,
        body: { isActive: !faq.isActive },
      }).unwrap();
      toast.success(`FAQ marked as ${faq.isActive ? "inactive" : "active"}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update FAQ status");
    }
  };

  const handleDelete = async (faqId: string) => {
    try {
      await deleteFaq(faqId).unwrap();
      toast.success("FAQ deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete FAQ");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Content Management - FAQs</h3>
          <p className="text-sm text-muted-foreground">
            Add, edit, activate/deactivate, or remove FAQs shown on the landing page.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="New FAQ question"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="New FAQ answer"
              className="w-full min-h-24 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <Button onClick={handleCreate} disabled={isCreating}>
            {isCreating ? "Adding..." : "Add FAQ"}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Existing FAQs</h3>
        </div>
        <div className="p-6 space-y-4">
          {isLoading && <p className="text-sm text-muted-foreground">Loading FAQs...</p>}
          {!isLoading && faqs.length === 0 && (
            <p className="text-sm text-muted-foreground">No FAQs found. Add your first FAQ above.</p>
          )}

          {faqs.map((faq) => {
            const draft = drafts[faq._id] || { question: "", answer: "", order: 0 };
            return (
              <div key={faq._id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_120px] gap-3">
                  <input
                    type="text"
                    value={draft.question}
                    onChange={(e) =>
                      setDrafts((prev) => ({
                        ...prev,
                        [faq._id]: { ...draft, question: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                  <input
                    type="number"
                    value={draft.order}
                    onChange={(e) =>
                      setDrafts((prev) => ({
                        ...prev,
                        [faq._id]: { ...draft, order: Number(e.target.value) || 0 },
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <textarea
                  value={draft.answer}
                  onChange={(e) =>
                    setDrafts((prev) => ({
                      ...prev,
                      [faq._id]: { ...draft, answer: e.target.value },
                    }))
                  }
                  className="w-full min-h-24 px-3 py-2 border rounded-md text-sm"
                />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => handleSave(faq._id)} disabled={isUpdating}>
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toggleStatus(faq)}>
                    {faq.isActive ? "Set Inactive" : "Set Active"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(faq._id)}
                    disabled={isDeleting}
                  >
                    Delete
                  </Button>
                  <span className="text-xs text-muted-foreground self-center">
                    Status: {faq.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
