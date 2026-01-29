import { useEffect, useState } from 'react';

export function useScreen() {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    // cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isMobile: width <= 480,
    isTablet: width > 480 && width <= 860,
    isDesktop: width > 860,
  };
}
