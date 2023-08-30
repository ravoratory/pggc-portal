import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Tab, Tabs } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "urql";

import ProblemCard from "@/components/molecules/problem-card";
import Sidebar from "@/components/orgranisms/sidebar";

const GetAllProblems = gql`
  query {
    problems {
      id
      title
      difficulty
    }
  }
`;

const Problems = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });
  const [level, setLevel] = useState<string>("tutorial");
  const handleChange = (event, newValue: string) => {
    setLevel(newValue);
  };
  const [result, reexecuteQuery] = useQuery({
    query: GetAllProblems,
  });

  const { data, fetching, error } = result;
  console.log(data, fetching, error);
  const difficulties = [
    "Tutorial",
    "Beginner",
    "Easy",
    "Medium",
    "Hard",
    "Insane",
  ].map((d) => ({
    diff: d,
    solved: (data?.problems ?? [])
      .filter((p) => p.difficulty === d.toLowerCase())
      .every((p) => p.solved),
  }));
  return (
    <main>
      <Head>
        <title>problems</title>
      </Head>
      <Container>
        <Sidebar admin={session?.user?.role === "admin"} />
        <RightColumn>
          <h1>PROBLEMS</h1>
          <Tabs value={level} onChange={handleChange}>
            {difficulties.map((d) => (
              <Tab
                icon={
                  d.solved ? (
                    <CheckCircleOutlineIcon sx={{ color: "#07DDCC" }} />
                  ) : undefined
                }
                iconPosition="end"
                key={d.diff}
                value={d.diff.toLowerCase()}
                label={d.diff}
                sx={{ color: "white" }}
              />
            ))}
          </Tabs>
          <CardContainer>
            {!fetching &&
              data &&
              data.problems
                .filter(
                  (p) => p.difficulty.toLowerCase() === level.toLowerCase(),
                )
                .map((p) => (
                  <ProblemCard
                    key={p.title}
                    title={p.title}
                    solved={p.solved}
                  />
                ))}
          </CardContainer>
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
  gap: 8px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const CardContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 180px);
  gap: 56px;
`;

export default Problems;
