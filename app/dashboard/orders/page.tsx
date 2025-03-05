import prisma from "@/app/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

async function getData() {
    const data = await prisma.order.findMany({
        select: {
            amount: true,
            createdAt: true,
            id: true,
            status: true,
            user: {
                select: {
                    firstName: true,
                    email: true,
                    profileImage: true,
                }
            }

        },
        orderBy: {
            createdAt: 'desc',
        }
    });

    return data;
}

export default async function OrdersPage() {

    const orders = await getData();

    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>Recent orders from your store</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order)=>(
                            <TableRow key={order.id}>
                                <TableCell>
                                    <p className="font-medium">{order.user?.firstName}</p>
                                    <p className="text-sm hidden md:flex text-muted-foreground">{order.user?.email}</p>
                                </TableCell>
                                <TableCell>Sale</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{new Intl.DateTimeFormat('en-US').format(order.createdAt)}</TableCell>
                                <TableCell className="text-right">${new Intl.NumberFormat('en-US').format(order.amount / 100 )}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}