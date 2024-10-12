"use client";

import { IUser } from "@/types/user";
import { createColumnHelper, Row } from "@tanstack/react-table";
import EditUser from "@/components/user/edit-user";
import DeleteUser from "@/components/user/delete-user";

const columnHelpers = createColumnHelper<IUser>();

export const TABLE_COLUMN_USER = [
  columnHelpers.accessor("name", {
    cell: (info) => info.getValue(),
  }),
  columnHelpers.accessor("email", {
    cell: (info) => info.getValue(),
  }),
  columnHelpers.display({
    id: "action",
    cell: ({ row }: { row: Row<IUser> }) => (
      <>
        <EditUser data={row.original} />
        <DeleteUser data={row.original} />
      </>
    ),
  }),
];
