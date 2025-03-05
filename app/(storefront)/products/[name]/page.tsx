import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound, usePathname } from "next/navigation";
import { unstable_noStore as noStore } from 'next/cache';

async function getData(productCategory: string) {
    switch(productCategory){
        case "all": {
            const data = await prisma.product.findMany({
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
                where: {
                    status: "published",
                }
            });

            return {
                title:"All products",
                data:data
            }
        };

        case "men": {
            const data = await prisma.product.findMany({
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
                where: {
                    status: "published",
                    category:"men",
                }
            });

            return {
                title:"Products for men",
                data:data,
            }
        };

        case "women": {
            const data = await prisma.product.findMany({
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
                where: {
                    status: "published",
                    category: "women",
                }
            });

            return {
                title:"Products for women",
                data:data,
            }
        };

        case "kids": {
            const data = await prisma.product.findMany({
                select: {
                    name: true,
                    images: true,
                    price: true,
                    id: true,
                    description: true,
                },
                where: {
                    status: "published",
                    category: "kids",
                }
            });

            return {
                title:"Products for kids",
                data:data,
            }
        };

    default: {
        return notFound();
    }

    }

    
}

export default async function CategoriesPage({params}: {params:{name: string}}) {

    noStore();
    const { data, title } = await getData(params.name);
    return (
        <section>
            <h1 className="font-semibold text-3xl my-5">{title}</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.map((item)=>(
                    <ProductCard item={item} key={item.id} />
                ))}
            </div>
        </section>
    );
}