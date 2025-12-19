import Hero from "@/src/components/common/hero";
import BriefingSection from "@/src/components/about/BriefingSection";
import { aboutPageData } from "@/src/containers/about/data";

const About = () => {
  return (
    <div className="flex flex-col">
      <Hero {...aboutPageData.hero} />
      <BriefingSection briefing={aboutPageData.briefing} />
    </div>
  );
};

export default About;

