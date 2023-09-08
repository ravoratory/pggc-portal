import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { gql, useQuery } from "urql";

import Sidebar from "@/components/orgranisms/sidebar";

const getHistories = gql`
  query {
    histories {
      id
      score
      status
      team {
        id
        name
      }
      problem {
        id
        title
      }
      createdAt
    }
  }
`;

const AdminHistorie = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });
  const [result, reexecute] = useQuery({
    query: getHistories,
  });

  if (status !== "authenticated") {
    return undefined;
  }
  if (session.user?.role !== "admin") {
    router.replace("/404");
  }
  const histories = result?.data?.histories ?? [];
  return (
    <main>
      <Head>
        <title>admin/histories</title>
      </Head>
      <Container>
        <Sidebar admin />
        <RightColumn>
          <h1>ADMIN/TEAMS</h1>
          <Button
            variant="contained"
            onClick={() => router.push("/admin/submissions/create")}
          >
            Create History
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>id</TableCell>
                <TableCell sx={{ color: "white" }}>status</TableCell>
                <TableCell sx={{ color: "white" }}>score</TableCell>
                <TableCell sx={{ color: "white" }}>team</TableCell>
                <TableCell sx={{ color: "white" }}>problem</TableCell>
                <TableCell sx={{ color: "white" }}>date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histories.map((history: any) => (
                <TableRow key={history.id}>
                  <TableCell sx={{ color: "white" }}>{history.id}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {history.status}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{history.score}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {history.team.name}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {history.problem.title}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {new Date(history.createdAt).toLocaleString("JST")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </RightColumn>
      </Container>
    </main>
  );
};

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 40px;
`;

const Container = styled.div`
  display: flex;
`;

export default AdminHistorie;
