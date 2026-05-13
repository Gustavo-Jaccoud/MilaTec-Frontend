import { appRoutes, publicRoutes } from '@/routes/index';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import { useLayoutContext } from '@/context/useLayoutContext';
import HorizontalLayout from '@/layouts/HorizontalLayout';
import OtherLayout from '@/layouts/OtherLayout';
import { RedirectIfAuthenticated, RequireAuth } from '@/routes/guards';

const wrapPublicElement = (route, props) => {
  const element = <OtherLayout {...props}>{route.element}</OtherLayout>;

  if (route.redirectIfAuthenticated) {
    return <RedirectIfAuthenticated>{element}</RedirectIfAuthenticated>;
  }

  return element;
};

const AppRouter = props => {
  const {
    orientation
  } = useLayoutContext();
  return <Routes>
      {publicRoutes.map((route, idx) => <Route key={idx + route.name} path={route.path} element={wrapPublicElement(route, props)} />)}

      {(appRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={<RequireAuth>{orientation == 'vertical' ? <AdminLayout {...props}>{route.element}</AdminLayout> : <HorizontalLayout {...props}>{route.element}</HorizontalLayout>}</RequireAuth>} />)}
    </Routes>;
};
export default AppRouter;