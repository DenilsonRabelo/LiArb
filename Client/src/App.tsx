import { Outlet, useNavigate } from 'react-router';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core/AppProvider';
import {
  type Session,
} from '@toolpad/core/AppProvider';
import React, { use, useEffect } from 'react';
import {isAuthenticated, logout} from './services/login';
import logo from './assets/logo.png';
import EditIcon from '@mui/icons-material/Edit';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

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
  ...(isAuthenticated()
    ? [
        {
          kind: "divider" as const,
        },
        {
          kind: 'header' as const,
          title: 'Area Administrativa',
        },
        {
          segment: 'administrar-blog',
          title: 'ADM Blog',
          icon: <EditIcon />,
        },
        {
          segment: 'administrar-competicoes',  
          title: 'ADM Competições',
          icon: <EditCalendarIcon />,
        },
      ]
    : []),
];



export default function App() {

  const [session, setSession] = React.useState<Session | null>({});
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated()) {
      setSession({
        user: {
          name: 'LiArb',
          image: logo,
        },
      });
    }
  }, []);

  
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        navigate('/login');
      },
      signOut: () => {
        logout();
        setSession({});
        window.location.reload();
        navigate('/home');
      },
    };
  }, [navigate]);
  
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} session={session} authentication={authentication}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}