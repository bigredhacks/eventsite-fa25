import { SectionProps } from "./SectionProps";
import schedule from "@/assets/schedule.png";
import waterfall from "@/assets/waterfall.png";
import star from "@/assets/star.png";

const Schedule: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="schedule"
      className={`
        flex flex-col items-start justify-center 
        bg-transparent
        overflow-y-visible
        overflow-x-clip
        md:px-32 px-8
        md:py-12 py-6
        md:pt-40 pt-40
         ${className ?? ""}`}
    >
      <div className="md:-mt-[45vh] -mt-[30vh] md:-mx-32 -mx-8 md:h-[45vh] h-[25vh] md:w-[50vw] w-[70vw]">
        <img
          src={waterfall}
          alt="waterfall"
          className="pointer-events-none select-none
          md:w-[50vw] w-[70vw]"
        />
      </div>
      <div className="w-full font-jersey10 text-left">
        <h2 className="text-6xl text-yellow2 p-4">SCHEDULE</h2>
        <div className="relative inline-block">
          <img
            src={star}
            alt="star"
            className="pointer-events-none select-none absolute -top-[10vh] right-0 md:w-[7.5vw] w-[15vw]"
          />
          <img
            src={schedule}
            alt="schedule"
            className="pointer-events-none select-none w-auto max-h-[100vh] z-40"
          />
        </div>
      </div>
    </section>
  );
};

export default Schedule;
