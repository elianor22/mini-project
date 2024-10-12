import { Container } from "@mui/material";
import axios from "axios";
import { IResponseUser } from "@/types/response/users";
import { Suspense } from "react";
import AddUser from "@/components/user/add-user";
import UserList from "@/components/user/user-list";
import Loading from "@/components/commons/Loading/Loading";

async function getData(params: URLSearchParams) {
  // adding params in here
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
    params: params,
  });
  return data;
}

export default async function Home({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const data: IResponseUser = await getData(searchParams);

  return (
    <>
      <Container>
        <AddUser />
        <Suspense fallback={<Loading />}>
          <UserList data={data} />
        </Suspense>
      </Container>
    </>
  );
}
