import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LocationState {
  from?: {
    pathname: string;
    search?: string;
    hash?: string;
  };
}

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const state = location.state as LocationState | null;
  const redirectPath = state?.from?.pathname
    ? `${state.from.pathname}${state.from.search ?? ''}${state.from.hash ?? ''}`
    : '/';

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setErrorMessage('');

    if (username.trim().length === 0) {
      setErrorMessage('Vui lòng nhập tên đăng nhập.');
      return;
    }

    const isSuccess = login(username, password);
    if (!isSuccess) {
      setErrorMessage('Mật khẩu không đúng. Mật khẩu giả lập là "123456".');
      return;
    }

    navigate(redirectPath, { replace: true });
  };

  return (
    <section className="auth-wrapper">
      <div className="auth-card">
        <h1 className="page-title">Đăng nhập ShopMini</h1>
        <p className="muted-text">
          Nhập tên bất kỳ và mật khẩu <strong>123456</strong> để đăng nhập.
        </p>

        {state?.from?.pathname && (
          <div className="info-banner">
            Vui lòng đăng nhập để tiếp tục truy cập{' '}
            <strong>{state.from.pathname}</strong>.
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-stack" noValidate>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ví dụ: nguyenvana"
              className="input"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập 123456"
              className="input"
              autoComplete="current-password"
              required
            />
          </div>

          {errorMessage && <p className="form-error">{errorMessage}</p>}

          <button type="submit" className="btn btn-primary btn-block">
            Đăng nhập
          </button>
        </form>
      </div>
    </section>
  );
}