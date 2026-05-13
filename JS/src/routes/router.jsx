import { appRoutes, publicRoutes } from '@/routes/index';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import { useLayoutContext } from '@/context/useLayoutContext';
import HorizontalLayout from '@/layouts/HorizontalLayout';
import OtherLayout from '@/layouts/OtherLayout';
import PrivateRoute from '@/routes/PrivateRoute';

const AppRouter = props => {
  const {
    orientation
  } = useLayoutContext();
  return <Routes>
      {publicRoutes.map((route, idx) => <Route key={idx + route.name} path={route.path} element={<OtherLayout {...props}>{route.element}</OtherLayout>} />)}

      {(appRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={ <PrivateRoute allowedRoles={route.allowedRoles}>{ orientation == 'vertical' ? <AdminLayout {...props}>{route.element}</AdminLayout> : <HorizontalLayout {...props}>{route.element}</HorizontalLayout>}</PrivateRoute>} />)}
    </Routes>;
};
export default AppRouter;