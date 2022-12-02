import { combineReducers } from 'redux';

import { DASHBOARDREDUCER } from './dashboard';
import { HONEYPOTREDUCER } from './honeypot';
import { MAPREDUCER } from './map';
import { BEACONSUMMARYREDUCER } from './beaconsummary';
import { NEWBEACONREDUCER } from './newbeacon';
import { SMBANALYTICSREDUCER } from './smbanalytics';
import { IPPROFILINGREDUCER } from './ipprofiling';
import { IPTABLEREDUCER } from './iptable';
import { WEBREDUCER } from './web';
import { AUTHREDUCER } from './auth';
import { ALERTSREDUCER } from './alert';
import { ATTACKERINFOREDUCER } from './attackerInfo';
import { ATTACKERTOKENREDUCER } from './attackerTokenInfo';
import { MITREREDUCER } from './mitre';

export default combineReducers({
  AUTHREDUCER,
  DASHBOARDREDUCER,
  HONEYPOTREDUCER,
  NEWBEACONREDUCER,
  BEACONSUMMARYREDUCER,
  SMBANALYTICSREDUCER,
  IPPROFILINGREDUCER,
  WEBREDUCER,
  IPTABLEREDUCER,
  ALERTSREDUCER,
  MAPREDUCER,
  ATTACKERINFOREDUCER,
  ATTACKERTOKENREDUCER,
  MITREREDUCER
});
