import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";

import Sidebar from "@/components/orgranisms/sidebar";

const Scoreboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });
  if (status !== "authenticated") {
    return undefined;
  }
  return (
    <main>
      <Head>
        <title>Scoreboard</title>
      </Head>
      <Container>
        <Sidebar admin={session.user?.role === "admin"} />
        <RightColumn>
          <h1>SCOREBOARD</h1>
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
