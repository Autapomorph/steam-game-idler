import type { RouteObject } from 'react-router';

import { SettingsPage } from '@/pages/settings';
import { MainLayout } from '../../layouts/MainLayout';

export const settingsRoute: RouteObject = {
  element: <MainLayout />,
  children: [
    {
      path: '/',
      index: true,
      element: <SettingsPage />,
    },
  ],
};
