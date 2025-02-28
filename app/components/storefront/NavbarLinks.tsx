import Link from "next/link"

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
    }
]

export function NavbarLinks(){
    return (
        <div className="hidden md:flex justify-center items-center gap-x-4 ml-8 font-medium">
            {navbarLinks.map((item)=>(
                <Link href={item.href} key={item.id}>
                    {item.name}
                </Link>
            ))}
        </div>
    )
}