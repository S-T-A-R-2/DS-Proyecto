import { HTMLAttributes, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface Invoice {
    _id: string
    number: number;
    date: string;
    pharmacyId: string;
    medicineId: string;
    quantity: number;
    imageId: string;
    state: string;
    user: string;
}

interface InvoiceListProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof invoiceListVariants> {
    children?: ReactNode;
    invoices: Invoice[];
    onclick: (invoice:Invoice) => void;
}

export default function InvoiceList({ 
    children, 
    className, 
    variant, 
    size, 
    invoices,
    onclick,
    ...props 
}: InvoiceListProps) {
    return (
        <div 
            className={twMerge(
                clsx(
                    invoiceListVariants({ variant, size, className }),
                    "max-h-[500px] overflow-y-auto" // Fixed max-height with vertical scrolling
                )
            )}
            {...props}
        >
            {children}
            <ul className="space-y-2 w-full">
                {invoices.map((invoice) => (
                    <li key={invoice.number} className="p-2 border-b border-gray-500">
                      <div onClick={() => onclick(invoice)} className="flex flex-col text-gray-800">
                        <p className="text-black">Factura {invoice.number}</p>
                        <p>Fecha: {invoice.date}</p> 
                        <p>Estado: {invoice.state}</p>
                        <p>Usuario: {invoice.user}</p>
                      </div>
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
