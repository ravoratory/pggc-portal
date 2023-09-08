import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

interface User {
  userid: string;
}

interface ScoreBoardProps {
  members: User[];
  chartData: any[];
}

const ScoreBoard = (props: ScoreBoardProps) => {
  const { members, chartData } = props;
  return (
    <Container>
      <ResponsiveContainer width="80%">
        <LineChart>
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </LineChart>
      </ResponsiveContainer>
      <Members>
        <h3>Team Members</h3>
        <List>
          {members.map((member) => (
            <ListItem key={member.userid}>
              <ListItemIcon sx={{ color: "white" }}>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={member.userid} />
            </ListItem>
          ))}
        </List>
      </Members>
    </Container>
  );
};

export default ScoreBoard;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Members = styled.div`
  display: flex;
  width: 160px;
  flex-direction: column;
`;
