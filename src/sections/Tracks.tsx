import { SectionProps } from "./SectionProps";
import arcade from "@/assets/arcade.png";

const Tracks: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="tracks"
      className={`
        flex flex-col items-start justify-center 
        bg-transparent
        overflow-hidden
        md:px-32 px-8
        md:py-12 py-6
        md:pt-40 pt-40
         ${className ?? ""}`}
    >
      <div className="w-[140vw] h-[100vh] z-10">
        <img
          src={arcade}
          alt="arcade"
          className="pointer-events-none select-none
          -ml-30 md:-ml-60 w-[140vw] z-10"
        />
      </div>
      <div className="font-jersey10 z-20">
        <h2 className="text-6xl text-yellow2">TRACKS</h2>
      </div>
      <div className="h-[50vh]"></div>
    </section>
  );
};

export default Tracks;
