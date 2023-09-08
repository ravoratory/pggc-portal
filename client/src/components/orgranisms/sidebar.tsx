import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import styled from "styled-components";

import logo from "../../../public/ravoratory.svg";
import AdminSidebar from "../molecules/admin-sidebar";

interface SidebarProps {
  admin: boolean;
}

const Sidebar = (props: SidebarProps) => {
  const router = useRouter();
  const onclick = (label: string) => (event: MouseEvent<HTMLDivElement>) => {
    router.push(label);
  };
  const { admin: isAdmin } = props;
  const columnProps = [
    {
      text: "MYPAGE",
      icon: <HomeOutlinedIcon />,
      onClick: onclick("/mypage"),
    },
    {
      text: "PROBLEMS",
      icon: <AssignmentOutlinedIcon />,
      onClick: onclick("/problems"),
    },
    {
      text: "CLARIFICATION",
      icon: <LiveHelpIcon />,
      onClick: onclick("/clarification"),
    },
    {
      text: "SCOREBOARD",
      icon: <DashboardIcon />,
      onClick: onclick("/scoreboard"),
    },
    {
      text: "RANKING",
      icon: <LeaderboardOutlinedIcon />,
      onClick: onclick("/ranking"),
    },
  ];
  return (
    <div>
      <Container>
        <Link href="/">
          <Image src={logo} alt="logo" width={196} height={148} />
        </Link>
        <List sx={{ minWidth: "90%" }} disablePadding>
          {columnProps.map((c) => (
            <ListItem key={c.text}>
              <ListItemButton onClick={c.onClick}>
                <ListItemIcon sx={{ color: "white" }}>{c.icon}</ListItemIcon>
                <ListItemText primary={c.text} />
              </ListItemButton>
            </ListItem>
          ))}
          {isAdmin ? <AdminSidebar /> : undefined}
        </List>
      </Container>
    </div>
  );
};

export default Sidebar;

const Container = styled.div`
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: sticky;
  top: 32px;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  background: var(
    --sidebar-background,
    linear-gradient(180deg, #10196a 0%, rgba(16, 25, 106, 0) 100%)
  );
`;
