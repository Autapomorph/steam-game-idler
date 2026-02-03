import { Outlet } from 'react-router';

import { Titlebar } from '../titlebar/Titlebar';
import { ErrorBoundaryProvider } from '../providers/ErrorBoundaryProvider';

export const MainLayout = () => {
  return (
    <ErrorBoundaryProvider>
      <div className="bg-gradient-bg h-screen w-screen">
        <Titlebar />

        <main>
          <Outlet />
        </main>
      </div>
    </ErrorBoundaryProvider>
  );
};
