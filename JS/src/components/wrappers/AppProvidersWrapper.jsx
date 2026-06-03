import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { DEFAULT_PAGE_TITLE } from '@/context/constants';
import { AuthProvider } from '@/context/useAuthContext';
import { ChatProvider } from '@/context/useChatContext';
import { LayoutProvider } from '@/context/useLayoutContext';
// import { SessionProvider } from 'next-auth/react'
// const LayoutProvider = lazy(() => import('@/context/useLayoutContext'))

const AppProvidersWrapper = ({
  children
}) => {
  const handleChangeTitle = () => {
    if (document.visibilityState == 'hidden') document.title = 'Please come back 🥺';else document.title = DEFAULT_PAGE_TITLE;
  };
  useEffect(() => {
    if (document) {
      const e = document.querySelector('#__next_splash');
      if (e?.hasChildNodes()) {
        document.querySelector('#splash-screen')?.classList.add('remove');
      }
      e?.addEventListener('DOMNodeInserted', () => {
        document.querySelector('#splash-screen')?.classList.add('remove');
      });
    }
    document.addEventListener('visibilitychange', handleChangeTitle);
    return () => {
      document.removeEventListener('visibilitychange', handleChangeTitle);
    };
  }, []);
  return (
    // <SessionProvider>
    <AuthProvider>
    <LayoutProvider>
        <ChatProvider>
          {/* <TitleProvider> */}
          {/* <NotificationProvider> */}
          {children}
          <ToastContainer theme="colored" />
          {/* </NotificationProvider> */}
          {/* </TitleProvider> */}
        </ChatProvider>
      </LayoutProvider>
    </AuthProvider>
    //  </SessionProvider>
  );
};
export default AppProvidersWrapper;