import { FeaturedProducts } from "@/app/components/storefront/FeaturedProducts";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function BagRoute() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user){
        return redirect("/");
    }

    const cart : Cart | null = await redis.get(`cart-${user.id}`);

    return (
        <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
            {cart?.items.length === 0 ? (
                <div>
                    <h1>Nothing in the shopping cart</h1>
                </div>
            ): (
                <>
                    {cart?.items.map((item)=>(
                        <div key={item.id} className="flex">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                                <Image fill src={item.imageString} alt="Product Image" />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}