import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { gql, useQuery } from "urql";

import Sidebar from "@/components/orgranisms/sidebar";

const rankingQuery = gql`
  query {
    teams {
      id
      name
    }
    rankingBoard{
      teamId
      score
    }
  }
`;

const Ranking = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });

  const [result, reexecute] = useQuery({
    query: rankingQuery,
  });
  console.log(result);

  return (
    <main>
      <Head>
        <title>ranking</title>
      </Head>
      <Container>
        <Sidebar admin={session?.user?.role === "admin"} />
        <RightColumn>
          <h1>RANKING</h1>
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

export default Ranking;
