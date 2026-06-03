import { useCallback, useEffect } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useLayoutContext } from '@/context/useLayoutContext';
// import { usePathname } from 'next/navigation'
import useViewPort from '@/hooks/useViewPort';
import { debounce } from 'lodash';
const LeftSideBarToggle = () => {
  const {
    mainMenu,
    changeMainMenuSize,
    orientation,
    horizontalMenu
  } = useLayoutContext();
  const {
    width
  } = useViewPort();
  const handleMenuSize = () => {
    if (mainMenu.size !== 'default') changeMainMenuSize('default');
  };
  const resize = useCallback(debounce(() => {
    if (mainMenu.size !== 'default') changeMainMenuSize('default');
  }, 500), [width]);
  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);
  return <>
      {orientation === 'horizontal' && <button onClick={horizontalMenu.toggle} className={` topnav-toggle-button px-2`}>
          <IconifyIcon icon='ri:menu-5-line' className="fs-24" />
        </button>}
      <button onClick={handleMenuSize} className={` sidenav-toggle-button px-2`}>
        <IconifyIcon icon='ri:menu-5-line' className="fs-24" />
      </button>
    </>;
};
export default LeftSideBarToggle;