import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

interface OrderReceipt {
  customerName: string;
  address: string;
  totalQuantity: number;
  totalPrice: number;
}

export function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const [fullName, setFullName] = useState<string>(user?.username ?? '');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  const handlePlaceOrder = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormError('');

    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setFormError('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ giao hàng.');
      return;
    }

    setReceipt({
      customerName: fullName.trim(),
      address: address.trim(),
      totalQuantity,
      totalPrice,
    });
    dispatch(clearCart());
  };

  if (receipt) {
    return (
      <section className="status-box success-box">
        <h1>Đặt hàng thành công!</h1>
        <p>
          Cảm ơn <strong>{receipt.customerName}</strong> đã mua sắm tại ShopMini.
        </p>
        <p>
          Đơn hàng gồm <strong>{receipt.totalQuantity}</strong> sản phẩm (tổng cộng{' '}
          <strong>${receipt.totalPrice.toFixed(2)}</strong>) sẽ được giao tới:{' '}
          <strong>{receipt.address}</strong>.
        </p>
        <Link to="/" className="btn btn-primary">
          Quay về trang chủ
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="status-box">
        <h1>Không có sản phẩm để thanh toán</h1>
        <p>Giỏ hàng của bạn hiện đang trống.</p>
        <Link to="/" className="btn btn-primary">
          Mua sắm ngay
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-title">Thanh toán</h1>

      <div className="cart-layout">
        <form onSubmit={handlePlaceOrder} className="checkout-form form-stack" noValidate>
          <h2>Thông tin giao hàng</h2>

          <div className="form-group">
            <label htmlFor="fullName">Họ và tên</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="09xxxxxxxx"
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ nhận hàng</label>
            <textarea
              id="address"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố"
              className="input"
              required
            />
          </div>

          {formError && <p className="form-error">{formError}</p>}

          <button type="submit" className="btn btn-primary btn-block">
            Đặt hàng (${totalPrice.toFixed(2)})
          </button>
        </form>

        <aside className="summary-card">
          <h2>Đơn hàng của bạn</h2>
          <ul className="checkout-items">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="checkout-item-row">
                <span className="checkout-item-name">
                  {product.title} × {quantity}
                </span>
                <span>${(product.price * quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-row">
            <span>Tổng số lượng:</span>
            <strong>{totalQuantity}</strong>
          </div>
          <div className="summary-row summary-total">
            <span>Tổng thanh toán:</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}