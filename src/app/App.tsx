import { RouterProvider } from 'react-router';

import { useAppInit } from './init';
import { Providers } from './providers';
import { HeadData } from './meta';
import { router } from './router';

import './styles/globals.css';

export const App = () => {
  useAppInit();

  return (
    <Providers>
      <HeadData />
      <RouterProvider router={router} />
    </Providers>
  );
};
