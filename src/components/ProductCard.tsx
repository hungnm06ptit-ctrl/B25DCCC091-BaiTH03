import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = (): void => {
    dispatch(addToCart(product));
  };

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </Link>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <Link to={`/products/${product.id}`} className="product-title">
          {product.title}
        </Link>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-secondary btn-sm">
            Chi tiết
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm"
          >
            + Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
}