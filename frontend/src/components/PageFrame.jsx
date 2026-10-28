import Navbar from "./shared/Navbar";
import Footer from "./Footer";

export default function PageFrame({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
    </div>
  );
}
