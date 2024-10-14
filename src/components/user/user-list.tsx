"use client";

import FetchTable from "@/components/commons/FetchTable/FetchTable";
import { TABLE_COLUMN_USER } from "@/constants/tableColumns/UsersColumn";
import { BaseService } from "@/service/base.service";
import { IResponseUser } from "@/types/response/users";
import { Pagination } from "@/types/table";
import { useQuery } from "@tanstack/react-query";
import { memo, useState } from "react";

const UserList = memo(({}) => {
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 1,
    pageSize: 10,
  });

  const { data, isLoading } = useQuery<IResponseUser>({
    queryKey: ["user", pagination.pageIndex],
    queryFn: async () => {
      const service = new BaseService("/user");
      const res = await service.get({
        params: {
          page: pagination.pageIndex,
        },
      });
      return res;
    },
    refetchOnWindowFocus: false,
  });

  // const handlePaginationChange = useCallback(
  //   (newPage: number) => {
  //     const query = new URLSearchParams(searchParams.toString());
  //     query.set("page", newPage.toString());

  //     // Use shallow routing to update the URL without a full re-render
  //     router.replace(`${pathname}?${query}`, {});
  //   },
  //   [pathname, searchParams, router]
  // );

  return (
    <FetchTable
      pagination={pagination}
      onPaginationChange={setPagination}
      count={data?.total || 0}
      table={{
        columns: TABLE_COLUMN_USER,
        rows: data?.data || [],
      }}
      loading={isLoading}
    />
  );
});
UserList.displayName = "UserList";
export default UserList;
