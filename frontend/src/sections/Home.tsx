import cloudsStars from "@/assets/clouds_stars.png";
// import cloudsXL from "@/assets/clouds_xl.png";
// import stars from "@/assets/star_deco.png";
import Landing1 from "./Landing1";
import Landing2 from "./Landing2";

interface HomeProps {
  landing2Active: boolean;
  progress: number;
}

const Home: React.FC<HomeProps> = ({ landing2Active, progress }) => {
  const bigCloudsOpacity = 1 - progress;
  return (
    <>
      <div
        className={`
        block relative md:h-[150vh] h-[100vh]
        ${
          landing2Active
            ? "bg-gradient-to-b from-purple3 via-purple4 to-purple3"
            : "bg-purple3"
        }
        overflow-y-visible overflow-x-clip
      `}
      >
        {landing2Active ? (
          <Landing2 progress={progress} />
        ) : (
          <Landing1 progress={progress} />
        )}
        {/* Desktop Clouds */}
        <div className="hidden md:block absolute bottom-0 left-0 w-[150vw] h-[50vh] z-50">
          <img
            src={cloudsStars}
            alt="clouds"
            className="absolute pointer-events-none select-none
            -top-[60%] -left-[25vw] w-[150vw] z-10"
            style={landing2Active ? {} : { opacity: bigCloudsOpacity }}
          />
        </div>
        {/* Mobile Clouds */}
        <div className="block md:hidden absolute bottom-0 left-0 w-[180vw] h-[20vh] z-50">
          <img
            src={cloudsStars}
            alt="clouds"
            className="absolute pointer-events-none select-none
            -top-[0vh] -left-[20vw] w-[180vw] h-auto z-10"
            style={landing2Active ? {} : { opacity: bigCloudsOpacity }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
