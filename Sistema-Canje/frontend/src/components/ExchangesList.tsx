import { HTMLAttributes, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface Exchange {
        number: number,
        username: string,
        medicine: string,
        date: string,
        pharmacy: string,
        invoicesUsed: number[]
}

interface ExchangeListProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof exchangeListVariants> {
    children?: ReactNode;
    exchanges: Exchange[];
}

export default function ExchangeList({ 
    children, 
    className, 
    variant, 
    size, 
    exchanges,
    ...props 
}: ExchangeListProps) {
    return (
        <div 
            className={twMerge(
                clsx(
                    exchangeListVariants({ variant, size, className }),
                    "max-h-[500px] overflow-y-auto"
                )
            )}
            {...props}
        >
            {children}
            <ul className="space-y-2 w-full">
                {exchanges.map((exchange) => (
                    <li key={exchange.number} className="p-2 border-b border-gray-500">
                      <div className="flex flex-col text-gray-800">
                        <h1 className="text-black">Número de registro: {exchange.number}</h1>
                        <p>Usuario: {exchange.username}</p> 
                        <p>Medicina: {exchange.medicine}</p>
                        <p>Fecha: {exchange.date}</p>
                        <p>Farmacia: {exchange.pharmacy}</p>
                        <p>
                                Facturas Usadas:{" "}
                                {exchange.invoicesUsed.join(", ")}
                        </p>                      
                      </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const exchangeListVariants = cva("rounded-md", {
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
