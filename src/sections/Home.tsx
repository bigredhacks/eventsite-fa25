import cloudsXL from "@/assets/clouds_xl.png";
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
      <div className="block relative h-[150vh] bg-purple3 overflow-y-visible overflow-x-clip">
        {landing2Active ? (
          <Landing2 progress={progress} />
        ) : (
          <Landing1 progress={progress} />
        )}
        <div className="absolute bottom-0 left-0 w-[150vw] h-[50vh] z-50">
          <img
            src={cloudsXL}
            alt="clouds"
            className="absolute pointer-events-none select-none
            -top-[20%] md:-top-[70%] -left-[10vw] w-[150vw] h-auto"
            style={landing2Active ? {} : { opacity: bigCloudsOpacity }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
