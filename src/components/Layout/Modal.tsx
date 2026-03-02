"use client";

import { ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    children?: ReactNode;
    className?: string; // Kept for compatibility
    contentClassName?: string; // Kept for compatibility
}

export function Modal({ open, onClose, title, children }: ModalProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 4, p: 1 }
            }}
        >
            <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                {title && <Typography variant="subtitle1" component="span" fontWeight="bold">{title}</Typography>}
                <IconButton onClick={onClose} size="small" aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 1 }}>
                    {children}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
