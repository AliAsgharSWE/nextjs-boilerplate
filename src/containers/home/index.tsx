import HeroSection from "@/src/components/home/HeroSection";
import { homePageData } from "@/src/containers/home/data";

const Home = () => {
  const { clients } = homePageData;

  return (
    <div className="flex flex-col">
      <HeroSection clients={clients} />
      {/* Add more sections as needed */}
    </div>
  );
};

export default Home;
