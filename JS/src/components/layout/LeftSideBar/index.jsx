import LogoBox from '@/components/LogoBox';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import React, { lazy, Suspense } from 'react';
import FallbackLoading from '@/components/FallbackLoading';
import { getMenuItems } from '@/helpers/Manu';
import { useLayoutContext } from '@/context/useLayoutContext';
import HoverMenuToggle from './components/HoverMenuToggle';
// import AppMenu from './components/AppMenu'

const AppMenu = lazy(() => import('./components/AppMenu'));
const LeftSideBar = () => {
  const menuItems = getMenuItems();
  const {
    mainMenu,
    changeMainMenuSize
  } = useLayoutContext();
  const changeMenu = () => {
    if (mainMenu.size == 'default') {
      changeMainMenuSize('condensed');
    } else if (mainMenu.size == 'full') {
      changeMainMenuSize('default');
    }
  };
  return <div className="sidenav-menu milatec-sidebar">
      <LogoBox />
      <HoverMenuToggle />
      <button onClick={changeMenu} className="sidenav-toggle-button">
        <IconifyIcon icon='ri:menu-5-line' className="fs-20" />
      </button>

      <SimplebarReactClient data-simplebar className="milatec-sidebar-scroll">
        <Suspense fallback={<FallbackLoading />}>
          <AppMenu menuItems={menuItems} />
        </Suspense>

        <div className="clearfix" />
      </SimplebarReactClient>
      <div className="milatec-sidebar-user-avatar">M</div>
    </div>;
};
export default LeftSideBar;