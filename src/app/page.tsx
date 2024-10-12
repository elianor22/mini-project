import {Container, Stack, Typography} from "@mui/material";
import Link from "next/link";

export default async function Home() {
    return (
        <>
            <Container>
                <Typography variant="h1"> This is Home</Typography>
                <Stack flexDirection="row" gap={3} color="blue">
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/user">
                        User
                    </Link>
                    <Link href="/not-found">
                        Not Found
                    </Link>
                </Stack>
            </Container>
        </>
    );
}
