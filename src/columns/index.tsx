import SelectBox from "@/components/select";
import { useUpdateUserStatusMutation } from "@/redux/api";
import * as Switch from "@radix-ui/react-switch";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UserStatus = ({ value, row }: { value: any; row: any }) => {
  const [updateUserStatus, { data }] = useUpdateUserStatusMutation();
  const handleUserStatusChange = async (id: string) => {
    updateUserStatus({ id, isDeactivated: !row.isDeactivated }).unwrap();
  };

  useEffect(() => {
    if (data?.success) {
      toast.success(data?.message);
    }
  }, [data]);

  return (
    <Switch.Root
      defaultChecked={value === "Active"}
      className="w-10 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-500"
      onClick={() => handleUserStatusChange(row.id)}
    >
      <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow transform translate-x-1 transition-transform duration-200 data-[state=checked]:translate-x-5" />
    </Switch.Root>
  );
};

const UserAction = ({ value, row }: { value: any; row: any }) => {
  const [updateUserStatus, { data }] = useUpdateUserStatusMutation();

  const handleUserDelete = async (id: string) =>
    updateUserStatus({ id, isDeleted: !row.isDeleted }).unwrap();

  useEffect(() => {
    if (data?.success) {
      toast.success(data?.message);
    }
  }, [data]);

  return (
    <div className="flex space-x-2 justify-center">
      {/* <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
        Edit
      </button> */}
      <button
        className="text-red-600 hover:text-red-800 text-sm font-medium"
        onClick={() => handleUserDelete(row.id)}
      >
        {row?.isDeleted ? "Restore" : "Delete"}
      </button>
    </div>
  );
};

export const userColumns = [
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Phone",
    accessor: "phone",
  },
  {
    header: "Role",
    accessor: "role",
    render: (value: any) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "Admin"
            ? "bg-red-100 text-red-800"
            : value === "Moderator"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    render: (value: any, row: any) => <UserStatus value={value} row={row} />,
  },
  {
    header: "Actions",
    render: (value: any, row: any) => <UserAction value={value} row={row} />,
  },
];

export const getComplaintcolumns = (handleComplainEdit: any) => [
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Reported User",
    accessor: "user",
  },
  {
    header: "Reporter",
    accessor: "reporter",
  },
  {
    header: "Reason",
    accessor: "reason",
  },
  {
    header: "Date",
    accessor: "createdAt",
  },
  {
    header: "Status",
    accessor: "isResolved",
    render: (value: any) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {value ? "Resolved" : "Pending"}
      </span>
    ),
  },
  {
    header: "Actions",
    render: (value: any, row: any) => (
      <div className="flex space-x-2">
        <button
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          onClick={(e: any) => handleComplainEdit(e, row.id)}
        >
          Edit
        </button>
        {/* <button className="text-red-600 hover:text-red-800 text-sm font-medium">
          Delete
        </button> */}
      </div>
    ),
  },
];

export const getPostsColumns = (handlePostView: any) => [
  {
    header: "Post ID",
    accessor: "id",
  },
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Author",
    accessor: "author",
  },
  {
    header: "Description",
    accessor: "description",
  },
  {
    header: "Created Date",
    accessor: "createdAt",
  },
  {
    header: "Actions",
    render: (value: any, row: any) => (
      <div className="flex space-x-2">
        <button
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          onClick={() => handlePostView(row.id)}
        >
          View
        </button>
      </div>
    ),
  },
];

export const getAdsColumns = (handleAdEdit: any) => [
  {
    header: "Ad ID",
    accessor: "id",
  },
  {
    header: "Posted By",
    accessor: "postedBy",
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Company",
    accessor: "company",
  },
  {
    header: "Website",
    accessor: "website",
  },
  {
    header: "Status",
    accessor: "status",
    render: (value: any) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === "IN REVIEW"
            ? "bg-yellow-100 text-yellow-800"
            : value === "REJECT"
            ? "bg-red-100 text-red-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    header: "Actions",
    render: (value: any, row: any) => (
      <div className="flex space-x-2">
        <button
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          onClick={() => handleAdEdit(row.id)}
        >
          Edit
        </button>
        {/* <button className="text-red-600 hover:text-red-800 text-sm font-medium">
          Delete
        </button> */}
      </div>
    ),
  },
];
