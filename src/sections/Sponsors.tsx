import WaveText from "../components/WaveText";
import { SectionProps } from "./SectionProps";
import cloudySun from "@/assets/cloudy_sun.png";
import grass from "@/assets/grass.png";
import arcade_device from "@/assets/arcade_device.png";

const Sponsors: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="sponsors"
      className={`min-h-[80vh]
        flex flex-col items-center justify-center 
        bg-transparent
        md:px-24 px-8
        md:pt-60 pt-40
        font-jersey10
        ${className ?? ""}`}
    >
      <div className="flex justify-end items-end w-full md:-mt-[0vh] -mt-[30vh] mb-[5vh] h-[20vh] z-0">
        <img
          src={cloudySun}
          alt="cloudy sun"
          className="pointer-events-none select-none w-[60vw] z-0"
        />
      </div>

      <div className="flex flex-col items-center z-10">
        <h2 className="text-6xl text-yellow2">SPONSORS</h2>
        <WaveText text="loading..." className="mt-24 text-7xl" />
      </div>

      <div className="w-screen mt-auto relative">
        <img
          src={arcade_device}
          alt="arcade device"
          className="md:w-[25vw] w-[40vw] object-cover absolute bottom-0 left-0 pointer-events-none select-none z-0"
        />
        <img
          src={grass}
          alt="grass"
          className="w-full object-cover pointer-events-none select-none relative z-10"
        />
      </div>
    </section>
  );
};

export default Sponsors;
