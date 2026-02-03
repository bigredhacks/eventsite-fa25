import { SectionProps } from "./SectionProps";
import arcade from "@/assets/arcade.png";
import { tracks } from "../../../config/config";
import TrackCard from "../../../components/TrackCard";

const Tracks: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="tracks"
      className={`
        flex flex-col items-center justify-center 
        bg-transparent
        overflow-y-visible
        overflow-x-clip
        md:px-32 px-8
        md:py-12 py-6
        md:pt-40 pt-20
        z-20
        font-jersey10
         ${className ?? ""}`}
    >
      <div className="md:-mt-[60vh] -mt-[30vh] mb-[10vh] w-[110vw] md:h-[50vh] z-0">
        <img
          src={arcade}
          alt="arcade"
          className="pointer-events-none select-none
          w-[110vw] z-0"
        />
      </div>
      <div className="z-20 flex flex-col items-center justify-center">
        <h2 className="text-6xl text-yellow2">TRACKS</h2>
      </div>
      <div
        className="grid 
        md:grid-cols-3 md:grid-rows-2 
        grid-cols-2 grid-rows-3
        md:gap-[2vw] gap-[2vw]
        md:mx-[4vw] -mx-[2vw]
        mt-20"
      >
        {tracks.map((track, index) => (
          <TrackCard
            key={index}
            title={track.title}
            description={track.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Tracks;
