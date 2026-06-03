import FallbackLoading from '@/components/FallbackLoading';
import Footer from '@/components/layout/Footer';
// import TopBar from '@/components/layout/TopBar'
import Preloader from '@/components/Preloader';
import { useLayoutContext } from '@/context/useLayoutContext';
import { lazy, Suspense, useEffect } from 'react';
const VerticalNavigationBar = lazy(() => import('@/components/layout/LeftSideBar/index'));
const TopBar = lazy(() => import('@/components/layout/TopBar/index'));
const AdminLayout = ({
  children
}) => {
  const {
    changeMainMenuSize
  } = useLayoutContext();
  useEffect(() => {
    changeMainMenuSize('default');
  }, [changeMainMenuSize]);
  return <>
      <div className="wrapper" id='leftside-menu-container'>

        <Suspense fallback={<FallbackLoading />}>
          <TopBar />
        </Suspense>

        <Suspense fallback={<FallbackLoading />}>
          <VerticalNavigationBar />
        </Suspense>

        <div className="page-content">
          <div className="container-fluid">
            <Suspense fallback={<Preloader />}>{children}</Suspense>
          </div>
          <Footer />
        </div>
      </div>
    </>;
};
export default AdminLayout;