import prisma from "@/app/lib/db";
import { AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

async function getData(){
    const orders = await prisma.order.findMany({
        select: {
            amount:true,
            id:true,
            user:{
                select:{
                    firstName:true,
                    profileImage:true,
                    email:true,
                }
            }
        },
        orderBy:{
            createdAt:'desc',
        },
        take:7,
    });

    return orders;

}

export default async function RecentSales(){

    const orders = await getData();

    return (
                <Card>
                    <CardHeader>
                        <CardTitle>Recent sales</CardTitle>
                    </CardHeader>
                   <CardContent className='flex flex-col gap-8'>
                        {orders.map((order)=>(
                            <div key={order.id} className="flex items-center gap-4">
                                <Avatar className="hidden sm:flex h-9 w-9">
                                    <AvatarImage className="rounded-full" src={order.user?.profileImage} alt="Avatar image"/>
                                    <AvatarFallback>{order.user?.firstName.slice(0,3)}</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <p className="text-sm font-medium">{order.user?.firstName}</p>
                                    <p className="text-sm text-muted-foreground">{order.user?.email}</p>
                                </div>
                                <p className="ml-auto text-md">+${new Intl.NumberFormat('en-US').format(order.amount / 100)}</p>
                        </div>
                        ))}

                    </CardContent> 
                </Card>        
    )
}