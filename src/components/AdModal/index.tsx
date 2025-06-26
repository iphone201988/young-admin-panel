// components/ads/AdModal.tsx
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCompleteUrl } from "@/lib/utils";

interface AdModalProps {
  open: boolean;
  onClose: () => void;
  ad: any;
  onStatusChange: (id: string, newStatus: string) => void;
}

export default function AdModal({
  open,
  onClose,
  ad,
  onStatusChange,
}: AdModalProps) {
  console.log("AdModal rendered with ad:", ad);
  if (!ad) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl space-y-4 z-50">
          <Dialog.Title className="text-lg font-bold">Ad Details</Dialog.Title>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Posted By:</strong> {ad.postedBy}
            </p>
            <p>
              <strong>Company:</strong> {ad.company}
            </p>
            <p>
              <strong>Email:</strong> {ad.email}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={ad.website}
                target="_blank"
                className="text-blue-600 underline"
              >
                {ad.website}
              </a>
            </p>
          </div>

          {ad.file && (
            <div>
              <Label>Ad File</Label>
              <img
                src={getCompleteUrl(ad.file)}
                alt="ad-file"
                className="w-full max-h-60 object-contain rounded border mt-1"
              />
            </div>
          )}

          <div>
            <Label>Status</Label>
            <Select
              value={ad.status}
              onValueChange={(value) => onStatusChange(ad.id, value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IN REVIEW">In Review</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECT">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-right pt-4">
            <Dialog.Close asChild>
              <Button variant="secondary">Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
