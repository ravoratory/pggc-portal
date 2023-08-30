import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";

import ScoreBoard from "@/components/orgranisms/scoreboard";
import Sidebar from "@/components/orgranisms/sidebar";
import SolvedTable from "@/components/orgranisms/solved-table";

const Mypage = () => {
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

  const mock = [
    {
      title: "test",
      solved: "13:00",
      level: "easy",
      point: 5,
    },
    {
      title: "test",
      solved: "13:00",
      level: "easy",
      point: 5,
    },
    {
      title: "test",
      solved: "13:00",
      level: "easy",
      point: 5,
    },
  ];
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
            <ScoreBoard
              members={[{ name: "Takumah" }, { name: "Ravie403" }]}
              chartData={[]}
            />
          </Container>
          <SolvedTable problems={mock} />
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
