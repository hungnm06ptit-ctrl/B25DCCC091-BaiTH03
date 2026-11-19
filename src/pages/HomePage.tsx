import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchProducts,
  selectAllProducts,
  selectProductsError,
  selectProductsStatus,
} from '../features/products/productsSlice';
import { ProductCard } from '../components/ProductCard';

export function HomePage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);

  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(keyword)
    );
  }, [products, searchTerm]);

  return (
    <section>
      <div className="page-toolbar">
        <h1 className="page-title">Danh sách sản phẩm</h1>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm sản phẩm theo tên..."
          className="input search-input"
          aria-label="Tìm kiếm sản phẩm theo tên"
        />
      </div>

      {status === 'loading' && (
        <div className="status-box">Đang tải danh sách sản phẩm...</div>
      )}

      {status === 'failed' && (
        <div className="status-box error-box">
          <p>Lỗi: {error ?? 'Không thể tải dữ liệu.'}</p>
          <button
            type="button"
            onClick={() => void dispatch(fetchProducts())}
            className="btn btn-primary"
          >
            Thử lại
          </button>
        </div>
      )}

      {status === 'succeeded' && filteredProducts.length === 0 && (
        <div className="status-box">
          Không tìm thấy sản phẩm nào khớp với từ khóa "{searchTerm}".
        </div>
      )}

      {status === 'succeeded' && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}