import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const location = useLocation();
  const scrollPositions = useRef({});
  const currentPath = useRef(location.pathname);
  const isTransitioning = useRef(false);

  // Continuously track the scroll position of the current page
  useEffect(() => {
    const handleScroll = () => {
      // Do not save scroll position while we are animating between pages
      if (!isTransitioning.current) {
        scrollPositions.current[currentPath.current] = window.scrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    isTransitioning.current = true;
    currentPath.current = location.pathname;
    
    const savedPosition = scrollPositions.current[location.pathname];
    
    // We use a small timeout to allow AnimatePresence to render the new component first
    const restoreScroll = () => {
      if (savedPosition !== undefined) {
        window.scrollTo(0, savedPosition);
      } else {
        window.scrollTo(0, 0);
      }
    };
    
    restoreScroll();
    
    // Attempt after a slight delay in case of exit/enter animations
    const timeoutIds = [
      setTimeout(restoreScroll, 50),
      setTimeout(restoreScroll, 100),
      setTimeout(restoreScroll, 300),
      setTimeout(restoreScroll, 500)
    ];
    
    // Re-enable scroll saving after transition completes
    const unlockTimeout = setTimeout(() => {
      isTransitioning.current = false;
    }, 600);
    
    return () => {
      timeoutIds.forEach(clearTimeout);
      clearTimeout(unlockTimeout);
    };
  }, [location.pathname]);

  return null;
}
