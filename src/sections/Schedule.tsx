import { SectionProps } from "./SectionProps";
import schedule from "@/assets/schedule.png";

const Schedule: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="schedule"
      className={`min-h-screen 
        flex items-center justify-center 
        bg-transparent
        md:px-24 px-8
        md:py-12 py-6
        md:pt-40 pt-40
         ${className ?? ""}`}
    >
      <div className="w-full md:mx-18 font-jersey10 text-left">
        <h2 className="text-6xl text-yellow2 p-4">SCHEDULE</h2>
        <img
          src={schedule}
          alt="bird"
          className="pointer-events-none select-none md:w-[70%] h-auto z-40"
        />
      </div>
    </section>
  );
};

export default Schedule;
