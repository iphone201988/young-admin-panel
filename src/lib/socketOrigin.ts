/** Socket.IO server origin (no /api path). */
export function getSocketOrigin(): string {
  const explicit = import.meta.env.VITE_SOCKET_URL as string | undefined;
  if (explicit?.trim()) {
    return explicit.replace(/\/$/, "");
  }
  const base = (import.meta.env.VITE_BACKEND_URL as string) || "";
  try {
    const url = base.includes("://") ? base : `http://${base}`;
    const u = new URL(url);
    return `${u.protocol}//${u.host}`;
  } catch {
    return typeof window !== "undefined" ? window.location.origin : "http://localhost:8888";
  }
}
