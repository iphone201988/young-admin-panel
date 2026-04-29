import { useEffect, useMemo, useState } from "react";
import { useGetUserActivitiesQuery } from "@/redux/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ActivityItem = {
  _id: string;
  action?: string;
  createdAt?: string;
  metaData?: Record<string, unknown>;
};

export type UserActivityLogsTableProps = {
  userId: string;
  className?: string;
};

function formatActivityAction(action?: string): string {
  if (!action) return "Unknown activity";
  return action
    .split("_")
    .filter(Boolean)
    .map((token) => token[0].toUpperCase() + token.slice(1))
    .join(" ");
}

function formatMetadata(metaData?: Record<string, unknown>): string {
  if (!metaData || Object.keys(metaData).length === 0) return "-";
  return Object.entries(metaData)
    .slice(0, 3)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(" | ");
}

export function UserActivityLogsTable({ userId, className }: UserActivityLogsTableProps) {
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: activitiesResponse,
    isLoading,
    isError,
  } = useGetUserActivitiesQuery(
    { userId, page: currentPage, limit: PAGE_SIZE },
    { skip: !userId },
  );

  const rows: ActivityItem[] = useMemo(() => {
    const source = Array.isArray(activitiesResponse?.data) ? activitiesResponse.data : [];
    return source
      .slice()
      .sort(
        (a: ActivityItem, b: ActivityItem) =>
          new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
      );
  }, [activitiesResponse]);

  useEffect(() => {
    setCurrentPage(1);
  }, [userId]);

  const totalEntries = Number(activitiesResponse?.pagination?.total) || 0;
  const totalPages = Math.max(
    1,
    Number(activitiesResponse?.pagination?.totalPages) || Math.ceil(totalEntries / PAGE_SIZE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = totalEntries === 0 ? 0 : (safePage - 1) * PAGE_SIZE;
  const pageRows = rows;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className={cn("bg-white rounded-xl border border-border shadow-sm p-6", className)}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-lg font-semibold">Activity Logs</h2>
        {!isLoading && !isError && (
          <span className="text-xs text-muted-foreground">{totalEntries} entries</span>
        )}
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading activity logs...</p>}
      {isError && <p className="text-sm text-red-600">Unable to load activity logs.</p>}
      {!isLoading && !isError && pageRows.length === 0 && (
        <p className="text-sm text-muted-foreground">No activity logged yet.</p>
      )}

      {!isLoading && !isError && pageRows.length > 0 && (
        <div className="max-h-[26rem] overflow-y-auto border border-border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Action</TableHead>
                <TableHead className="w-[45%]">Metadata</TableHead>
                <TableHead className="w-[25%]">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{formatActivityAction(item.action)}</TableCell>
                  <TableCell className="text-muted-foreground break-words capitalize">
                    {formatMetadata(item.metaData)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {!isLoading && !isError && totalEntries > 0 && (
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Showing {startIdx + 1}-{Math.min(startIdx + pageRows.length, totalEntries)} of{" "}
            {totalEntries}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={safePage === 1}
            >
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              Page {safePage} / {totalPages}
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={safePage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
