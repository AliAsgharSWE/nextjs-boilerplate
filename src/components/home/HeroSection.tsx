import { FC } from "react";

interface HeroSectionProps {
  clients?: string[];
}

const HeroSection: FC<HeroSectionProps> = ({ clients }) => {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-xl mb-8">
          Building amazing experiences with Next.js
        </p>
        {clients && clients.length > 0 && (
          <div className="mt-12">
            <p className="text-sm mb-4">Trusted by:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {clients.map((client, index) => (
                <span key={index} className="px-4 py-2 bg-white/20 rounded">
                  {client}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
