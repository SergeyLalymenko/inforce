import apiProducts from './apiProducts.ts';

type SizeType = {
    width: number;
    height: number;
};

type CommentType = {
    id: string;
    productId: string;
    description: string;
    date: string;
};

export type ProductType = {
    id: string;
    imageUrl: string;
    name: string;
    count: number;
    size: SizeType;
    weight: string;
    comments: CommentType[];
};

export type productToCreateType = Omit<ProductType, 'id' | 'size' | 'weight' | 'comments'> & {
    width: number;
    height: number;
    weight: number;
};

type RejectType = {
    ok: false;
};

type FetchProductsSuccessType = {
    ok: true;
    products: ProductType[];
};

type CreateProductSuccessType = {
    ok: true;
    product: ProductType;
};

type DeleteProductSuccessType = {
    ok: true;
    productId: string;
};

export async function fetchProducts(): Promise<FetchProductsSuccessType | RejectType> {
    try {
        const res = await apiProducts.get<ProductType[]>('');
        return {
            ok: true,
            products: res.data,
        };
    } catch {
        return {
            ok: false,
        };
    }
}

export async function createProduct(
    productToCreate: productToCreateType
): Promise<CreateProductSuccessType | RejectType> {
    try {
        const res = await apiProducts.post<ProductType>('', {
            imageUrl: productToCreate.imageUrl,
            name: productToCreate.name,
            count: productToCreate.count,
            size: {
                width: productToCreate.width,
                height: productToCreate.height,
            },
            weight: `${productToCreate.weight}g`,
            comments: [],
        });
        return {
            ok: true,
            product: res.data,
        };
    } catch {
        return {
            ok: false,
        };
    }
}

export async function deleteProduct(productId: string): Promise<DeleteProductSuccessType | RejectType> {
    try {
        await apiProducts.delete<ProductType>(`/${productId}`);
        return {
            ok: true,
            productId,
        };
    } catch {
        return {
            ok: false,
        };
    }
}
