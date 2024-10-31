import { HTMLAttributes, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface Invoice {
    number: number;
    date: string;
    pharmacyId: string;
    medicineId: string;
    quantity: number;
    imageId: string;
    state: string;
}

interface InvoiceListProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof invoiceListVariants> {
    children?: ReactNode;
    invoices: Invoice[];
}

export default function InvoiceList({ 
    children, 
    className, 
    variant, 
    size, 
    invoices,
    ...props 
}: InvoiceListProps) {
    return (
        <div 
            className={twMerge(
                clsx(
                    invoiceListVariants({ variant, size, className }),
                    "max-h-96 overflow-y-auto" // Fixed max-height with vertical scrolling
                )
            )}
            {...props}
        >
            {children}
            <ul className="space-y-2">
                {invoices.map((invoice) => (
                    <li key={invoice.number} className="p-2 border-b border-gray-500">
                        <div className="text-lg">Factura {invoice.number}</div>
                        <div className="text-base text-gray-800">Fecha: {invoice.date}</div>
                        <div className="text-base text-gray-800">Estado: {invoice.state}</div>
                        {/* Add additional invoice details here as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const invoiceListVariants = cva("rounded-md", {
    variants: {
        variant: {
            primary: "inline-flex px-4 py-2 bg-white text-black font-semibold rounded-lg shadow-md",
            secondary: "bg-white text-black px-4 py-2 my-2",
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
    },
});
