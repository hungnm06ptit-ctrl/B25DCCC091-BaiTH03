import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export function MainLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content container">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">ShopMini — React + TypeScript + Redux Toolkit</div>
      </footer>
    </div>
  );
}