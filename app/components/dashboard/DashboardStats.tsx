import prisma from "@/app/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, ShoppingBag, PartyPopper, User2 } from "lucide-react";

async function getData(){

    const [users, products, orders] = await Promise.all([
        await prisma.user.findMany({
            select:{
                id: true,
            }
        }),

        await prisma.product.findMany({
            select:{
                id: true,
            },
        }),

        await prisma.order.findMany({
            select:{
                amount:true,
            }
        })
    ]);

    return {
        users,
        products,
        orders
    };
}

export async function DashboardStats(){

    const { products, users, orders } = await getData();

    const totalRevenue = orders.reduce((total, order)=> total +=order.amount,0);

    return (
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle>Total Revenue</CardTitle>
                        <DollarSign className='h-4 w-4 text-green-500'/>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">${new Intl.NumberFormat('en-US').format(totalRevenue / 100)}</p>
                        <p className="text-xs text-muted-foreground">Based on {orders.length} sales</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle>Total sales</CardTitle>
                        <ShoppingBag className='h-4 w-4 text-blue-500'/>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">+{orders.length}</p>
                        <p className="text-xs text-muted-foreground">Total store sales</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle>Total products</CardTitle>
                        <PartyPopper className='h-4 w-4 text-indigo-500'/>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{products.length}</p>
                        <p className="text-xs text-muted-foreground">Total products created</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle>Total users</CardTitle>
                        <User2 className='h-4 w-4 text-orange-500'/>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{users.length}</p>
                        <p className="text-xs text-muted-foreground">Total users signed up</p>
                    </CardContent>
                </Card>
            </div>
    )
}