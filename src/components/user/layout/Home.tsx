import Footer from "../home/Footer";
import Categories from "../home/Categories";
import Header from "../home/Header";
import Hero from "../home/Hero";
import ImageSlider from "../home/ImageSlider";
import PopularProducts from "../home/PopularProducts";

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
