import Button from "@mui/material/Button";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import styled from "styled-components";

import PGritIcon from "@/components/atoms/pgrit-icon";
import Sidebar from "@/components/orgranisms/sidebar";

const Home = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return undefined;
  }
  if (!session) {
    return (
      <main>
        <Head>
          <title>PGGC-Portal</title>
        </Head>
        <Container login={false}>
          <PGGCLogo src="/pggc.png" />
          <div>
            <h1>PlayGround Git Challenge</h1>
            <ul>
              <li>Date: 2023/09/09 13:00~16:00 JST</li>
              <li>Tag: #PGGC</li>
              <li>
                Host: <a href="https://github.com/ravoratory">Ravoratory</a>
              </li>
            </ul>
          </div>
          <SignInButton
            variant="contained"
            startIcon={<PGritIcon sx={{ color: "white" }} />}
            onClick={() => {
              signIn("pgrit", {
                callbackUrl: `http://localhost:3000/`,
              });
            }}
          >
            Sign in with PGrit
          </SignInButton>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Head>
        <title>PGGC-Portal</title>
      </Head>
      <Container login>
        <Sidebar admin={session.user?.role === "admin"} />
      </Container>
    </main>
  );
};

const SignInButton = styled(Button)`
  text-transform: none;
`;

const Container = styled.div<{ login: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ login }) => (login ? "flex-start" : "center")};
`;

const PGGCLogo = styled.img`
  width: 280px;
`;

export default Home;
