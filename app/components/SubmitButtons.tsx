'use client';

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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