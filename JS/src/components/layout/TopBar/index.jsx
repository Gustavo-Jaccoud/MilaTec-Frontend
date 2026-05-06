import LogoBox from '@/components/LogoBox';
import LeftSideBarToggle from './components/LeftSideBarToggle';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TopBar = () => {
  const navbarRef = useRef(null);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (navbarRef.current) navbarRef.current.classList.toggle('topbar-active', window.scrollY > 100);
    });
  }, []);
  let location = useLocation();
  const [title, setTitle] = useState('Welcome');
  useEffect(() => {
    setTitle(document.title.split("|")[0]);
  }, [title, location]);
  return <>
      <header ref={navbarRef} className={`app-topbar `} id="header">
        <div className="page-container topbar-menu">
          <div className="d-flex align-items-center gap-2">
            <LogoBox />
            <LeftSideBarToggle />


            <div className="topbar-item d-none d-md-flex px-2">
              <div>
                <h4 className="page-title fs-20 fw-semibold mb-0">{title}</h4>
              </div>
            </div>
          </div>
        </div>
      </header>

    </>;
};
export default TopBar;
