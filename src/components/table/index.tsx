import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { number } from "zod";
import { useLocation } from "react-router";

type DataTableType = {
  totalPages: number
  data: Array<any>;
  columns: Array<any>;
  searchable: boolean;
  sortable: boolean;
  paginated: boolean;
  pageSize: number;
  className: string;
  isLoading?: boolean;
  emptyMessage?: string;
  currentPage: number,
  setCurrentPage: (page: number) => void;
  totalData:number
};

// Reusable Table Component
const DataTable = ({
  data = [],
  columns = [],
  searchable = true,
  sortable = true,
  paginated = true,
  pageSize = 10,
  className = "",
  isLoading = false,
  emptyMessage = "No data available",
  totalPages = 1,
  currentPage = 1,
  setCurrentPage,
  totalData=1,
}: DataTableType) => {
  let location = useLocation()
  console.log(location?.pathname)
  const path=location?.pathname
  const [searchTerm, setSearchTerm] = useState("");


  const [sortConfig, setSortConfig] = useState<any>({
    key: null,
    direction: "asc",
  });

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data;

    return data.filter((item) =>
      columns.some((column: any) => {
        const value = column.accessor ? item[column.accessor] : "";
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns, searchable]);
  

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortable || !sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig, sortable]);
  
const paginatedData=sortedData
  // Paginate data
  // const paginatedData = useMemo(() => {
  //   if (!paginated) return sortedData;

  //   const startIndex = (currentPage - 1) * pageSize;
  //   return sortedData.slice(startIndex, startIndex + pageSize);
  // }, [sortedData, currentPage, pageSize, paginated]);
  // console.log("pagintedData...",paginatedData)
  // console.log("sorted data...", sortedData.length, "pageszie..", pageSize)
  // const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key: any) => {
    if (!sortable) return;

    setSortConfig((prevConfig: any) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };
  console.log(totalPages)

  const getSortIcon = (columnKey: any) => {
    if (!sortable) return null;
    if (sortConfig.key !== columnKey)
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };
  const goToPage = (page: any) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  console.log("currentPage" ,currentPage)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={`bg-white shadow-lg rounded-lg  ${className} `}
    >
      {/* Search Bar */}
      {searchable && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto h-[30rem] min-h-[28rem]">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {columns.map((column: any, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${sortable && column.accessor
                      ? "cursor-pointer hover:bg-gray-100"
                      : ""
                    }`}
                  onClick={() => column.accessor && handleSort(column.accessor)}
                >
                  <div className="flex items-center space-x-1 ">
                    <span>{column.header}</span>
                    {column.accessor && getSortIcon(column.accessor)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 h-full overflow-scroll no-scrollbar ">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column: any, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {column.render
                        ? column.render(row[column.accessor], row, rowIndex)
                        : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between ">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * pageSize + 1} to {(currentPage - 1) * pageSize  +paginatedData.length +" "} 
              of{" "}
            {totalData} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
