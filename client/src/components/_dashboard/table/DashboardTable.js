import Flag from 'react-world-flags';
import propTypes from 'prop-types';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// ----------------------------------------------------------------------

const DashboardTable = ({ Tabledata }) => {
  const flag = ['CN', 'RU', 'IN', 'US', 'PK', 'IL'];

  return (
    <Box sx={{ p: 2 }} className="cs-card">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead style={{ background: '#1d2835f2' }}>
            <TableRow>
              <TableCell />
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Count</TableCell>
              <TableCell align="center">Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Tabledata.length !== 0 &&
              Tabledata.map((data, i) => (
                <TableRow key={data.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">
                    <Flag code={flag[i]} height={30} />
                  </TableCell>
                  <TableCell align="center">{data.key}</TableCell>
                  <TableCell align="center">{data.doc_count}</TableCell>
                  <TableCell align="center">{data.percentage}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

DashboardTable.propTypes = {
  Tabledata: propTypes.array
};

export default DashboardTable;
