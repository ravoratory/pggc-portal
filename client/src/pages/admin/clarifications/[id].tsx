import {
  Button,
  Checkbox,
  FormControlLabel,
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
  query ($clarificationId: Int!) {
    clarification(clarificationId: $clarificationId) {
      id
      team {
        id
        name
      }
      problem {
        id
        title
      }
      question
      answer
      isPublic
    }
  }
`;

const updateClarification = gql`
  mutation updateClarification($input: UpdateClarificationInput!) {
    updateClarification(input: $input) {
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
    variables: { clarificationId: Number(router.query.id)},
  });
  const [result, setClar] = useMutation(updateClarification);

  const [answer, setAnswer] = useState<string>(data?.data?.clarification.answer);
  const [isPublic, setIsPublic] = useState<boolean>(
    data?.data?.clarification.isPublic ?? false,
  );
  const handleSubmit = () => {
    setClar({
      input: {
        id: Number(router.query.id),
        answer,
        isPublic,
      },
    });
    router.push("/admin/clarifications");
  };

  return (
    <main>
      <Head>
        <title>detail</title>
      </Head>
      <Container>
        <Sidebar admin={session?.user?.role === "admin"} />
        <RightColumn>
          <h1>Create Clarification</h1>
          <h2>From: {data?.data?.clarification.team.name}</h2>
          <h2>About: {data?.data?.clarification.problem.title}</h2>
          <h2>Question:</h2>
          <p>{data?.data?.clarification.question}</p>
          <TextField
            id="answer"
            label="Answer"
            variant="filled"
            multiline
            rows={16}
            value={answer}
            onChange={({ target }) => {
              setAnswer(target.value);
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isPublic}
                value={isPublic}
                onChange={({ target }) => {
                  setIsPublic(!isPublic);
                }}
              />
            }
            label="isPublic"
          />
          <Button onClick={handleSubmit} type="button">
            更新
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
