import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  updateQuantity,
} from '../features/cart/cartSlice';

export function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  if (items.length === 0) {
    return (
      <section className="status-box">
        <h1>Giỏ hàng trống</h1>
        <p>Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
        <Link to="/" className="btn btn-primary">
          Tiếp tục mua sắm
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="page-toolbar">
        <h1 className="page-title">Giỏ hàng ({totalQuantity} sản phẩm)</h1>
        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="btn btn-danger btn-sm"
        >
          Xóa toàn bộ giỏ hàng
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map(({ product, quantity }) => (
            <article key={product.id} className="cart-item">
              <img
                src={product.image}
                alt={product.title}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <Link to={`/products/${product.id}`} className="cart-item-title">
                  {product.title}
                </Link>
                <p className="cart-item-unit-price">
                  Đơn giá: ${product.price.toFixed(2)}
                </p>
              </div>

              <div className="qty-control">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    dispatch(
                      updateQuantity({ id: product.id, quantity: quantity - 1 })
                    )
                  }
                  aria-label="Giảm số lượng"
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    dispatch(
                      updateQuantity({ id: product.id, quantity: quantity + 1 })
                    )
                  }
                  aria-label="Tăng số lượng"
                >
                  +
                </button>
              </div>

              <div className="cart-item-subtotal">
                ${(product.price * quantity).toFixed(2)}
              </div>

              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(removeFromCart(product.id))}
              >
                Xóa
              </button>
            </article>
          ))}
        </div>

        <aside className="summary-card">
          <h2>Tóm tắt đơn hàng</h2>
          <div className="summary-row">
            <span>Tổng số lượng:</span>
            <strong>{totalQuantity}</strong>
          </div>
          <div className="summary-row summary-total">
            <span>Tổng tiền:</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-block">
            Tiến hành thanh toán
          </Link>
        </aside>
      </div>
    </section>
  );
}