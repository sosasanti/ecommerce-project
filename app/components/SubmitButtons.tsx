'use client';

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom"

export function SubmitButton(){

    const {pending} = useFormStatus();

    return (
        <>
            {pending ? (
                <div>
                    <Button disabled>
                        <Loader2 classNamemr-2 h-4 w-4 animate-spin />
                    </Button>
                </div>
            ): (
                <Button type="submit">
                    Create Product
                </Button>
            )}
        </>
    )
}