import * as React from 'react';
import { Outlet } from 'react-router';
import { DashboardLayout, SidebarFooterProps } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import logo from '../assets/logo.png';
import { Typography } from '@mui/material';
import {
  type Session,
} from '@toolpad/core/AppProvider';



export default function Layout() {

  function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
      <Typography
        variant="caption"
        sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        {mini ? '© LiArb' : `© ${new Date().getFullYear()} feito por LiArb`}
      </Typography>
    );
  }


  return (
    <DashboardLayout defaultSidebarCollapsed sidebarExpandedWidth={350}  branding={{
      logo: <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt='LiArb' />
      </div>,
      title: 'LiArb',
      homeUrl: '/',
    }
    }
      slots={{ sidebarFooter: SidebarFooter}}
    >
    
      <PageContainer breadcrumbs={[]} title="">
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}

