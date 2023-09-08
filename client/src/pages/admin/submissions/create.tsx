import { Button, MenuItem, Select, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { gql, useMutation, useQuery } from "urql";

import Sidebar from "@/components/orgranisms/sidebar";

const getInfo = gql`
  query {
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

const createHistory = gql`
  mutation createHistory($input: CreateHistoryInput!) {
    createHistory(input: $input) {
      id
    }
  }
`;

const AdminProblem = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });

  const [data, reexecute] = useQuery({
    query: getInfo,
  });
  const [result, setHistory] = useMutation(createHistory);

  const [teamId, setTeamId] = useState<number>(0);
  const [problemId, setProblemId] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const handleSubmit = () => {
    setHistory({
      input: {
        teamId,
        problemId,
        score,
        status,
      },
    });
    router.push("/admin/submissions");
  };
  const problems = data?.data?.problems ?? [];
  const teams = data?.data?.teams ?? [];
  console.log(problems, teams);
  return (
    <main>
      <Head>
        <title>detail</title>
      </Head>
      <Container>
        <Sidebar admin={session?.user?.role === "admin"} />
        <RightColumn>
          <h1>Create Problem</h1>
          <Select
            id="select-problem"
            value={problemId}
            label="TeamID"
            onChange={({ target }) => setProblemId(Number(target.value))}
            sx={{ backgroundColor: "white" }}
          >
            {problems.map((problem: any) => (
              <MenuItem key={`problem-${problem.id}`} value={problem.id}>
                {problem.title}
              </MenuItem>
            ))}
          </Select>
          <Select
            id="select-team"
            value={teamId}
            label="TeamID"
            onChange={({ target }) => setTeamId(Number(target.value))}
            sx={{ backgroundColor: "white" }}
          >
            {teams.map((team: any) => (
              <MenuItem key={`team-${team.id}`} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            value={score}
            onChange={({ target }) => setScore(Number(target.value))}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ backgroundColor: "white" }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="status"
            onChange={({ target }) => setStatus(target.value)}
            sx={{ backgroundColor: "white" }}
          >
            <MenuItem value="judging">judging(判定中)</MenuItem>
            <MenuItem value="correct">correct(正解)</MenuItem>
            <MenuItem value="incorrect">incorrect(不正解)</MenuItem>
            <MenuItem value="partial">partial(部分点)</MenuItem>
          </Select>
          <Button onClick={handleSubmit} type="button">
            追加
          </Button>
        </RightColumn>
      </Container>
    </main>
  );
};

export default AdminProblem;

const RightColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 40px;
`;

const Container = styled.div`
  display: flex;
`;

const Title = styled.h1``;

const Content = styled.div``;

const Footer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid white;
  padding: 8px 20px;
`;
