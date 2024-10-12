import { RowData } from "@tanstack/react-table";

export interface IDataTable {
  table: Table;
  onPaginationChange: (paginationIndex: number) => void;
  pagination: Pagination;
  count: number;
}

type Table = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  rows: RowData[];
};

export type Pagination = {
  pageIndex: number;
  pageSize: number;
};
