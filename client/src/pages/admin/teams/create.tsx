import { Button, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { gql, useMutation } from "urql";

import Sidebar from "@/components/orgranisms/sidebar";

const createTeam = gql`
  mutation createTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      name
    }
  }
`;

const Problem = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });

  const [team, setTeam] = useMutation(createTeam);

  const [name, setName] = useState<string>("");
  const handleSubmit = () => {
    setTeam({
      input: {
        name,
      },
    });
    router.push("/admin/teams");
  };
  return (
    <main>
      <Head>
        <title>detail</title>
      </Head>
      <Container>
        <Sidebar admin={session?.user?.role === "admin"} />
        <RightColumn>
          <h1>Create Team</h1>
          <TextField
            id="filled-basic"
            label="name"
            variant="filled"
            sx={{ backgroundColor: "white" }}
            value={name}
            onChange={({ target }) => {
              setName(target.value);
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

export default Problem;

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
