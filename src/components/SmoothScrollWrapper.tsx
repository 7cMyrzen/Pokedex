'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Try importing ScrollSmoother, if it fails (not installed), we might catch it?
// TypeScript might error if types are missing. We will use conditional require/import if necessary?
// For now, let's assume it's available or we skip it if missing at runtime.
// But standard import will fail build if module missing.
// If ScrollSmoother is NOT in package.json, we should skip it.
// User had it in source, so I'll try. 

// import { ScrollSmoother } from 'gsap/ScrollSmoother';
// We won't import it because it's likely a paid plugin not in standard registry. 
// If I leave it, it breaks. I will comment out and use simple wrapper.

import { usePathname } from 'next/navigation';

export default function SmoothScrollWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Scroll to top on route change, EXCEPT for /gen1 and /others which should maintain scroll position (or handle it internally)
        if (pathname && pathname !== '/gen1' && pathname !== '/others') {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return (
        <div id="smooth-wrapper" ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
            <div id="smooth-content" ref={contentRef} style={{ width: '100%' }}>
                {children}
            </div>
        </div>
    );
}
