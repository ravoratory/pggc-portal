import CampaignIcon from '@mui/icons-material/Campaign';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupsIcon from "@mui/icons-material/Groups";
import HistoryIcon from "@mui/icons-material/History";
import QuizIcon from "@mui/icons-material/Quiz";
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";

const AdminSidebar = () => {
  const [open, toggleOpen] = useState<boolean>(false);
  const onClickAdminToggle = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggleOpen(!open);
  };
  const router = useRouter();
  const onclick = (label: string) => (event: MouseEvent<HTMLDivElement>) => {
    router.push(label);
  };

  const adminColumn = [
    {
      text: "SETTINGS",
      icon: <SettingsIcon />,
      onClick: onclick("/admin/settings"),
    },
    {
      text: "TEAMS",
      icon: <GroupsIcon />,
      onClick: onclick("/admin/teams"),
    },
    {
      text: "PROBLEMS",
      icon: <QuizIcon />,
      onClick: onclick("/admin/problems"),
    },
    {
      text: "SUBMISSIONS",
      icon: <HistoryIcon />,
      onClick: onclick("/admin/submissions"),
    },
    {
      text: "CLARIFICATIONS",
      icon: <CampaignIcon />,
      onClick: onclick("/admin/clarifications")
    }
  ];
  return (
    <>
      <ListItem>
        <ListItemButton onClick={onClickAdminToggle}>
          <ListItemIcon sx={{ color: "white" }}>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="ADMIN" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {adminColumn.map((c) => (
            <ListItem key={c.text}>
              <ListItemButton onClick={c.onClick} sx={{ pl: 4 }}>
                <ListItemIcon sx={{ color: "white" }}>{c.icon}</ListItemIcon>
                <ListItemText primary={c.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default AdminSidebar;
