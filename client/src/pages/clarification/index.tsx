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

const getClarifications = gql`
  query {
    clarifications {
      id
      question
      answer
      team {
        id
        name
      }
      problem {
        id
        title
      }
      isPublic
    }
  }
`;

const Clar = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });
  const [result, reexecute] = useQuery({
    query: getClarifications,
  });

  if (status !== "authenticated") {
    return undefined;
  }
  const clars = result?.data?.clarifications ?? [];

  return (
    <main>
      <Head>
        <title>clarifications</title>
      </Head>
      <Container>
        <Sidebar admin={session.user?.role === "admin"} />
        <RightColumn>
          <h1>CLARIFICATIONS</h1>
          <Button
            variant="contained"
            onClick={() => router.push("/clarification/create")}
          >
            Create clarification
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>id</TableCell>
                <TableCell sx={{ color: "white" }}>isPublic</TableCell>
                <TableCell sx={{ color: "white" }}>team</TableCell>
                <TableCell sx={{ color: "white" }}>problem</TableCell>
                <TableCell sx={{ color: "white" }}>question</TableCell>
                <TableCell sx={{ color: "white" }}>answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clars.map((clar: any) => (
                <TableRow key={clar.id}>
                  <TableCell sx={{ color: "white" }}>{clar.id}</TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                  >{`${clar.isPublic}`}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {clar.team.name}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {clar.problem.title}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>{clar.question}</TableCell>
                  <TableCell sx={{ color: "white" }}>{clar.answer}</TableCell>
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

export default Clar;
