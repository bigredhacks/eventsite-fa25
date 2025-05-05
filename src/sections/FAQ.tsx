import { SectionProps } from "./SectionProps";
import Accordion from "../components/Accordian";
import { faqData } from "../config/config";
import gameboy from "@/assets/gameboy_controller.png";
import arcadeController from "@/assets/arcade_controller.png";

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
        flex flex-col justify-start 
        bg-transparent
        md:px-32 px-8
        md:py-12 py-6
        md:pt-40 pt-40
         ${className ?? ""}`}
    >
      <div className="w-full max-w-7xl mx-auto font-jersey10">
        <div className="flex justify-between">
          <div className="flex">
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-yellow2 mb-8 md:mb-12">
              FAQ
            </h2>
            <div className="-mt-[3.5vh] ml-[2.5vh] md:w-[12.5vw] w-[25vw] z-10">
              <img
                src={gameboy}
                alt="gameboy controller"
                className="pointer-events-none select-none
                md:w-[12.5vw] w-[25vw] z-10"
              />
            </div>
          </div>
          <img
            src={arcadeController}
            alt="arcade controller"
            className="pointer-events-none select-none md:h-[15vw] h-[25vw] w-auto md:-mt-[7.5vw] -mt-[10vw]"
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-8">
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
