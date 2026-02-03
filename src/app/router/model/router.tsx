import { createBrowserRouter } from 'react-router';

import { MainLayout } from '@/shared/ui';
import { notFoundRoute } from './routes/not-found';
import { requireAuthRoute } from './routes/require-auth';
import { unauthenticatedRoute } from './routes/unauthenticated';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [unauthenticatedRoute, requireAuthRoute, notFoundRoute],
  },
]);
