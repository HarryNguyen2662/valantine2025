import IntroSection from "@/components/IntroSection";
import GallerySection from "@/components/GallerySection";
import WishesSection from "@/components/WishesSection";
import NavMini from "@/components/NavMini";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/MusicToggle";

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavMini />
      <IntroSection />
      <GallerySection />
      <WishesSection />
      <Footer />
      <MusicToggle />
    </main>
  );
}
