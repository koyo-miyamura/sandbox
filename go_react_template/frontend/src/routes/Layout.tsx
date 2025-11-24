import { Outlet } from "react-router";
import Navigation from "../components/Navigation";

export default function Layout() {
  const copyRightYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="navbar bg-base-100 shadow-sm px-4">
        <div>
          <p className="text-2xl font-bold">My App</p>
        </div>
        <Navigation />
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <Outlet />
      </main>

      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {copyRightYear} - All rights reserved</p>
        </aside>
      </footer>
    </div>
  );
}
