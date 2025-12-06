"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    contentClassName?: string;
}

export function Modal({ open, onClose, title, children, className, contentClassName }: ModalProps) {
    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    // Lock page scroll while the modal is open (mobile-friendly)
    useEffect(() => {
        if (!open) return;
        if (typeof document === "undefined") return;
        const body = document.body;
        const prev = body.style.overflow;
        body.style.overflow = "hidden";
        return () => {
            body.style.overflow = prev || "";
        };
    }, [open]);

    if (!open || typeof document === "undefined") return null;

    const modal = (
        <div className={cn("fixed inset-0 z-50", className)} aria-modal="true" role="dialog">
            <div
                className="absolute inset-0 bg-background/60 backdrop-blur-sm"
                onClick={onClose}
                onWheel={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
            />
            <div className="relative z-10 flex min-h-full items-end sm:items-center justify-center p-2 sm:p-4">
                <div
                    className={cn(
                        "w-full sm:w-[420px] max-h-[80vh] sm:max-h-[70vh] overflow-y-auto",
                        "rounded-t-2xl sm:rounded-2xl border border-border/30 bg-background shadow-lg",
                        "p-4 sm:p-5",
                        contentClassName
                    )}
                    style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {title ? (
                        <div className="mb-3 flex items-center justify-between">
                            <div className="text-base sm:text-lg font-semibold text-foreground">{title}</div>
                            <button
                                type="button"
                                aria-label="Fermer"
                                onClick={onClose}
                                className="rounded-full p-2 text-foreground/70 hover:text-foreground hover:bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    ) : null}
                    {children}
                </div>
            </div>
        </div>
    );

    return createPortal(modal, document.body);
}
