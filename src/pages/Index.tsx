import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedActivities from "@/components/FeaturedActivities";
import ParentsSection from "@/components/ParentsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CategoriesSection />
        <FeaturedActivities />
        <ParentsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
