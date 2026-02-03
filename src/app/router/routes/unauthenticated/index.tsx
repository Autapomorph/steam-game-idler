import { type RouteObject } from 'react-router';

import { SignInPage } from '@/pages/auth/sign-in';
import { UnauthenticatedLayout } from '../../layouts/UnauthenticatedLayout';

export const unauthenticatedRoute: RouteObject = {
  element: <UnauthenticatedLayout />,
  children: [
    {
      path: '/signin',
      element: <SignInPage />,
    },
  ],
};
