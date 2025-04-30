import ferrisWheel from "@/assets/ferris_wheel.png";
import beam1 from "@/assets/beam1.png";
import beam2 from "@/assets/beam2.png";
import bird1 from "@/assets/bird1.png";
import bird2 from "@/assets/bird2.png";

interface LandingProps {
  progress: number;
}

const Landing: React.FC<LandingProps> = ({ progress }) => {
  const movement = 1 - progress;
  const slowMoveSpeed = 10;
  const mediumMoveSpeed = 25;
  const fastMoveSpeed = 40;

  return (
    <>
      <div
        className="h-[100vh] absolute w-full flex z-50
        items-start justify-start md:justify-end
        font-jersey10 text-yellow1"
      >
        {/* Mobile Text */}
        <div className="block md:hidden absolute top-32 left-8 text-7xl z-60">
          <div className="text-left">
            <h2>BigRed//</h2>
            <h2>Hacks 2025</h2>
            <p className="text-5xl text-purple7">9/19 – 9/21</p>
          </div>
        </div>
        {/* Desktop Text */}
        <div
          className="hidden md:block mt-[30vh] mr-[15vw] text-9xl z-60"
          // bg-purple3/20 rounded-4xl p-6
        >
          <h2>BigRed//</h2>
          <h2>Hacks 2025</h2>
          <p className="text-7xl text-purple7">9/19 – 9/21</p>
        </div>

        {/* Assets */}
        <img
          src={beam1}
          alt="light beam 1"
          className="absolute pointer-events-none select-none
          -top-[10%] left-0 h-[120vh] w-auto z-0"
          style={{ transform: `translateX(-${movement * slowMoveSpeed}vw)` }}
        />
        <img
          src={beam2}
          alt="light beam 2"
          className="absolute pointer-events-none select-none
          -top-[10%] left-0 h-[120vh] w-auto z-0
          "
          style={{ transform: `translateX(-${movement * slowMoveSpeed}vw)` }}
        />
        <img
          src={ferrisWheel}
          alt="ferris wheel"
          className="absolute pointer-events-none select-none
          md:-bottom-[25%] md:left-[2%] md:max-h-[100vh] w-auto z-0
          -bottom-[10%] left-0 max-h-[100vh]"
          style={{ transform: `translateX(-${movement * slowMoveSpeed}vw)` }}
        />
        <img
          src={bird1}
          alt="bird"
          className="absolute pointer-events-none select-none
          top-[30%] md:left-[15%] left-[55%] md:w-[2%] h-auto z-40"
          style={{
            transform: `
          translateX(${movement * mediumMoveSpeed}vw)
          translateY(-${movement * mediumMoveSpeed}vh)
        `,
          }}
        />
        <img
          src={bird2}
          alt="bird"
          className="absolute pointer-events-none select-none
          top-[60%] left-[30%] md:w-[4%] h-auto z-40"
          style={{
            transform: `
          translateX(-${movement * fastMoveSpeed}vw)
          translateY(-${movement * mediumMoveSpeed}vh)
        `,
          }}
        />
        {/* Assets End */}
      </div>
    </>
  );
};

export default Landing;
