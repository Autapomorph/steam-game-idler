import { Navigate, Outlet } from 'react-router';

import { useUserStore } from '@/entities/user';
import { FullScreenLoader } from '@/shared/ui';

export const UnauthenticatedLayout = () => {
  const userSummary = useUserStore(s => s.userSummary);
  const isLoading = useUserStore(s => s.isLoading);

  if (userSummary) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />
      {isLoading && <FullScreenLoader />}
    </>
  );
};
