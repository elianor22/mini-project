"use client";

import FetchTable from "@/components/commons/FetchTable/FetchTable";
import { TABLE_COLUMN_USER } from "@/constants/tableColumns/UsersColumn";
import { IResponseUser } from "@/types/response/users";
import { Pagination } from "@/types/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, memo, useCallback } from "react";

type UserList = {
  data: IResponseUser;
};

const UserList: FC<UserList> = memo(({ data }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pagination: Pagination = {
    pageIndex: data.page - 1,
    pageSize: data.limit,
  };

  const handlePaginationChange = useCallback(
    (newPage: number) => {
      const query = new URLSearchParams(searchParams.toString());
      query.set("page", newPage.toString());

      // Use shallow routing to update the URL without a full re-render
      router.replace(`${pathname}?${query}`, {});
    },
    [pathname, searchParams, router]
  );

  return (
    <FetchTable
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      count={data.total}
      table={{
        columns: TABLE_COLUMN_USER,
        rows: data.data,
      }}
    />
  );
});
UserList.displayName = "UserList";
export default UserList;
