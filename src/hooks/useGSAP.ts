/**
 * Custom GSAP hook with automatic cleanup and motion preferences
 */

import { useGSAP as useGSAPOriginal } from '@gsap/react';
import { useEffect, useRef } from 'react';
import { getMotionPreference } from '@/lib/motionPreferences';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Enhanced useGSAP hook with automatic cleanup and motion preferences
 */
export const useGSAPWithCleanup = (
    callback: (context: gsap.Context) => void | (() => void),
    dependencies: any[] = []
) => {
    const shouldAnimate = useRef(getMotionPreference());

    useGSAPOriginal(
        () => {
            if (!shouldAnimate.current) {
                return;
            }

            return callback;
        },
        { dependencies }
    );

    // Cleanup ScrollTriggers on unmount
    useEffect(() => {
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return shouldAnimate.current;
};
