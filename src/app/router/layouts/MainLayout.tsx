import { Outlet } from 'react-router';

import { Titlebar } from '@/widgets/titlebar';
import { LocalErrorBoundaryProvider } from '@/shared/ui';

export const MainLayout = () => {
  return (
    <div className="bg-gradient-bg h-screen w-screen">
      <Titlebar />

      <main>
        <LocalErrorBoundaryProvider>
          <Outlet />
        </LocalErrorBoundaryProvider>
      </main>
    </div>
  );
};
