import prisma from "@/app/lib/db";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from 'next/image';

async function getData(){
    const data = await prisma.banner.findMany({
        orderBy:{
            createdAt: 'desc'
        },
    });

    return data;
}

export async function Hero(){

    const data = await getData();

    return (
        <Carousel>
            <CarouselContent>
                {data.map((item)=>(
                    <CarouselItem key={item.id}>
                        <div className="relative h-[60vh] lg:h-[80vh]">
                            <Image src={item.imageString} alt="Banner image" fill 
                                className="object-cover w-full h-full rounded-xl"
                            />
                            <div className="absolute top-6 left-6 bg-opacity-75 bg-black text-white p-6 rounded-xl shadow-lg transition-transform hover:scale-150 ">
                                <h1 className="text-xl lg:text-4xl font-bold ">{item.title}</h1>
                            </div>
                        </div>
                    </CarouselItem>
                ))};
            </CarouselContent>
        </Carousel>
    );
}