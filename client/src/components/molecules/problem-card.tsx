import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { useRouter } from "next/router";
import styled from "styled-components";

interface ProblemCardProps {
  title: string;
  solved: boolean;
}

const ProblemCard = (props: ProblemCardProps) => {
  const { title, solved } = props;
  const router = useRouter();
  return (
    <Card onClick={() => router.push(`/problems/${title}`)}>
      <Icons>
        <AssignmentOutlinedIcon sx={{ color: "white" }} fontSize="large" />
        {solved ? (
          <CheckCircleOutlineIcon sx={{ color: "#07DDCC" }} fontSize="large" />
        ) : (
          <FlagOutlinedIcon sx={{ color: "#FC9C11" }} fontSize="large" />
        )}
      </Icons>
      <p>{title}</p>
    </Card>
  );
};

export default ProblemCard;

const Card = styled.button`
  display: flex;
  width: 180px;
  height: 180px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 16px;
  border-radius: 15px;
  background-color: #232c79;
  border: none;
  & > p {
    margin: 16px;
  }
  &:hover {
    cursor: pointer;
    outline: 1px solid white;
  }
`;

const Icons = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-around;
`;
