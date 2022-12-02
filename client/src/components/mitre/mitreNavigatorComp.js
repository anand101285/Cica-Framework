import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Card,
  Tooltip,
  TableContainer,
  Table,
  // TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Zoom
} from '@mui/material';
import CustomizedTreeView from './treeView';
import GenerateHoneytoken from './tokenGenerator';
import { getMitrePathToken, honeytokens } from 'src/docs/honeytokenDocs';

const MitreNavigatorComp = ({ mitreNavigator }) => {
  const [open, setOpen] = useState(false);
  const [tech, setTech] = useState({});

  const handleOpen = (technique, tactic) => {
    setOpen(true);
    const tokens = getMitrePathToken(technique.detection);
    setTech({ technique, tokens, tactic });
  };
  const handleClose = () => {
    setOpen(false);
    setTech({});
  };
  return (
    <>
      <GenerateHoneytoken
        open={open}
        handleClose={handleClose}
        tech={tech}
        honeytokens={tech.tokens ? tech.tokens : honeytokens}
      />

      <Grid container spacing={4} style={{ marginTop: '10px' }}>
        <Grid item sm={12} lg={12}>
          <Card className="cs-card" style={{ padding: '2%' }}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table" size="small">
                <TableBody>
                  <TableRow>
                    {mitreNavigator &&
                      mitreNavigator.map((tactic, index) => (
                        <TableCell
                          align="center"
                          variant="head"
                          key={index}
                          sx={{
                            verticalAlign: 'top'
                          }}>
                          <Tooltip
                            title={tactic?._id}
                            TransitionComponent={Zoom}
                            placement="top"
                            arrow>
                            <div style={{ background: '#1d2835f2', opacity: 0.7, height: '70px' }}>
                              {tactic?.name}
                            </div>
                          </Tooltip>
                          <hr />
                          <table>
                            <tbody>
                              {tactic?.child?.map((technique, i) => (
                                <tr key={i}>
                                  <td size="small" align="center">
                                    <div
                                      style={{
                                        minHeight: '100px',
                                        alignSelf: 'center'
                                      }}>
                                      <CustomizedTreeView
                                        tactic={tactic?._id}
                                        treeData={technique}
                                        honeyTokenData={tactic?.mapped_tokens}
                                        handleOpen={handleOpen}
                                      />
                                    </div>
                                    <hr />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </TableCell>
                      ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

MitreNavigatorComp.propTypes = {
  mitreNavigator: PropTypes.array
};

export default MitreNavigatorComp;
