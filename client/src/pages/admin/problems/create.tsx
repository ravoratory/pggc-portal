import { Button, MenuItem, Select, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { gql, useMutation } from "urql";

import Sidebar from "@/components/orgranisms/sidebar";

const createProblem = gql`
  mutation createProblem($input: CreateProblemInput!) {
    createProblem(input: $input) {
      id
      title
      content
      difficulty
    }
  }
`;

const AdminProblem = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });

  const [problem, setProblem] = useMutation(createProblem);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const handleSubmit = () => {
    setProblem({
      input: {
        title,
        content,
        difficulty,
      },
    });
    router.push("/admin/problems");
  };
  return (
    <main>
      <Head>
        <title>detail</title>
      </Head>
      <Container>
        <Sidebar admin={session?.user?.role === "admin"} />
        <RightColumn>
          <h1>Create Problem</h1>
          <TextField
            id="filled-basic"
            label="title"
            variant="filled"
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
          <TextField
            id="content"
            label="content"
            variant="filled"
            multiline
            rows={16}
            value={content}
            onChange={({ target }) => {
              setContent(target.value);
            }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={difficulty}
            label="Age"
            onChange={({ target }) => setDifficulty(target.value)}
          >
            <MenuItem value="Tutorial">Tutorial</MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
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
