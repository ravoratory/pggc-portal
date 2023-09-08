import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { gql, useQuery } from "urql";

import ScoreBoard from "@/components/orgranisms/scoreboard";
import Sidebar from "@/components/orgranisms/sidebar";
import SolvedTable from "@/components/orgranisms/solved-table";

const getMypageInfo = gql`
  query ($teamId: Float!) {
    teamMember(teamId: $teamId) {
      id
      userid
    }
    teamHistory(teamId: $teamId) {
      id
      problem {
        id
        title
        difficulty
      }
      score
      createdAt
    }
  }
`;

const Mypage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });
  console.log(session);
  const [result, reexecute] = useQuery({
    query: getMypageInfo,
    variables: { teamId: session?.user?.team?.id ?? 0 },
  });

  if (status !== "authenticated") {
    return undefined;
  }

  const data = result.data ?? { teamHistory: [], teamMember: [] };
  console.log(data);
  return (
    <main>
      <Head>
        <title>MYPAGE</title>
      </Head>
      <Container>
        <Sidebar admin={session.user?.role === "admin"} />
        <RightColumn>
          <h1>MYPAGE</h1>
          <Container>
            <ScoreBoard members={data.teamMember} chartData={[]} />
          </Container>
          <SolvedTable problems={data.teamHistory} />
        </RightColumn>
      </Container>
    </main>
  );
};

const RightColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
`;

const Container = styled.div`
  display: flex;
`;

export default Mypage;
