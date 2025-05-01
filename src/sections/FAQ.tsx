import { SectionProps } from "./SectionProps";
import Accordion from "../components/Accordian";
import { faqData } from "../config/config";

const FAQ: React.FC<SectionProps> = ({ className }) => {
  const midPoint = Math.ceil(faqData.length / 2);
  const leftColumnData = faqData.slice(0, midPoint);
  const rightColumnData = faqData.slice(midPoint);

  const transformItems = (data: typeof faqData) =>
    data.map((item) => ({
      title: item.question,
      content: item.answer,
    }));

  return (
    <section
      id="faq"
      className={`
        flex justify-start 
        bg-transparent
        md:px-32 px-8
        md:py-12 py-6
        md:pt-40 pt-40
         ${className ?? ""}`}
    >
      <div className="w-full max-w-7xl mx-auto font-jersey10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl text-yellow2 mb-8 md:mb-12">FAQ</h2>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="w-full lg:w-1/2">
            <Accordion items={transformItems(leftColumnData)} />
          </div>
          <div className="w-full lg:w-1/2">
            <Accordion items={transformItems(rightColumnData)} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
