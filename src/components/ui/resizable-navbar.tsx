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

    // Suivi du défilement pour les animations
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrollYValue(latest);
        setVisible(latest > 50);
    });

    // Fonction pour calculer les valeurs d'animation en fonction du défilement
    const getAnimatedValue = (start: number, end: number, range: [number, number] = [0, 100]) => {
        const [min, max] = range;
        const progress = Math.min(Math.max((scrollYValue - min) / (max - min), 0), 1);
        // Toujours retourner au moins la valeur de départ pour éviter de disparaître complètement
        if (scrollYValue <= min) return start;
        return start + (end - start) * progress;
    };

    return (
        <motion.div
            ref={ref}
            className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}
            style={{
                opacity: 1, // Toujours visible
                transform: `translateY(${getAnimatedValue(0, 0)}px) scale(${getAnimatedValue(1, 1)})`,
                position: 'sticky',
                top: 0,
                backgroundColor: 'var(--background)'
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
        </motion.div>
    );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
    const { scrollY } = useScroll();
    const [scrollYValue, setScrollYValue] = useState(0);

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
    const shadow = visible
        ? '0 0 24px rgba(34, 42, 53, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.08)'
        : 'none';
    const width = getAnimatedValue('100%', '40%');
    const y = getAnimatedValue(0, 20);
    const borderRadius = getAnimatedValue('0.5rem', '9999px');

    return (
        <motion.div
            style={{
                backdropFilter: `blur(${blur}px)`,
                boxShadow: shadow,
                width,
                y,
                borderRadius,
                minWidth: '800px',
            }}
            className={cn(
                "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex",
                "transition-all duration-300",
                {
                    'bg-white/90 text-neutral-900': visible,
                    'dark:bg-transparent dark:text-white': true
                },
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <motion.div
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground lg:flex lg:space-x-2",
                className,
            )}
        >
            {items.map((item, idx) => (
                <a
                    onMouseEnter={() => setHovered(idx)}
                    onClick={onItemClick}
                    className="relative px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
                    key={`link-${idx}`}
                    href={item.link}
                >
                    {hovered === idx && (
                        <motion.div
                            layoutId="hovered"
                            className="absolute inset-0 h-full w-full rounded-full bg-accent/50"
                        />
                    )}
                    <span className="relative z-20">{item.name}</span>
                </a>
            ))}
        </motion.div>
    );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(10px)" : "none",
                boxShadow: visible
                    ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                    : "none",
                width: visible ? "90%" : "100%",
                paddingRight: visible ? "12px" : "0px",
                paddingLeft: visible ? "12px" : "0px",
                borderRadius: visible ? "4px" : "2rem",
                y: visible ? 20 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
            }}
            className={cn(
                "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-0 py-2 transition-all duration-300 lg:hidden",
                visible
                    ? "text-neutral-900 dark:text-white"
                    : "text-foreground",
                className,
            )}
            style={{
                backgroundColor: visible
                    ? 'rgba(var(--background), 0.9)'
                    : 'transparent',
                backdropFilter: visible ? 'blur(10px)' : 'none',
                WebkitBackdropFilter: visible ? 'blur(10px)' : 'none',
            }}
        >
            {children}
        </motion.div>
    );
};

export const MobileNavHeader = ({
    children,
    className,
}: MobileNavHeaderProps) => {
    return (
        <div
            className={cn(
                "flex w-full flex-row items-center justify-between",
                className,
            )}
        >
            {children}
        </div>
    );
};

export const MobileNavMenu = ({
    children,
    className,
    isOpen,
    onClose,
}: MobileNavMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-background px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:shadow-[0_0_24px_rgba(0,_0,_0,_0.3)] border border-border/30",
                        className,
                    )}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const MobileNavToggle = ({
    isOpen,
    onClick,
}: {
    isOpen: boolean;
    onClick: () => void;
}) => {
    return isOpen ? (
        <IconX
            onClick={onClick}
            className="text-foreground"
        />
    ) : (
        <IconMenu2
            onClick={onClick}
            className="text-foreground"
        />
    );
};

export const NavbarLogo = () => {
    return (
        <a
            href="/"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
        >
            <img
                src="/logo.svg"
                alt="logo"
                width={30}
                height={30}
            />
            <span className="font-medium text-foreground">Pokédex</span>
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
} & (
        | React.ComponentPropsWithoutRef<"a">
        | React.ComponentPropsWithoutRef<"button">
    )) => {
    const baseStyles =
        "px-4 py-2 rounded-md button text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

    const variantStyles = {
        primary:
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        dark: "bg-foreground text-background hover:bg-foreground/90",
        gradient:
            "bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent-2))] text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:translate-y-[-2px]",
    };

    return (
        <Tag
            href={href || undefined}
            className={cn(baseStyles, variantStyles[variant], className)}
            {...props}
        >
            {children}
        </Tag>
    );
};
