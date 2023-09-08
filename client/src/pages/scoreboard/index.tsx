import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { gql, useQuery } from "urql";

import StatusIcon from "@/components/atoms/ans-status";
import Sidebar from "@/components/orgranisms/sidebar";

const query = gql`
  query {
    dashBoard {
      id
      team {
        id
        name
      }
      problem {
        id
        title
      }
      status
    }
    teams {
      id
      name
    }
    problems {
      id
      title
    }
  }
`;

const Scoreboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });

  const [result, reexecute] = useQuery({
    query,
  });
  const teams = result.data?.teams ?? [];
  const problems = result.data?.problems ?? [];
  const dashBoard = result.data?.dashBoard ?? [];
  return (
    <main>
      <Head>
        <title>Scoreboard</title>
      </Head>
      <Container>
        <Sidebar admin={session?.user?.role === "admin"} />
        <RightColumn>
          <h1>SCOREBOARD</h1>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "transparent" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "white" }} />
                  {problems.map((problem: any) => (
                    <TableCell
                      key={`problem-${problem.id}`}
                      sx={{ color: "white" }}
                    >
                      {problem.title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team: any) => (
                  <TableRow key={`team-${team.id}`}>
                    <TableCell sx={{ color: "white" }}>{team.name}</TableCell>
                    {problems.map((problem: any) => (
                      <TableCell
                        key={`status-${problem.id}`}
                        align="center"
                        sx={{ color: "white" }}
                      >
                        <StatusIcon
                          status={
                            dashBoard.findLast(
                              (d: any) =>
                                d.problem.id === problem.id &&
                                d.team.id === team.id,
                            )?.status ?? "nothing"
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

export default Scoreboard;
