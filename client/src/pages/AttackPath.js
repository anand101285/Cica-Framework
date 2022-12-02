import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// material
import { Container, Card, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// components
import Page from '../components/Page';

import AttackPaths from '../components/mitre/attackPaths';
import Loader from '../components/Loader';
import { GET_ATTACK_PATHS, GET_FILTERED_ATTACK_PATHS } from 'src/redux/actions/mitre';

// ----------------------------------------------------------------------

const AttackPath = (props) => {
  const {
    getAttackPaths,
    getFilteredAttackPath,
    allAttackPaths,
    filteredAttackPaths,
    realAttackPaths,
    loader
  } = props;

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [attackPathData, setAttackPathData] = useState({});

  const formatDate = (current) => {
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    return date;
  };

  const handleDateChange = (date) => {
    let formattedDate = {
      startDate: date && date[0] !== null ? formatDate(date[0]) : null,
      endDate: date && date[1] !== null ? formatDate(date[1]) : null
    };
    setDateRange(date);
    if (formattedDate && formattedDate[0] !== null && formattedDate[1] !== null) {
      getFilteredAttackPath({
        realAttackPaths,
        date: formattedDate
      });
    }
  };

  useEffect(() => {
    getAttackPaths();
  }, []);

  useEffect(() => {
    if (dateRange && dateRange[0] !== null && dateRange[1] !== null) {
      setAttackPathData(filteredAttackPaths);
    } else {
      setAttackPathData(allAttackPaths);
    }
  }, [dateRange, filteredAttackPaths, allAttackPaths, setAttackPathData]);
  return (
    <Page title="Dashboard: Attacks Path">
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Attacks Path
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" sx={{ mb: 5, mr: 3 }}>
              Filter
            </Typography>
            <DatePicker
              className="blue-input"
              placeholderText="Date Range"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                handleDateChange(update);
              }}
              isClearable={true}
            />
          </div>
        </div>
        {loader === true ? (
          <Loader />
        ) : attackPathData && attackPathData.nodes && attackPathData.nodes.length > 0 ? (
          <AttackPaths allAttackPaths={attackPathData} />
        ) : (
          <Card className="cs-card">
            <Typography sx={{ m: 5 }} variant="h5" align="center">
              ---------- Nothing to Show ---------
              <Typography align="center">
                ---------- Remove Filter To See All Results ---------
              </Typography>
            </Typography>
          </Card>
        )}
      </Container>
    </Page>
  );
};

AttackPath.propTypes = {
  getAttackPaths: PropTypes.func.isRequired,
  getFilteredAttackPath: PropTypes.func.isRequired,
  allAttackPaths: PropTypes.object,
  filteredAttackPaths: PropTypes.object,
  realAttackPaths: PropTypes.array,
  loader: PropTypes.bool
};

const mapStateToProps = (state) => ({
  allAttackPaths: state.MITREREDUCER.allAttackPaths,
  filteredAttackPaths: state.MITREREDUCER.filteredAttackPaths,
  realAttackPaths: state.MITREREDUCER.realAttackPaths,
  loader: state.MITREREDUCER.loader
});

const mapDispatchToProps = (dispatch) => ({
  getAttackPaths: bindActionCreators(GET_ATTACK_PATHS, dispatch),
  getFilteredAttackPath: bindActionCreators(GET_FILTERED_ATTACK_PATHS, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AttackPath);
