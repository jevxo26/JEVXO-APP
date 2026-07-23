import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main className="w-full mx-auto">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
