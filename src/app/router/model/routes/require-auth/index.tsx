import type { RouteObject } from 'react-router';

import { RequireAuthLayout } from '@/shared/ui';
import { dashboardRoute } from './dashboard';
import { settingsRoute } from './settings';

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
