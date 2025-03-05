'use client';

import { Button } from "@/components/ui/button";
import { useForm } from "@conform-to/react";
import { Loader2, LogIn, ShoppingBagIcon } from "lucide-react";
import { useFormStatus } from "react-dom"

interface buttonProps {
    text: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export function SubmitButton({text, variant}:buttonProps){

    const {pending} = useFormStatus();

    return (
        <>
            {pending ? (
                <div>
                    <Button disabled variant={variant}>
                        <Loader2 classNamemr-2 h-4 w-4 animate-spin />
                    </Button>
                </div>
            ): (
                <Button variant={variant} type="submit">
                    {text}
                </Button>
            )}
        </>
    )
}

export function ShoppingBagButton(){
    const { pending } = useFormStatus();

    return (
        <>
            {
                pending ? (
                    <Button disabled size="lg" className="w-full mt-5" >
                        <Loader2 className="mr-4 h-5 w-5 animate-spin"/> Please wait
                    </Button>
                ) : (
                    <Button size="lg" className="w-full mt-5" type="submit" >
                        <ShoppingBagIcon className="mr-4 h-5 w-5 "/> Add to Cart
                    </Button>
                )
            }
        </>
    )
}

export function DeleteItem(){
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <button disabled className="font-medium text-primary text-end">Removing...</button>

            ): (
                <button type="submit" className="font-medium text-primary text-end">Delete</button>
            )}
        </>
    )
}

export function CheckoutButton(){

    const { pending } = useFormStatus();

    return(
        <>
            {pending ? (
                <Button disabled size="lg" className="w-full mt-5" >
                    <Loader2 className="mr-2 h-5 w-5 animate-spin"/>Please wait
                </Button>
            ): (
                <Button type="submit" size="lg" className="w-full mt-5" >
                    Checkout
                </Button>
            )}
        </>
    )
}

export function CheckoutButtonNoLogged(){

    return(
        <>
            <Button disabled size="lg" className="w-full mt-5" >
                <LogIn className="mr-2 h-5 w-5"/>Please sign in first
            </Button>
        </>
    )
}