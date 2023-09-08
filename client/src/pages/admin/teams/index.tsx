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

const getTeams = gql`
  query {
    teams {
      id
      name
      members {
        id
        userid
      }
    }
  }
`;

const AdminTeam = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });
  const [result, reexecute] = useQuery({
    query: getTeams,
  });

  if (status !== "authenticated") {
    return undefined;
  }
  if (session.user?.role !== "admin") {
    router.replace("/404");
  }
  const teams = result?.data?.teams ?? [];
  return (
    <main>
      <Head>
        <title>admin/teams</title>
      </Head>
      <Container>
        <Sidebar admin />
        <RightColumn>
          <h1>ADMIN/TEAMS</h1>
          <Button
            variant="contained"
            onClick={() => router.push("/admin/teams/create")}
          >
            Create Team
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>id</TableCell>
                <TableCell sx={{ color: "white" }}>name</TableCell>
                <TableCell sx={{ color: "white" }}>member</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.map((team: any) => (
                <TableRow key={team.id}>
                  <TableCell sx={{ color: "white" }}>{team.id}</TableCell>
                  <TableCell sx={{ color: "white" }}>{team.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {team.members.map((member: any) => member.userid).join(",")}
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

export default AdminTeam;
