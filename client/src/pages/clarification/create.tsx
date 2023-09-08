import {
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  useState,
} from "react";
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

const createClarification = gql`
  mutation createClarification($input: CreateClarificationInput!) {
    createClarification(input: $input) {
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
  const [result, setClar] = useMutation(createClarification);

  const [problemId, setProblemId] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const handleSubmit = () => {
    setClar({
      input: {
        teamId: session?.user?.team.id ?? 0,
        problemId,
        question,
        isPublic: false
      },
    });
    router.push("/admin/clarifications");
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
          <h1>Create Clarification</h1>
          <Select
            id="select-problem"
            value={problemId}
            label="TeamID"
            onChange={({ target }) => setProblemId(Number(target.value))}
          >
            {problems.map(
              (problem: {
                id: string | number | readonly string[] | undefined;
                title: string;
              }) => (
                <MenuItem key={`problem-${problem.id}`} value={problem.id}>
                  {problem.title}
                </MenuItem>
              ),
            )}
          </Select>
          <TextField
            id="question"
            label="Question"
            variant="filled"
            multiline
            rows={16}
            value={question}
            onChange={({ target }) => {
              setQuestion(target.value);
            }}
          />
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
