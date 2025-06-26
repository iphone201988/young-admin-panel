import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { getCompleteUrl } from "@/lib/utils";

interface PostModalProps {
  open: boolean;
  onClose: () => void;
  post: any;
}

export default function PostModal({ open, onClose, post }: PostModalProps) {
  if (!post) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 max-h-[90vh] overflow-y-auto space-y-4">
          <Dialog.Title className="text-lg font-bold">
            Post Details
          </Dialog.Title>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Title:</strong> {post.title}
            </p>
            <p>
              <strong>Author:</strong> {post.author}
            </p>
            <p>
              <strong>Created At:</strong> {post.createdAt}
            </p>
            <p>
              <strong>Symbol:</strong> {post.symbol}
            </p>
            <p>
              <strong>Topic:</strong> {post.topic}
            </p>
            <p>
              <strong>Description:</strong>
            </p>
            <p className="whitespace-pre-line border rounded p-2 bg-muted/20">
              {post.description}
            </p>
          </div>

          {post.image && (
            <div>
              <p className="font-medium mb-1">Image</p>
              <img
                src={getCompleteUrl(post.image)}
                alt="post"
                className="w-full max-h-80 object-contain rounded border"
              />
            </div>
          )}

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
