// components/ComplaintModal.tsx
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getCompleteUrl } from "@/lib/utils";

interface ComplaintModalProps {
  open: boolean;
  onClose: () => void;
  complaint: any;
  onStatusChange: (id: string, newStatus: boolean) => void;
}

export default function ComplaintModal({
  open,
  onClose,
  complaint,
  onStatusChange,
}: ComplaintModalProps) {
  if (!complaint) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[100]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl space-y-4 z-[101]">
          <Dialog.Title className="text-lg font-bold">
            Complaint Details
          </Dialog.Title>

          <div className="space-y-2">
            <p>
              <strong>User:</strong> {complaint.user}
            </p>
            <p>
              <strong>Reporter:</strong> {complaint.reporter}
            </p>
            <p>
              <strong>Reason:</strong> {complaint.reason}
            </p>
            <p>
              <strong>Date:</strong> {complaint.createdAt}
            </p>
          </div>

          <div>
            <Label>Additional Details</Label>
            <Textarea
              readOnly
              className="mt-1"
              value={complaint.additionalDetails}
            />
          </div>

          {complaint.screenshots?.length > 0 && (
            <div>
              <Label className="mb-2 block">Screenshots</Label>
              <div className="grid grid-cols-2 gap-2">
                {complaint.screenshots.map((src: string, idx: number) => (
                  <img
                    key={idx}
                    src={getCompleteUrl(src)}
                    alt={`screenshot-${idx}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <Label>Mark as Resolved</Label>
            <Switch
              checked={complaint.isResolved}
              onCheckedChange={(checked) =>
                onStatusChange(complaint.id, checked)
              }
            />
          </div>

          <div className="text-right mt-6">
            <Dialog.Close asChild>
              <Button variant="secondary">Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
