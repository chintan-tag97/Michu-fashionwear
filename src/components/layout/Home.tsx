import Header from "../home/Header";
import Footer from "../home/Footer";
import ImageSlider from "../home/ImageSlider";
import Categories from "../home/Categories";
import PopularProducts from "../home/PopularProducts";
import Hero from "../home/Hero";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <div className="flex-grow">
        <section className="w-full">
          <ImageSlider />
        </section>
    
        <PopularProducts />

        <Categories />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
