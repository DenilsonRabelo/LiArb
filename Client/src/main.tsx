import './index.css'
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import DashboardLayoutBasic from './Layout';
import Blog from './pages/Blog';
import MembersPage from './pages/Members/MembersPage';
import PostPage from './pages/Post';
const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: DashboardLayoutBasic,
        children: [
          {
            path: '/liArb-academy',
            Component: Blog,
          },
          {
            path: '/estrutura',
            Component: MembersPage,
          },
          {
            path: '/liArb-academy/post/:id',
            Component: PostPage,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);