import { OnChangeFn, PaginationState, RowData } from "@tanstack/react-table";

export interface IDataTable {
  table: Table;
  onPaginationChange: OnChangeFn<PaginationState>;
  pagination: Pagination;
  count: number;
  loading: boolean;
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
