import React from "react";
import cinema from "@/assets/cinema.png";
import clouds from "@/assets/clouds.png";
import ferrisWheel from "@/assets/ferris_wheel.png";
import house from "@/assets/house.png";
import houses from "@/assets/houses.png";
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
    <div
      className="h-[100vh] w-full fixed flex z-50
        items-start justify-start
        font-jersey10 text-yellow1"
      style={{ opacity: progress }}
    >
      {/* Mobile Text */}
      <div className="block md:hidden absolute top-32 right-8 text-7xl z-50">
        <div className="text-right">
          <h2>BigRed//</h2>
          <h2>Hacks 2025</h2>
          <p className="text-5xl text-purple7">9/19 – 9/21</p>
        </div>
      </div>
      {/* Desktop Text */}
      <div
        className="hidden md:block mt-[15vh] ml-[20%] text-9xl z-50"
        // bg-purple3/20 rounded-4xl p-6
        style={{ transform: `translateX(-${movement * slowMoveSpeed}vw)` }}
      >
        <div className="flex flex-wrap items-end gap-x-12">
          <h2>BigRed//</h2>
          <p className="text-purple7 text-7xl pb-2">9/19 - 9/21</p>
        </div>
        <p className="ml-12">Hacks 2025</p>
      </div>

      {/* Assets */}
      <img
        src={beam1}
        alt="light beam 1"
        className="absolute pointer-events-none select-none
          -top-[10%] right-[30%] h-[120vh] w-auto z-0"
        style={{ transform: `translateX(-${movement * slowMoveSpeed}vw)` }}
      />
      <img
        src={beam2}
        alt="light beam 2"
        className="absolute pointer-events-none select-none
          -top-[10%] -right-[35%] h-[120vh] w-auto z-0
          "
        style={{ transform: `translateX(-${movement * slowMoveSpeed}vw)` }}
      />
      <img
        src={ferrisWheel}
        alt="ferris wheel"
        className="absolute pointer-events-none select-none
          -bottom-[7.5%] md:right-[10%] md:max-h-[75vh] w-auto z-0
          -right-20 max-h-[60vh]"
        style={{ transform: `translateX(-${movement * fastMoveSpeed}vw)` }}
      />
      <img
        src={clouds}
        alt="clouds"
        className="absolute pointer-events-none select-none
          md:-bottom-[15%] md:-right-[15%] md:h-[50vh] md:w-auto z-10
          -bottom-10 -right-[15%]"
        style={{ transform: `translateX(-${movement * slowMoveSpeed}vw)` }}
      />
      <img
        src={house}
        alt="house"
        className="hidden md:block md:absolute pointer-events-none select-none
          bottom-0 left-[25%] max-h-[40vh] w-auto z-20"
        style={{
          transform: `translateX(-${movement * (slowMoveSpeed + 5)}vw)`,
        }}
      />
      <img
        src={houses}
        alt="houses"
        className="hidden md:block md:absolute pointer-events-none select-none
          bottom-[2%] left-[55%] max-h-[100vh] w-auto z-0"
        style={{ transform: `translateX(-${movement * mediumMoveSpeed}vw)` }}
      />
      <img
        src={cinema}
        alt="cinema building"
        className="absolute pointer-events-none select-none
          bottom-0 md:left-0 md:max-h-[85vh] w-auto z-30
          -left-15 max-h-[60vh]"
        style={{ transform: `translateX(-${movement * slowMoveSpeed}vw)` }}
      />
      <img
        src={bird1}
        alt="bird"
        className="absolute pointer-events-none select-none
          top-[50%] md:left-[30%] w-[2%] h-auto z-40"
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
          top-[40%] md:right-[10%] w-[3%] h-auto z-40"
        style={{
          transform: `
          translateX(-${movement * mediumMoveSpeed}vw)
          translateY(-${movement * mediumMoveSpeed}vh)
        `,
        }}
      />
      {/* Assets End */}
    </div>
  );
};

export default Landing;
