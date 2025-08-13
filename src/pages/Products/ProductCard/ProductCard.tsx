import type { ProductType } from '@/services/productsService.ts';
import { Link } from 'react-router-dom';
import Button from '@/UI/Button';

type PropsType = {
    product: ProductType;
    onProductDeleteClick: (productId: string) => void;
};

function ProductCard({ product, onProductDeleteClick }: PropsType) {
    return (
        <div className="flex flex-col items-start w-full p-5 rounded border border-zinc-700">
            <Link to={`/products/${product.id}`}>
                <h3 className="text-lg">{product.name}</h3>
            </Link>
            <Link to={`/products/${product.id}`} className="mt-2 w-full aspect-square overflow-hidden">
                <img className="w-full h-full object-cover" src={product.imageUrl} alt="Product image" />
            </Link>
            <p className="mt-2">Width: {product.size.width}</p>
            <p className="mt-2">Height: {product.size.height}</p>
            <p className="mt-2">Weight: {product.weight}</p>
            <Button className="mt-2" size="sm" variant="delete" onClick={() => onProductDeleteClick(product.id)}>
                Delete product
            </Button>
        </div>
    );
}

export default ProductCard;
