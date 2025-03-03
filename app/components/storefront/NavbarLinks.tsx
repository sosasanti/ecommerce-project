'use client';
import Link from "next/link"
import { usePathname } from "next/navigation"

export const navbarLinks = [
    {
        id:0,
        name:"Home",
        href:"/",
    },
    {
        id:1,
        name:"All products",
        href:"/products/all",
    },
    {
        id:2,
        name:"Men",
        href:"/products/men",
    },
    {
        id:3,
        name:"Women",
        href:"/products/women"
    },
    {
        id:4,
        name:"Kids",
        href:'/products/kids'
    },
]

export function NavbarLinks(){

    const location = usePathname();

    return (
        <div className="hidden md:flex justify-center items-center gap-x-4 ml-8 font-medium">
            {navbarLinks.map((item)=>(
                <Link href={item.href} key={item.id} 
                    className={`group p-2 font-medium rounded-md ${location === item.href ? 'bg-muted' : 'hover:bg-muted hover:bg-opacity-75'}`}
                >                    
                    {item.name}
                </Link>
            ))}
        </div>
    )
}