/**
 * Motion preferences utility
 * Detects user's motion preferences and device capabilities
 */

export const getMotionPreference = (): boolean => {
    if (typeof window === 'undefined') return false;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return !mediaQuery.matches;
};

export const isMobileDevice = (): boolean => {
    if (typeof window === 'undefined') return false;

    return window.innerWidth < 768;
};

export const getAnimationConfig = () => {
    const shouldAnimate = getMotionPreference();
    const isMobile = isMobileDevice();

    return {
        shouldAnimate,
        isMobile,
        // Reduce animation distances on mobile
        distanceMultiplier: isMobile ? 0.5 : 1,
        // Reduce stagger delays on mobile
        staggerMultiplier: isMobile ? 0.7 : 1,
        // Disable parallax on mobile
        enableParallax: !isMobile && shouldAnimate,
    };
};
