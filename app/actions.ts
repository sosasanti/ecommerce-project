'use server';

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from '@conform-to/zod';
import { bannerSchema, productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { Images } from "lucide-react";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interfaces";
import { revalidatePath } from "next/cache";

export async function createProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== 'santiago.sosaa2002@gmail.com'){
        return redirect("/");
    }

    //se valida los datos en el server
    const submission = parseWithZod(formData, {
        schema : productSchema
    });

    if (submission.status !== "success"){
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString) => 
        urlString.split(",").map((url)=>url.trim())
    );

    await prisma.product.create({
        data: {
            name:submission.value.name,
            description: submission.value.description,
            status:submission.value.status,
            price:submission.value.price,
            images:flattenUrls,
            category:submission.value.category,
            isFeatured: submission.value.isFeatured === true ? true : false,
        }
    });

    redirect("/dashboard");
}

export async function editProduct(prevState: unknown, formData: FormData){
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== 'santiago.sosaa2002@gmail.com'){
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: productSchema,

    });

    if (submission.status !== "success"){
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((urlString) => 
        urlString.split(",").map((url)=>url.trim())
    );

    const productId = formData.get('productId') as string;

    await prisma.product.update({
        where: {
            id: productId,
        },
        data:{
            name: submission.value.name,
            description: submission.value.description,
            category: submission.value.category,
            price: submission.value.price,
            isFeatured: submission.value.isFeatured === true ? true : false, //sino, por defecto queda true
            status: submission.value.status,
            images: flattenUrls,
        },
    });

    redirect('/dashboard/products');
}

export async function deleteProduct(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== 'santiago.sosaa2002@gmail.com'){
        return redirect("/");
    }

    await prisma.product.delete({
        where:{
            id: formData.get("productId") as string,
        }
    });

    redirect('/dashboard/products');
}




export async function createBanner(prevState:any, formData: FormData){
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== 'santiago.sosaa2002@gmail.com'){
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: bannerSchema,
    });

    if (submission.status !== 'success'){
        return submission.reply();
    }

    await prisma.banner.create({
        data: {
          title: submission.value.title,
          imageString: submission.value.imageString,
        },
      });

    redirect('/dashboard/banner');

}

export async function deleteBanner(formData: FormData){
    //Es la forma de q solo lo ejecute el admin (es un componente server side)
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== 'santiago.sosaa2002@gmail.com'){
        return redirect("/");
    }

    await prisma.banner.delete({
        where:{
            id: formData.get('bannerId') as string,
        },
    });

    redirect("/dashboard/banner");
}

export async function addItem(productId: string){
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user){
        return redirect("/");
    }

    console.log("Ejecutando addItem con productId:", productId);

    let cart: Cart | null = await redis.get(`cart-${user.id}`);

    const selectedProduct = await prisma.product.findUnique({
        where:{
            id:productId,
        },
        select:{
            id: true,
            price:true,
            name:true,
            images:true,
        }
    });

    if (!selectedProduct){
        throw new Error('No product with this ID');
    }

    let myCart = {} as Cart;

    if (!cart || !cart.items) { //si el user no tiene carrito o esta vacio
        myCart = {
            userId: user.id,
            items: [
                {
                    price: selectedProduct.price,
                    id: selectedProduct.id,
                    imageString: selectedProduct.images[0],
                    name:selectedProduct.name,
                    quantity:1
                }
            ]
        }
    }
    else { //modifico obj local, dsp actualizo redis
        let itemFound = false;
        myCart.items = cart.items.map((item)=>{
            if (item.id === productId){
                itemFound = true;
                item.quantity += 1;
            }

            return item;
        });

        if (!itemFound){
            myCart.items.push({
                id: selectedProduct.id,
                imageString:selectedProduct.images[0],
                name:selectedProduct.name,
                price:selectedProduct.price,
                quantity:1,
            })
        }

    }

    await redis.set(`cart-${user.id}`,myCart);
    revalidatePath("/","layout");

}