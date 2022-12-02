import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './protectedroutes';
import { PublicRoute } from './publicroutes';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

// layouts
import DashboardLayout from './layouts/dashboard';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Honeypots from './pages/Honeypots';
import SmbAnalytics from './pages/SmbAnalytics';
import WebAnalytics from './pages/WebAnalytics';
// import IpTableAnalytics from './pages/IpTableAnalytics';
import NewBeacons from './pages/NewBeacons';
import AttackNavigator from './pages/AttackNavigator';
import AttackPath from './pages/AttackPath';
import Alert from './components/alert/Alert';
import MyDocument1 from './pages/Generatepdf';
import MyDocument2 from './pages/GenerateBeaconpdf';

import HoneytokenMap from './pages/HoneyTokenMap';
import BeaconSummary from './pages/BeaconSummary';
import NotFound from './pages/Page404';
import IpProfiling from './pages/IpProfiling';
import AttackerNmap from './pages/AttackerNmap';
import AttackerTimeline from './pages/attackerTimeline';

// ----------------------------------------------------------------------

const App = () => (
  <ThemeConfig>
    <Alert />
    <GlobalStyles />
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route element={<DashboardApp />} path="/dashboard/app" exact />
          <Route path="/dashboard/honeypots" element={<Honeypots />} exact />
          <Route path="/dashboard/beaconsummary" element={<BeaconSummary />} exact />
          <Route path="/dashboard/newbeacons" element={<NewBeacons />} exact />
          <Route path="/dashboard/attack-navigator" element={<AttackNavigator />} exact />
          <Route path="/dashboard/attack-paths" element={<AttackPath />} exact />
          <Route path="/dashboard/honeypot/smb" element={<SmbAnalytics />} exact />
          <Route path="/dashboard/ipprofiling" element={<IpProfiling />} exact />
          <Route path="/dashboard/honeypot/web" element={<WebAnalytics />} exact />
          {/* <Route path="/dashboard/honeypot/iptable" element={<IpTableAnalytics />} exact /> */}
          <Route path="/dashboard/map" element={<HoneytokenMap />} exact />
          <Route path="/dashboard/generatepdf" element={<MyDocument1 />} exact />
          <Route path="/dashboard/generateBeaconpdf" element={<MyDocument2 />} exact />
          <Route path="/dashboard/nmapscan" element={<AttackerNmap />} exact />
          <Route path="/dashboard/attacker_timeline" element={<AttackerTimeline />} exact />
        </Route>
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </ThemeConfig>
);
export default App;
