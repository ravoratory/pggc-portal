import { Button, TextField } from "@mui/material";
import Head from "next/head";
import styled from "styled-components";

const AdminLogin = () => {
  const a = 1;
  return (
    <main>
      <Head>
        <title>login</title>
      </Head>
      <Container>
        <RightColumn>
          <h1>LOGIN AS ADMIN</h1>
          <Content>
            if you are admin, please login.
            <Form action="" method="POST">
              <TextField required label="id" id="id" color="primary" />
              <TextField
                required
                label="password"
                id="password"
                type="password"
                color="primary"
              />
              <Button type="submit" variant="outlined">Login</Button>
            </Form>
          </Content>
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

const Content = styled.div`
  width: 50%;
  height: 300px;
  background-color: #232c79;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
`;

export default AdminLogin;
