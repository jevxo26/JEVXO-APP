import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main className="w-full px-4 md:px-8 lg:px-12 mx-auto">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
