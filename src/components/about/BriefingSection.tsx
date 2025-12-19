import { FC } from "react";

interface BriefingSectionProps {
  briefing: {
    title: string;
    content: string;
    items?: string[];
  };
}

const BriefingSection: FC<BriefingSectionProps> = ({ briefing }) => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">{briefing.title}</h2>
        <p className="text-lg text-gray-700 mb-6">{briefing.content}</p>
        {briefing.items && briefing.items.length > 0 && (
          <ul className="list-disc list-inside space-y-2">
            {briefing.items.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default BriefingSection;
