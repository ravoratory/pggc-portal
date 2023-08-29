import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components";

interface Problem {
  title: string;
  solved: string;
  level: string;
  point: number;
}

interface SolvedTableProps {
  problems: Problem[];
}

const SolvedTable = (props: SolvedTableProps) => {
  const { problems } = props;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ borderBottom: "solid white 1px" }}>
            <StyledTableCell align="left">Title</StyledTableCell>
            <StyledTableCell align="center">Clear Time</StyledTableCell>
            <StyledTableCell align="center">Level</StyledTableCell>
            <StyledTableCell align="center">Point</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.map((problem) => (
            <StyledTableRow key={problem.title}>
              <StyledTableCell align="left">{problem.title}</StyledTableCell>
              <StyledTableCell align="center">{problem.solved}</StyledTableCell>
              <StyledTableCell align="center">{problem.level}</StyledTableCell>
              <StyledTableCell align="center">{problem.point}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SolvedTable;

const StyledTableCell = styled(TableCell)`
  color: white;
  border: none;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #1c1f3b;
  }
  &:nth-of-type(even) {
    background-color: #262b55;
  }
`;
