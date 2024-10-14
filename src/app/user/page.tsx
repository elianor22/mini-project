import { Container } from "@mui/material";
import { Suspense } from "react";
import AddUser from "@/components/user/add-user";
import UserList from "@/components/user/user-list";
import Loading from "@/components/commons/Loading/Loading";

export default async function Home() {
  return (
    <>
      <Container>
        <AddUser />
        <Suspense fallback={<Loading />}>
          <UserList />
        </Suspense>
      </Container>
    </>
  );
}
