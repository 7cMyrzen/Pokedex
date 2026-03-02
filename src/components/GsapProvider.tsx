"use client";

import { ReactNode, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function GsapProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Global GSAP config
        gsap.config({
            autoSleep: 60,
            force3D: true,
            nullTargetWarn: false,
        });

        return () => {
            // Clean up ScrollTrigger instances on unmount
            ScrollTrigger.getAll().forEach(instance => instance.kill());
        };
    }, []);

    return <>{children}</>;
}
