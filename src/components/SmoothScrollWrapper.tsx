'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current || !wrapperRef.current) return;

        // Initialize ScrollSmoother
        const smoother = ScrollSmoother.create({
            smooth: 1.2,
            effects: true,
            smoothTouch: 0.1,
            wrapper: wrapperRef.current,
            content: contentRef.current,
            normalizeScroll: true,
            ignoreMobileResize: true,
        });

        return () => {
            if (smoother) {
                smoother.kill();
            }
        };
    }, []);

    return (
        <div id="smooth-wrapper" ref={wrapperRef}>
            <div id="smooth-content" ref={contentRef}>
                {children}
            </div>
        </div>
    );
}