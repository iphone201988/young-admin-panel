import { useUpdateReportStatusMutation } from "@/redux/api";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

const SelectBox = ({ value }: { value: boolean }) => {
  const [updateReportStatus] = useUpdateReportStatusMutation();

  const handleStatusChange = async () => {
    updateReportStatus().unwrap();
  };

  return (
    <Select.Root
      defaultValue={value ? "resolved" : "not_resolved"}
      onValueChange={(val) => {
        const newValue = val === "resolved";
        // onStatusChange(row.id, newValue); // 👈 Update status with row.id
      }}
    >
      <Select.Trigger className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Select.Value />
        <Select.Icon className="ml-2">
          <ChevronDown className="w-3 h-3" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-50 bg-white border border-gray-200 rounded-md shadow-md">
          <Select.Viewport className="p-1">
            <Select.Item
              value="resolved"
              className="relative flex items-center px-3 py-1.5 text-sm rounded-md cursor-pointer select-none text-gray-800 hover:bg-gray-100"
            >
              <Select.ItemText>Resolved</Select.ItemText>
              <Select.ItemIndicator className="absolute right-3">
                <Check className="w-3 h-3 text-green-600" />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item
              value="not_resolved"
              className="relative flex items-center px-3 py-1.5 text-sm rounded-md cursor-pointer select-none text-gray-800 hover:bg-gray-100"
            >
              <Select.ItemText>Not Resolved</Select.ItemText>
              <Select.ItemIndicator className="absolute right-3">
                <Check className="w-3 h-3 text-green-600" />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectBox;
