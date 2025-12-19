import { FC } from "react";
import Image from "next/image";

export interface HeroProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

const Hero: FC<HeroProps> = ({ title, description, image, imageAlt }) => {
  return (
    <section className="relative w-full min-h-[400px] flex items-center justify-center bg-gray-100">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {image && (
          <div className="mt-8">
            <Image
              src={image}
              alt={imageAlt || title}
              width={800}
              height={400}
              className="rounded-lg mx-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

