import './index.css'
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import DashboardLayoutBasic from './Layout';
import Blog from './pages/Blog';
import MembersPage from './pages/Members/MembersPage';
import PostPage from './pages/Post';
import login from './pages/Login/inde';
import Home from './pages/Home';
import BlogAdminPage from './pages/Adm/Blog';
import BlogAdminCreatPost from './pages/Adm/Blog/createPost';
import { SnackbarProvider } from "notistack";
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
          {
            path: '/login',
            Component: login,
          },
          {
            path: '/home',
            Component: Home,
          },
          {
            path: '/administrar-blog',
            Component: BlogAdminPage,
          },
          {
            path: '/adm/blog/cadastrar',
            Component: BlogAdminCreatPost,
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3} 
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>,
);