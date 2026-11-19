import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectCartTotalQuantity } from '../features/cart/cartSlice';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          ShopMini
        </Link>

        <nav className="nav-actions">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Trang chủ
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Giỏ hàng
            <span className="cart-badge">{totalQuantity}</span>
          </NavLink>

          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-secondary btn-sm"
            aria-label="Chuyển đổi giao diện sáng tối"
          >
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>

          {user ? (
            <div className="user-box">
              <span className="user-name">Xin chào, {user.username}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-danger btn-sm"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}