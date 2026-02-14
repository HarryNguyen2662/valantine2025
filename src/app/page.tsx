import IntroSection from "@/components/IntroSection";
import GallerySection from "@/components/GallerySection";
import WishesSection from "@/components/WishesSection";
import NavMini from "@/components/NavMini";
import Footer from "@/components/Footer";
import MusicToggle from "@/components/MusicToggle";
import ShareButton from "@/components/ShareButton";
import WishesCelebration from "@/components/WishesCelebration";

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavMini />
      <IntroSection />
      <GallerySection />
      <WishesSection />
      <Footer />
      <MusicToggle />
      <ShareButton />
      <WishesCelebration />
    </main>
  );
}
