import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="status-box">
      <h1 className="not-found-code">404</h1>
      <h2>Không tìm thấy trang</h2>
      <p>Đường dẫn bạn truy cập không tồn tại hoặc đã bị thay đổi.</p>
      <Link to="/" className="btn btn-primary">
        Về trang chủ
      </Link>
    </section>
  );
}