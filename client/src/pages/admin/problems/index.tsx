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

const getProblems = gql`
  query {
    problems {
      id
      title
      difficulty
    }
  }
`;

const Adminproblem = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });
  const [result, reexecute] = useQuery({
    query: getProblems,
  });

  if (status !== "authenticated") {
    return undefined;
  }
  if (session.user?.role !== "admin") {
    router.replace("/404");
  }
  const problems = result?.data?.problems ?? [];
  return (
    <main>
      <Head>
        <title>admin/problems</title>
      </Head>
      <Container>
        <Sidebar admin />
        <RightColumn>
          <h1>ADMIN/PROBLEMS</h1>
          <Button
            variant="contained"
            onClick={() => router.push("/admin/problems/create")}
          >
            Create problem
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>id</TableCell>
                <TableCell sx={{ color: "white" }}>title</TableCell>
                <TableCell sx={{ color: "white" }}>difficulty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {problems.map((problem: any) => (
                <TableRow key={problem.id}>
                  <TableCell sx={{ color: "white" }}>{problem.id}</TableCell>
                  <TableCell sx={{ color: "white" }}>{problem.title}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {problem.difficulty}
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

export default Adminproblem;
