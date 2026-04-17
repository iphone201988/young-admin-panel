import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { useGetAdminUserChatQuery } from "@/redux/api";
import { getSocketOrigin } from "@/lib/socketOrigin";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

function messageSenderId(m: { senderId?: unknown }): string {
  const s = m?.senderId;
  if (s != null && typeof s === "object" && "_id" in (s as object)) {
    return String((s as { _id: string })._id);
  }
  return s != null ? String(s) : "";
}

export type UserSupportChatProps = {
  /** Target app user id (the user you are messaging). */
  userId: string;
  className?: string;
};

export function UserSupportChat({ userId, className }: UserSupportChatProps) {
  const {
    data: chatPayload,
    isLoading: chatLoading,
    isError: chatError,
  } = useGetAdminUserChatQuery(userId, {
    skip: !userId,
  });

  const chatId = chatPayload?.data?.chat?._id as string | undefined;
  const adminUserId = chatPayload?.data?.adminUserId as string | undefined;

  const [messages, setMessages] = useState<any[]>([]);
  const [draft, setDraft] = useState("");
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const listEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const raw = chatPayload?.data?.messages;
    if (Array.isArray(raw)) {
      setMessages(raw);
    }
  }, [chatPayload]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!chatId || !token) return;

    const socket = io(getSocketOrigin(), {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("newMessage", (msg: any) => {
      if (!msg || String(msg.chatId) !== String(chatId)) return;
      setMessages((prev) => {
        const mid = msg._id;
        if (mid && prev.some((m) => m._id === mid)) return prev;
        return [...prev, msg];
      });
    });

    socket.on("error", (payload: unknown) => {
      const text = typeof payload === "string" ? payload : "Chat error";
      toast.error(text);
    });

    socketRef.current = socket;
    return () => {
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
  }, [chatId]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendChat = () => {
    const text = draft.trim();
    if (!text) return;
    const s = socketRef.current;
    if (!s?.connected) {
      toast.error("Not connected to chat. Please wait.");
      return;
    }
    s.emit("sendMessage", { chatId, message: text });
    setDraft("");
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-border shadow-sm p-6 flex flex-col min-h-0 h-full max-h-full overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap shrink-0">
        <h2 className="text-lg font-semibold">Support chat</h2>
        <span
          className={cn(
            "text-xs px-2 py-1 rounded-full font-medium",
            connected ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
          )}
        >
          {connected ? "Live" : "Connecting…"}
        </span>
      </div>
      <p className="text-sm text-muted-foreground shrink-0 mt-1">
        In the app inbox this thread appears as{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">{"{Admin}"}</code> for this user.
      </p>

      {chatLoading && (
        <div className="flex flex-1 min-h-[200px] items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      )}

      {chatError && (
        <p className="text-sm text-red-600 shrink-0 mt-4">
          Could not load chat. Refresh the page and try again.
        </p>
      )}

      {!chatLoading && !chatError && (
        <div className="flex flex-1 flex-col min-h-0 gap-4 mt-4">
          <div className="border border-border rounded-lg bg-muted/30 flex-1 min-h-0 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 ? (
              <div className="flex min-h-full items-center justify-center py-8">
                <p className="text-sm text-muted-foreground text-center px-2">
                  No messages yet. Say hello below.
                </p>
              </div>
            ) : (
              messages.map((m) => {
                const sid = messageSenderId(m);
                const isAdmin = Boolean(adminUserId && sid === String(adminUserId));
                return (
                  <div
                    key={m._id ?? `${sid}-${m.createdAt}-${m.message}`}
                    className={cn("flex", isAdmin ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                        isAdmin
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border"
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">{m.message}</p>
                      <p className="text-[10px] mt-1 opacity-80">
                        {m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}
                        {isAdmin ? " · You (Admin)" : " · User"}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={listEndRef} />
          </div>
          <div className="flex gap-2 shrink-0">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendChat();
                }
              }}
              placeholder="Type a message…"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <Button
              type="button"
              onClick={handleSendChat}
              disabled={!connected || !draft.trim()}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
