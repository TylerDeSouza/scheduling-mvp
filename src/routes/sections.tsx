import type { RouteObject } from 'react-router';

import { Outlet, Navigate } from 'react-router-dom';

import BlogPage        from 'src/pages/blog';
import UserPage        from 'src/pages/user';
import { AuthLayout } from 'src/layouts/auth';
import SignInPage      from 'src/pages/sign-in';
import ProductsPage    from 'src/pages/products';
import DashboardPage   from 'src/pages/dashboard';
import Page404         from 'src/pages/page-not-found';
import { DashboardLayout } from 'src/layouts/dashboard';
import AgentDashboard  from 'src/pages/dashboard-agent';
import AdminDashboard  from 'src/pages/dashboard-admin';
import ClientDashboard from 'src/pages/dashboard-client';

import ProtectedRoute from './components/ProtectedRoute';

export const routesSection: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      // optional: redirect /dashboard → /dashboard/client
      { path: 'dashboard', element: <Navigate to="dashboard/client" replace /> },

      // role‑specific dashboards
      { path: 'dashboard/client', element: <ClientDashboard /> },
      { path: 'dashboard/agent',  element: <AgentDashboard /> },
      { path: 'dashboard/admin',  element: <AdminDashboard /> },

      // legacy generic dashboard (if you still need it)
      { path: '', element: <DashboardPage /> },

      // other protected pages
      { path: 'blog',     element: <BlogPage />     },
      { path: 'user',     element: <UserPage />     },
      { path: 'products', element: <ProductsPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  { path: '404', element: <Page404 /> },
  { path: '*',   element: <Page404 /> },
];