import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// material
import { Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';

import { GET_MITRE_NAVIGATOR } from 'src/redux/actions/mitre';
import MitreNavigatorComp from '../components/mitre/mitreNavigatorComp';
import Loader from '../components/Loader';

// ----------------------------------------------------------------------

const AttackNavigator = (props) => {
  const { getMitreNavigator, mitreNavigatorData, loader } = props;
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getMitreNavigator().then(() => {
      setisLoading(false);
    });
  }, [getMitreNavigator]);
  return (
    <Page title="Dashboard: Attack Path Navigator">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Attack Path Navigator
        </Typography>
        {isLoading === true ? (
          <Loader />
        ) : loader === true ? (
          <Loader />
        ) : (
          <MitreNavigatorComp mitreNavigator={mitreNavigatorData} />
        )}
      </Container>
    </Page>
  );
};

AttackNavigator.propTypes = {
  getMitreNavigator: PropTypes.func.isRequired,
  mitreNavigatorData: PropTypes.array,
  loader: PropTypes.bool
};

const mapStateToProps = (state) => ({
  mitreNavigatorData: state.MITREREDUCER.mitreNavigator,
  loader: state.MITREREDUCER.loader
});

const mapDispatchToProps = (dispatch) => ({
  getMitreNavigator: bindActionCreators(GET_MITRE_NAVIGATOR, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AttackNavigator);
