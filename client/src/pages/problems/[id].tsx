import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button, IconButton } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ReactMarkDown from "react-markdown";
import { toast } from "react-toastify";
import styled from "styled-components";

import Sidebar from "@/components/orgranisms/sidebar";

const Problem = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });
  const onClickCopy = () => {
    navigator.clipboard.writeText(mock.url);
    toast.info("Repository URL has copied!")
  }

  if (status !== "authenticated") {
    return undefined;
  }
  const mock = {
    title: "Quiz",
    content: `# test
      markdown test
    `,
    url: "test"
  }

  return (
    <main>
      <Head>
        <title>{router.query.id}</title>
      </Head>
      <Container>
        <Sidebar admin={session.user?.role === "admin"} />
        <RightColumn>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosIcon />}
            sx={{
              textTransform: "none",
              color: "white",
              borderColor: "white",
              width: "180px",
            }}
            onClick={() => router.push("/problems")}
          >
            Back to problems
          </Button>
          <Title>{mock.title}</Title>
          <Content>
            <ReactMarkDown>{mock.content}</ReactMarkDown>
          </Content>
          {mock.url === "" ? (
            <p>この問題にはリポジトリがありません</p>
          ) : (
            <>
              <p>問題リポジトリ</p>
              <Footer>
                {mock.url}
                <IconButton onClick={onClickCopy}>
                  <ContentCopyIcon sx={{ color: "white" }} />
                </IconButton>
              </Footer>
            </>
          )}
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
