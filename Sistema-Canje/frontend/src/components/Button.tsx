import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    children: ReactNode;
}

export default function Button({ 
    children, 
    className, 
    variant, 
    size, 
    ...props 
}: ButtonProps) {
    return (
        <button 
            className={twMerge(clsx(buttonVariants({variant, size, className})))}
            {...props}>{children}
        </button>
    );
}

const buttonVariants = cva("rounded-md", {
    variants: {
        variant: {
            primary: "bg-white text-black px-4 py-2 my-2",
            secondary: "bg-white text-black px-4 py-2 my-2"
        },
        size: {
            sm: "text-sm px-1 py-0",
            md: "text-base px-2 py-1",
            lg: "text-xl px-4 py-2",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    }
})