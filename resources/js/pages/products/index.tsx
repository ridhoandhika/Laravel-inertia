import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/product',
    },
];
interface Product {
    created_at: string
    description: string
    file: string
    id: string
    name: string
    price: string
    stock: number
    updated_at: string
}
interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
    created_at: string
    updated_at: string
}

interface SharedData {
    auth: {
        user: User
    }
    products: Product[]
}
export default function Index(props: SharedData) {
    const [productList, setProductList] = useState<Product[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        setProductList(props.products)
    }, [props.products])

    function handleDelete(id: string) {
        router.delete(route('product.destroy', id), {
            onSuccess: () => {
                setProductList((prev) => prev.filter((p) => p.id !== id))
                setIsOpen(false)
            },
            onError: (error) => {
                console.error('Gagal menghapus:', error)
            },
        })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {/* flex flex-col gap-4 rounded-xl p-4 overflow-x-auto */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
                {productList.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-2'>
                            <img src={`data:image/png;base64,${item.file}`} alt={item.name} className="w-full h-40 object-cover" />
                            <CardDescription>{item.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="mt-auto justify-end">
                            <AlertDialog open={isOpen}>
                                <AlertDialogTrigger asChild>
                                    <Button variant={"destructive"} onClick={() => setIsOpen(true)}>Delete</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(item.id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </AppLayout>
    )
}