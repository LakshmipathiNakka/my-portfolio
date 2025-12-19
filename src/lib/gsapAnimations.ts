/**
 * GSAP Animation Configurations
 * Centralized easing curves, durations, and reusable animation functions
 */

import gsap from 'gsap';

// Easing curves
export const easings = {
    smooth: 'power2.out',
    expo: 'expo.out',
    elastic: 'elastic.out(1, 0.5)',
    back: 'back.out(1.4)',
} as const;

// Duration constants (in seconds)
export const durations = {
    fast: 0.4,
    medium: 0.6,
    slow: 0.8,
    verySlow: 1.2,
} as const;

// Stagger delays
export const staggers = {
    tight: 0.05,
    normal: 0.1,
    relaxed: 0.15,
    loose: 0.2,
} as const;

/**
 * Fade and slide up animation
 */
export const fadeSlideUp = (
    element: gsap.TweenTarget,
    options: {
        distance?: number;
        duration?: number;
        delay?: number;
        ease?: string;
    } = {}
) => {
    const {
        distance = 60,
        duration = durations.medium,
        delay = 0,
        ease = easings.smooth,
    } = options;

    return gsap.fromTo(
        element,
        {
            opacity: 0,
            y: distance,
        },
        {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease,
        }
    );
};

/**
 * Fade and slide from left animation
 */
export const fadeSlideLeft = (
    element: gsap.TweenTarget,
    options: {
        distance?: number;
        duration?: number;
        delay?: number;
        ease?: string;
    } = {}
) => {
    const {
        distance = 60,
        duration = durations.slow,
        delay = 0,
        ease = easings.expo,
    } = options;

    return gsap.fromTo(
        element,
        {
            opacity: 0,
            x: -distance,
        },
        {
            opacity: 1,
            x: 0,
            duration,
            delay,
            ease,
        }
    );
};

/**
 * Simple fade in animation
 */
export const fadeIn = (
    element: gsap.TweenTarget,
    options: {
        duration?: number;
        delay?: number;
        ease?: string;
    } = {}
) => {
    const {
        duration = durations.medium,
        delay = 0,
        ease = easings.smooth,
    } = options;

    return gsap.fromTo(
        element,
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration,
            delay,
            ease,
        }
    );
};

/**
 * Parallax scroll animation
 */
export const parallaxScroll = (
    element: gsap.TweenTarget,
    options: {
        distance?: number;
        scrub?: number | boolean;
    } = {}
) => {
    const {
        distance = 100,
        scrub = 1,
    } = options;

    return {
        y: distance,
        ease: 'none',
        scrollTrigger: {
            scrub,
        },
    };
};
