"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";

interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}

interface NavBodyProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

interface NavItemsProps {
    items: {
        name: string;
        link: string;
    }[];
    className?: string;
    onItemClick?: () => void;
}

interface MobileNavProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

interface MobileNavHeaderProps {
    children: React.ReactNode;
    className?: string;
}

interface MobileNavMenuProps {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const [visible, setVisible] = useState<boolean>(false);
    const [scrollYValue, setScrollYValue] = useState(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrollYValue(latest);
        setVisible(latest > 50);
    });

    const getAnimatedValue = (start: number, end: number, range: [number, number] = [0, 100]) => {
        const [min, max] = range;
        const progress = Math.min(Math.max((scrollYValue - min) / (max - min), 0), 1);
        if (scrollYValue <= min) return start;
        return start + (end - start) * progress;
    };

    return (
        <Box
            component={motion.div}
            ref={ref}
            className={className}
            sx={{
                position: 'sticky',
                top: 0,
                // top: 0, // inset 0 covers top
                zIndex: 40,
                width: '75%',
                bgcolor: 'transparent', // Was background.default, changed to transparent
                mx: 'auto', // Centering
                color: 'text.primary',
            }}
            style={{
                opacity: 1,
                transform: `translateY(${getAnimatedValue(0, 0)}px) scale(${getAnimatedValue(1, 1)})`,
            }}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(
                        child as React.ReactElement<{ visible?: boolean }>,
                        { visible },
                    )
                    : child,
            )}
        </Box>
    );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
    const { scrollY } = useScroll();
    const [scrollYValue, setScrollYValue] = useState(0);
    const theme = useTheme();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrollYValue(latest);
    });

    const getAnimatedValue = (start: any, end: any, range: [number, number] = [0, 100]) => {
        const [min, max] = range;
        const progress = Math.min(Math.max((scrollYValue - min) / (max - min), 0), 1);

        if (typeof start === 'string' && start.includes('%')) {
            const startVal = parseFloat(start);
            const endVal = parseFloat(end);
            return `${startVal + (endVal - startVal) * progress}%`;
        } else if (typeof start === 'string' && start.endsWith('rem')) {
            const startVal = parseFloat(start);
            const endVal = parseFloat(end);
            return `${startVal + (endVal - startVal) * progress}rem`;
        } else if (typeof start === 'number') {
            return start + (end - start) * progress;
        }
        return start;
    };

    const blur = getAnimatedValue(0, 10);
    const shadow = 'none';
    const width = getAnimatedValue('100%', '75%');
    const y = getAnimatedValue(0, 20);
    const borderRadius = getAnimatedValue('0.5rem', '9999px');

    const bgColor = visible
        ? alpha(theme.palette.background.paper, 0.9)
        : 'transparent';

    return (
        <Box
            component={motion.div}
            style={{
                backdropFilter: `blur(${blur}px)`,
                boxShadow: shadow,
                width,
                y,
                borderRadius,
                minWidth: 'auto',
                backgroundColor: bgColor,
            }}
            sx={{
                position: 'relative',
                zIndex: 60,
                mx: 'auto',
                display: { xs: 'none', xl: 'flex' },
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'flex-start',
                px: 2,
                py: 1,
                transition: 'all 0.3s',
                color: visible ? 'text.primary' : 'inherit', // simplified
            }}
            className={className}
        >
            {children}
        </Box>
    );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const theme = useTheme();

    return (
        <Box
            component={motion.div}
            onMouseLeave={() => setHovered(null)}
            sx={{
                position: 'absolute',
                inset: 0,
                display: { xs: 'none', xl: 'flex' },
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' },
            }}
            className={className}
        >
            {items.map((item, idx) => (
                <a
                    onMouseEnter={() => setHovered(idx)}
                    onClick={onItemClick}
                    style={{ position: 'relative', padding: '0.5rem 1rem', textDecoration: 'none', color: 'inherit' }}
                    key={`link-${idx}`}
                    href={item.link}
                >
                    {hovered === idx && (
                        <Box
                            component={motion.div}
                            layoutId="hovered"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '9999px',
                                bgcolor: alpha(theme.palette.primary.main, 0.1), // accent/50 approx
                            }}
                        />
                    )}
                    <span style={{ position: 'relative', zIndex: 20 }}>{item.name}</span>
                </a>
            ))}
        </Box>
    );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
    const theme = useTheme();
    return (
        <Box
            component={motion.div}
            animate={{
                backdropFilter: visible ? "blur(10px)" : "none",
                width: visible ? "90%" : "100%",
                paddingRight: visible ? "12px" : "0px",
                paddingLeft: visible ? "12px" : "0px",
                borderRadius: visible ? "4px" : "2rem",
                y: visible ? 20 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 50 }}
            sx={{
                position: 'relative',
                zIndex: 50,
                mx: 'auto',
                display: { xs: 'flex', xl: 'none' },
                width: '100%',
                maxWidth: 'calc(100vw - 2rem)',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1,
                transition: 'all 0.3s',
                color: visible ? 'text.primary' : 'text.primary',
            }}
            style={{
                backgroundColor: visible
                    ? alpha(theme.palette.background.default, 0.9)
                    : 'transparent',
            }}
            className={className}
        >
            {children}
        </Box>
    );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            className={className}
        >
            {children}
        </Box>
    );
};

