import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchProducts,
  selectAllProducts,
  selectProductsError,
  selectProductsStatus,
} from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);

  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const productId = Number(id);
  const product = Number.isInteger(productId)
    ? products.find((item) => item.id === productId)
    : undefined;

  const handleAddToCart = (): void => {
    if (!product) return;
    dispatch(addToCart(product));
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1500);
  };

  if (status === 'loading' || status === 'idle') {
    return <div className="status-box">Đang tải thông tin sản phẩm...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="status-box error-box">
        <p>Lỗi: {error ?? 'Không thể tải sản phẩm.'}</p>
        <button
          type="button"
          onClick={() => void dispatch(fetchProducts())}
          className="btn btn-primary"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="status-box">
        <h2>Không tìm thấy sản phẩm</h2>
        <p>Sản phẩm với mã #{id} không tồn tại.</p>
        <Link to="/" className="btn btn-primary">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <section className="detail-section">
      <Link to="/" className="back-link">
        ← Quay lại danh sách
      </Link>

      <div className="detail-card">
        <div className="detail-image-wrap">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>

        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>

          <div className="detail-actions">
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn btn-primary"
            >
              {addedFeedback ? '✓ Đã thêm vào giỏ' : 'Thêm vào giỏ hàng'}
            </button>
            <Link to="/cart" className="btn btn-secondary">
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}