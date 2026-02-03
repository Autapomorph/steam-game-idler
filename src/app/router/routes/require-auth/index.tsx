import type { RouteObject } from 'react-router';

import { dashboardRoute } from './dashboard';
import { settingsRoute } from './settings';
import { RequireAuthLayout } from '../../layouts/RequireAuthLayout';

export const requireAuthRoute: RouteObject = {
  element: <RequireAuthLayout />,
  children: [
    {
      path: '/',
      children: [
        {
          children: [dashboardRoute, settingsRoute],
        },
      ],
    },
  ],
};