export const MobileNavMenu = ({ children, className, isOpen, onClose }: MobileNavMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    sx={{
                        position: 'absolute',
                        left: 0, right: 0,
                        top: '4rem',
                        zIndex: 50,
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 2,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                        p: 2,
                        boxShadow: 3,
                        borderColor: 'divider',
                        borderWidth: 1,
                        borderStyle: 'solid',
                    }}
                    className={className}
                >
                    {children}
                </Box>
            )}
        </AnimatePresence>
    );
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    return isOpen ? (
        <IconX onClick={onClick} className="cursor-pointer" style={{ width: 24, height: 24 }} />
    ) : (
        <IconMenu2 onClick={onClick} className="cursor-pointer" style={{ width: 24, height: 24 }} />
    );
};

export const NavbarLogo = () => {
    return (
        <a
            href="/"
            style={{ position: 'relative', zIndex: 20, marginRight: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}
        >
            <img src="/logo.svg" alt="logo" width={30} height={30} />
            <span style={{ fontWeight: 500, color: 'text.primary' }}>Pokédex</span>
        </a>
    );
};

export const NavbarButton = ({
    href,
    as: Tag = "a",
    children,
    className,
    variant = "primary",
    ...props
}: {
    href?: string;
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "dark" | "gradient";
} & (React.ComponentPropsWithoutRef<"a"> | React.ComponentPropsWithoutRef<"button">)) => {

    // Simplistic mapping using sx. 
    // Gradient: from-[hsl(var(--accent))] to-[hsl(var(--accent-2))]
    // We assume theme.palette.primary.main is the accent.

    let sx = {};
    const baseSx = {
        px: 2, py: 1, borderRadius: 1, fontWeight: 'bold', fontSize: '0.875rem',
        position: 'relative', cursor: 'pointer', display: 'inline-block', textAlign: 'center',
        textDecoration: 'none', transition: 'all 0.2s',
        '&:hover': { transform: 'translateY(-2px)' }
    }

    if (variant === 'primary') sx = { bgcolor: 'primary.main', color: 'primary.contrastText' };
    else if (variant === 'secondary') sx = { bgcolor: 'secondary.main', color: 'secondary.contrastText' };
    else if (variant === 'dark') sx = { bgcolor: 'text.primary', color: 'background.default' };
    else if (variant === 'gradient') sx = {
        background: `linear-gradient(to right, #EE1515, #ff4d4d)`, // Approximation of accent gradient
        color: 'white',
        boxShadow: 3,
    };

    return (
        <Box
            component={Tag}
            href={href || undefined}
            sx={{ ...baseSx, ...sx }}
            className={className}
            {...props}
        >
            {children}
        </Box>
    );
};
