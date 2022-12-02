import React from 'react';
import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import deviceAnalytics from '@iconify/icons-eva/inbox-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import navigation2Outline from '@iconify/icons-eva/navigation-2-outline';
import { HoneytokenIcon, ScanIcon, MapIcon, IpProfilingIcon, ApiIcon } from '../../icons/icons';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'honeypots',
    path: '/dashboard/honeypots',
    icon: getIcon(deviceAnalytics)
  },
  {
    title: 'IP Profiling',
    path: '/dashboard/ipprofiling',
    icon: getIcon(IpProfilingIcon)
  },
  {
    title: 'Beacon Summary',
    path: '/dashboard/beaconsummary',
    icon: getIcon(peopleFill)
  },
  {
    title: 'New Beacons ',
    path: '/dashboard/newbeacons',
    icon: getIcon(HoneytokenIcon)
  },
  {
    title: 'Attack Navigator',
    path: '/dashboard/attack-navigator',
    icon: getIcon(navigation2Outline)
  },
  {
    title: 'Attack Path',
    path: '/dashboard/attack-paths',
    icon: getIcon(ApiIcon)
  },
  {
    title: 'Maps',
    path: '/dashboard/map',
    icon: getIcon(MapIcon)
  },
  {
    title: 'Recent Nmap Scan',
    path: '/dashboard/nmapscan',
    icon: getIcon(ScanIcon)
  }
];

export default sidebarConfig;
