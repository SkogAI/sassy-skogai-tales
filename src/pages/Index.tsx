import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogFeed from "@/components/BlogFeed";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <BlogFeed />
      <Footer />
    </div>
  );
};

export default Index;