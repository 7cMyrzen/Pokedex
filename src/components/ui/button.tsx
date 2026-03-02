import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button"
import { styled } from "@mui/material/styles"

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
    // Custom styles if needed to match shadcn more closely
}));

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {

        // Map shadcn variant/size to MUI
        let muiVariant: MuiButtonProps['variant'] = 'contained';
        let muiColor: MuiButtonProps['color'] = 'primary';

        switch (variant) {
            case 'default':
                muiVariant = 'contained';
                muiColor = 'primary';
                break;
            case 'destructive':
                muiVariant = 'contained';
                muiColor = 'error';
                break;
            case 'outline':
                muiVariant = 'outlined';
                muiColor = 'primary'; // or inherit?
                break;
            case 'secondary':
                muiVariant = 'contained';
                muiColor = 'secondary';
                break;
            case 'ghost':
                muiVariant = 'text';
                muiColor = 'inherit';
                break;
            case 'link':
                muiVariant = 'text';
                muiColor = 'primary';
                // TODO: Add underline style
                break;
        }

        let muiSize: MuiButtonProps['size'] = 'medium';
        switch (size) {
            case 'default': muiSize = 'medium'; break;
            case 'sm': muiSize = 'small'; break;
            case 'lg': muiSize = 'large'; break;
            case 'icon':
                muiSize = 'medium';
                // Icon sizing handled via sx?
                break;
        }

        const sx = {
            ...(size === 'icon' && { minWidth: '40px', width: '40px', padding: 0 }),
            ...(variant === 'link' && { textDecoration: 'underline' }),
            ...props.sx
        };

        // Note: asChild prop in shadcn/ui delegates rendering to the child (usually a Slot).
        // MUI Button does not utilize Slot in the same way.
        // For compatibility during migration, we ignore asChild and render MuiButton,
        // trusting that props (like onClick, href) are passed correctly.

        return (
            <MuiButton ref={ref} variant={muiVariant} color={muiColor} size={muiSize} sx={sx} {...props} />
        );
    }
);
Button.displayName = "Button"

export { Button, MuiButton }
