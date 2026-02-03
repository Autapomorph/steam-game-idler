import { Outlet } from 'react-router';

import { Titlebar } from '@/widgets/titlebar';
import { ErrorBoundaryProvider } from '@/shared/ui';

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
