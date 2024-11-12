import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import {
  ChevronDown,
  ChevronDownIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  PencilLine,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { pageSizeOptions } from "@/lib/utils";
import { ModalType, useModal } from "@/hooks/useModalStore";

interface DataTableProps {
  pageSize?: number;
  data: any[];
  columns: ColumnDef<any>[];
  editModalName?: ModalType;
  edit?: boolean;
  toggle?: boolean;
  onToggleChange?: (departmentId: number | string, status: number) => void;
  columnFilter?: boolean;
  searchDropdown?: boolean;
  dropdownData?: string[];
  onDropdownSelection?: (selectedValue: string) => void;
  selectedFilter?: string;
}

export default function DataTable({
  pageSize,
  data,
  columns,
  edit,
  editModalName,
  toggle,
  onToggleChange,
  columnFilter = true,
  dropdownData,
  searchDropdown,
  onDropdownSelection,
  selectedFilter
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [filtering, setFiltering] = useState("");

  const { onOpen } = useModal();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize || 5,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  const handleEdit = (row: unknown, modalName: ModalType) => {
    onOpen(modalName, "null", row, "update");
  };

  const handleToggleChange = (departmentId: number | string, isChecked: boolean) => {
    const status = isChecked ? 1 : 0;
    onToggleChange?.(departmentId, status);
  };

  const handleSelectItem = (item: string) => {
    onDropdownSelection?.(item);
  };

  return (
    <div className="w-full">
      <div className="flex py-4">
        { !searchDropdown ?
          <Input
            placeholder="Filter by any value..."
            value={ filtering }
            onChange={ (event) => setFiltering(event.target.value) }
            className="max-w-sm"
          />
          :
          (
            <div className="flex gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    { selectedFilter ? selectedFilter : "Select Filter Type" }
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {
                    dropdownData
                      ?.map((dropdownItem, index) => (
                        <DropdownMenuItem
                          key={ index }
                          onClick={ () => handleSelectItem(dropdownItem) }
                          className={ selectedFilter === dropdownItem ? 'selected' : '' }
                        >
                          { dropdownItem }
                        </DropdownMenuItem>
                      ))
                  }
                </DropdownMenuContent>
              </DropdownMenu>
              { selectedFilter !== "" &&
                <Input
                  placeholder={ `Filter by ${selectedFilter || "column"}` }
                  value={ filtering }
                  onChange={ (event) => setFiltering(event.target.value) }
                  className="w-60 mb-2"
                />
              }
            </div>
          ) }
        { columnFilter &&
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              { table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={ column.id }
                      className="capitalize"
                      checked={ column.getIsVisible() }
                      onCheckedChange={ (value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      { column.id }
                    </DropdownMenuCheckboxItem>
                  );
                }) }
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            { table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={ headerGroup.id }>
                { headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={ header.id }
                      className="text-nowrap max-h-14 whitespace-nowrap text-black font-bold"
                    >
                      { header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ) }
                    </TableHead>
                  );
                }) }
              </TableRow>
            )) }
          </TableHeader>
          <TableBody>
            { table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={ row.id }
                  data-state={ row.getIsSelected() && "selected" }
                >
                  { row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={ cell.id }
                      className="capitalize text-nowrap whitespace-nowrap max-h-14"
                    >
                      { flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      ) }
                    </TableCell>
                  )) }
                  { edit && editModalName && (
                    <TableCell className="text-nowrap whitespace-nowrap max-h-14">
                      {/* Action Buttons */ }
                      <div className="flex space-x-2">
                        <button
                          className="hover:scale-105 transition-all duration-300"
                          onClick={ () =>
                            handleEdit(row.original, editModalName)
                          }
                        >
                          <PencilLine />
                        </button>
                      </div>
                    </TableCell>
                  ) }
                  { toggle &&
                    <TableCell className="text-nowrap whitespace-nowrap max-h-14">
                      <label htmlFor={ `toggle-${row.id}` } className="flex justify-center items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" id={ `toggle-${row.id}` }
                            checked={ row.original.bEnable }
                            onChange={ (e) => { handleToggleChange(row.original.pklDepartmentId, e.target.checked) } }
                            className="sr-only" />
                          <div className="block bg-gray-600 w-14 h-7 rounded-full"></div>
                          <div className="dot absolute left-1 top-0.5 bg-white w-6 h-6 rounded-full transition"></div>
                        </div>
                      </label>
                    </TableCell>
                  }
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={ columns?.length }
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 flex-wrap gap-3">
        <div className="flex-1 text-sm text-muted-foreground">
          { (table.options.state.pagination?.pageSize || 0) *
            ((table.options.state.pagination?.pageIndex || 0) + 1) }{ " " }
          of { table.getFilteredRowModel().rows.length } row(s).
        </div>
        <div className="space-x-2 flex items-center">
          <div className="text-xs flex items-center">
            <span className="text-nowrap mr-2 text-gray-500">
              Rows Per Page
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={ "outline" }>
                  { table.options.state.pagination?.pageSize }{ " " }
                  <ChevronDownIcon className="w-4 h-4 ml-2" />{ " " }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                { pageSizeOptions.map((option, index) => (
                  <DropdownMenuCheckboxItem
                    key={ index }
                    checked={
                      table.options.state.pagination?.pageSize === option
                    }
                    onCheckedChange={ () => table.setPageSize(option) }
                  >
                    { option }
                  </DropdownMenuCheckboxItem>
                )) }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={ () => table.setPageIndex(0) }
            disabled={ !table.getCanPreviousPage() }
          >
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={ () => table.previousPage() }
            disabled={ !table.getCanPreviousPage() }
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={ () => table.nextPage() }
            disabled={ !table.getCanNextPage() }
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={ () => table.setPageIndex(table.getPageCount() - 1) }
            disabled={ !table.getCanNextPage() }
          >
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );

}
