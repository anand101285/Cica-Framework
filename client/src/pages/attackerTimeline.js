import React, { useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Typography from '@mui/material/Typography';
import {
  MacroExcelIcon,
  LibreIcon,
  LinuxIcon,
  AwsIcon,
  KubernetesIcon,
  MswordIcon,
  MsExcelIcon,
  GifIcon,
  HtmlIcon,
  HostIcon,
  DnsIcon,
  RegistryIcon,
  CmdIcon,
  ApiIcon
} from '../icons/icons';
import { Card, CardHeader, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';
import animationbeacons from '../components/_dashboard/animation/compromisedbeacon.json';
import Lottie from 'lottie-react';
import { GET_ALL_ATTACKER_TOKEN } from '../redux/actions/attackerTokenInfo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

function getIcon(type) {
  switch (type) {
    case 'worddoc':
      return LibreIcon;
    case 'excel_vba':
      return MacroExcelIcon;
    case 'linux_bashrc':
      return LinuxIcon;
    case 'mysql_master':
      return 'logos:mysql';
    case 'aws_keys':
      return AwsIcon;
    case 'kubeconfig':
      return KubernetesIcon;
    case 'word':
      return MswordIcon;
    case 'excel':
      return MsExcelIcon;
    case 'web_gif':
      return GifIcon;
    case 'content_without_source':
      return HtmlIcon;
    case 'hostFile':
      return HostIcon;
    case 'dnsToken':
      return DnsIcon;
    case 'registry_process':
      return RegistryIcon;
    case 'windows_batch':
      return CmdIcon;
    case 'fakeApi':
      return ApiIcon;
    default:
      return LibreIcon;
  }
}

const getProperDate = (date) => {
  const arr = date.split('T');
  const arr2 = arr && arr[1].split('.');
  return `${arr[0]} ${arr2[0]}`;
};

const AttackerTimeline = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      props.GET_ALL_ATTACKER_TOKEN(location.state.ip);
    }
  }, [location.state, props]);
  return (
    <>
      <Button
        size="large"
        sx={{ mb: 3 }}
        className="blue-button"
        variant="outlined"
        onClick={() => {
          navigate(`/dashboard/beaconsummary`);
        }}>
        Go Back
      </Button>
      <br />
      <Card className="cs-card">
        <CardHeader title="Attacker Timeline" />
        <br />
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineOppositeContent align="right" color="text.secondary"></TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '50px' }} />

              <Lottie animationData={animationbeacons} style={{ height: 150, width: 150 }} />
              <Typography variant="h5">{props.ip}</Typography>

              <TimelineConnector sx={{ height: '30px' }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2, m: 'auto 0' }}></TimelineContent>
          </TimelineItem>
          {props.tokenInfo &&
            props.tokenInfo.map((timelinedata, key) => {
              return (
                <div key={key}>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{
                        m: 'auto 0',
                        border: '2px solid rgb(143, 202, 204)',
                        borderLeft: '0px',
                        borderRight: '0px'
                      }}
                      align="right"
                      color="text.secondary">
                      {getProperDate(timelinedata.attacker_tokens[0].created_at)}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector sx={{ height: '30px' }} />

                      <Icon
                        icon={getIcon(timelinedata.attacker_type_tokens[0].type)}
                        width={40}
                        height={40}
                        color="white"
                      />

                      <TimelineConnector sx={{ height: '30px' }} />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2, m: 'auto 0' }}>
                      <Typography variant="h6" component="span">
                        {timelinedata.attacker_type_tokens[0].type}
                      </Typography>
                      <Typography>Token accessed by attacker</Typography>
                    </TimelineContent>
                  </TimelineItem>
                </div>
              );
            })}
        </Timeline>
      </Card>
    </>
  );
};

AttackerTimeline.propTypes = {
  GET_ALL_ATTACKER_TOKEN: PropTypes.func.isRequired,
  ip: PropTypes.string,
  tokenInfo: PropTypes.array
};

const mapStateToProps = (state) => ({
  ip: state.ATTACKERTOKENREDUCER.ip,
  tokenInfo: state.ATTACKERTOKENREDUCER.tokenInfo
});

const mapDispatchToProps = (dispatch) => ({
  GET_ALL_ATTACKER_TOKEN: bindActionCreators(GET_ALL_ATTACKER_TOKEN, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AttackerTimeline);
