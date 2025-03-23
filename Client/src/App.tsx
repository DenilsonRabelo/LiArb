import { Outlet } from 'react-router';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core/AppProvider';

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



export default function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} >
      <Outlet />
    </ReactRouterAppProvider>
  );
}