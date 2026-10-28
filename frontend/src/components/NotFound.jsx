import { Link } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-16 text-center">
        <p className="text-sm font-semibold tracking-wide text-[#0350C6]">404</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#012760]">
          This page does not exist
        </h1>
        <p className="mt-3 max-w-md text-gray-500">
          The link may be out of date, or the address was typed incorrectly.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-lg bg-[#012760] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0350C6]"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
