import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { fetchProducts, createProduct, deleteProduct } from '@/store/productsSlice';
import Container from '@/components/Container.tsx';
import ProductCard from './ProductCard/ProductCard';
import Button from '@/UI/Button.tsx';
import Modal from '@/components/Modal';
import ConfirmModal from '@/components/ConfirmModal';
import InputField from '@/UI/InputField';
import type { ProductType } from '@/services/productsService.ts';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const countWithTransform = z.preprocess(
    (val) => (val === '' ? NaN : Number(val)),
    z.number().min(1).max(1000)
) as unknown as z.ZodNumber;
const widthWithTransform = z.preprocess(
    (val) => (val === '' ? NaN : Number(val)),
    z.number().min(10).max(1000)
) as unknown as z.ZodNumber;
const heightWithTransform = z.preprocess(
    (val) => (val === '' ? NaN : Number(val)),
    z.number().min(10).max(1000)
) as unknown as z.ZodNumber;
const weightWithTransform = z.preprocess(
    (val) => (val === '' ? NaN : Number(val)),
    z.number().min(10).max(1000)
) as unknown as z.ZodNumber;

const addProductSchema = z.object({
    name: z.string().min(2, 'Min 2 symbols'),
    imageUrl: z.string().regex(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i, 'Invalid url'),
    count: countWithTransform,
    width: widthWithTransform,
    height: heightWithTransform,
    weight: weightWithTransform,
});

type AddProductFormDataType = z.infer<typeof addProductSchema>;

type SortByType = 'name' | 'count';

type SortConfigType = {
    by: SortByType;
    direction: 'asc' | 'desc';
};

function Products() {
    const dispatch = useDispatch<AppDispatch>();
    const { products, isLoading, isLoadingError } = useSelector((state: RootState) => state.products);

    const [sortConfig] = useState<SortConfigType>({
        by: 'name',
        direction: 'asc',
    });
    const [isOpenAddProductModal, setIsOpenAddProductModal] = useState<boolean>(false);
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

    const { control, handleSubmit, reset } = useForm<AddProductFormDataType>({
        resolver: zodResolver(addProductSchema),
    });

    const sortedProducts: ProductType[] = useMemo(() => {
        const { by, direction } = sortConfig;
        let productsBy: ProductType[] = [];
        switch (by) {
            case 'name':
                {
                    productsBy = [...products].sort((a, b) => a.name.localeCompare(b.name));
                }
                break;
            case 'count':
                {
                    productsBy = [...products].sort((a, b) => a.count - b.count);
                }
                break;
        }
        if (direction === 'desc') return productsBy.reverse();
        return productsBy;
    }, [products, sortConfig]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    function onAddProductModalClose() {
        setIsOpenAddProductModal(false);
        reset();
    }

    function onAddProductFormSubmit(formData: AddProductFormDataType) {
        onAddProductModalClose();
        dispatch(createProduct(formData));
    }

    function onProductDeleteClick(productId: string) {
        setDeleteProductId(productId);
    }

    function onDeleteProductModalClose() {
        setDeleteProductId(null);
    }

    function onDeleteProductConfirm() {
        if (!deleteProductId) return;
        dispatch(deleteProduct(deleteProductId));
        setDeleteProductId(null);
    }

    if (isLoadingError) return <p>Loading error!</p>;

    return (
        <>
            <Container className="py-5">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="mt-4 flex gap-2 items-center">
                            <Button size="sm" variant="primary" onClick={() => setIsOpenAddProductModal(true)}>
                                Add product
                            </Button>
                        </div>
                        <h1 className="text-xl mt-2">Products:</h1>
                        <div className="mt-2 grid grid-cols-4 gap-4">
                            {sortedProducts.length ? (
                                sortedProducts.map((product) => (
                                    <ProductCard
                                        product={product}
                                        onProductDeleteClick={onProductDeleteClick}
                                        key={product.id}
                                    />
                                ))
                            ) : (
                                <p>Empty!</p>
                            )}
                        </div>
                    </>
                )}
            </Container>
            <Modal title="Add product" isOpen={isOpenAddProductModal} onClose={onAddProductModalClose}>
                <form onSubmit={handleSubmit(onAddProductFormSubmit)}>
                    <div className="flex flex-col gap-2">
                        <InputField name="name" control={control} label="Name" />
                        <InputField name="imageUrl" control={control} label="Image url" />
                        <InputField name="count" control={control} label="Count" />
                        <InputField name="width" control={control} label="Width" />
                        <InputField name="height" control={control} label="Height" />
                        <InputField name="weight" control={control} label="Weight" />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <Button variant="success" type="submit">
                            Add product
                        </Button>
                        <Button variant="delete" onClick={onAddProductModalClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
            <ConfirmModal
                title="Are you sure?"
                isOpen={Boolean(deleteProductId)}
                onClose={onDeleteProductModalClose}
                onConfirm={onDeleteProductConfirm}
                onCancel={onDeleteProductModalClose}
            />
        </>
    );
}

export default Products;
