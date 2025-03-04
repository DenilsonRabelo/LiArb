import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { AppProvider, Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Box } from '@mui/material';
import ResponsiveGrid from '../../src/pages/Blog/index';
import logo from '../assets/logo.png';


const NAVIGATION: Navigation = [
  {
    segment: 'home',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'liga',
    title: 'Liga',
    icon: <HistoryEduIcon />,
  },
  {
    segment: 'estrutura',
    title: 'Estrutura',
    icon: <GroupIcon />,
  },
  {
    segment: 'competicoes',
    title: 'Competições',
    icon: <MilitaryTechIcon />,
  },
  {
    segment: 'liArb-academy',
    title: 'LiArb academy',
    icon: <SchoolIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


export default function DashboardLayoutBasic(props: any) {
  const [pathname, setPathname] = React.useState('/');

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (url: string | URL) => setPathname(String(url))
  }), [pathname]);

  interface DemoProps {
    window?: () => Window;
  }

  const { window } = props;

  const demoWindow = window !== undefined ? window() : undefined;


  const selectComponent = (path: any) => {
    switch (path) {
      case '/liArb-academy':
        return <ResponsiveGrid/>;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt='LiArb' />
        </div>,
        title: 'LiArb',
        homeUrl: '/',
      }}
    >
      <DashboardLayout defaultSidebarCollapsed sidebarExpandedWidth={200}>
        <Box style={{margin: 10}}>
          {selectComponent(pathname)}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}