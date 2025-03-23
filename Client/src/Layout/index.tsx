import * as React from 'react';
import { Outlet } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import logo from '../assets/logo.png';




export default function Layout() {

  
  return (
    
    <DashboardLayout defaultSidebarCollapsed sidebarExpandedWidth={200} branding={{
      logo: <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt='LiArb' />
      </div>,
      title: 'LiArb',
      homeUrl: '/',
    }}>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}

