import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function DemoLayout({ children }) {
  return (
    <>
      <nav className=" text-black">
        <Navbar />
      </nav>
      <main>{children}</main>
      <Footer />
    </>
  );
}
