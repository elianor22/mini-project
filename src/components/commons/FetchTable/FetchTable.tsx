import { IDataTable } from "@/types/table";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useMemo } from "react";

const FetchTable: FC<IDataTable> = ({
  table,
  pagination,
  onPaginationChange,
  count,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => table.columns, []);

  const tableInstance = useReactTable({
    columns,
    data: table.rows,
    rowCount: count,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {tableInstance.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="h-4" />
      </TableContainer>
      <Pagination
        color="primary"
        count={tableInstance.getPageCount()}
        page={pagination.pageIndex + 1}
        onChange={(_, v: number) => onPaginationChange(v)}
      />
    </>
  );
};
export default FetchTable;
