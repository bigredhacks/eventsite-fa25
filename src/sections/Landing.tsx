interface LandingProps {
  opacity: number;
}

const Landing: React.FC<LandingProps> = ({ opacity }) => {
  return (
    <div className="h-[150vh] bg-purple3">
      <div
        className="h-[100vh] fixed flex items-end justify-start p-12"
        style={{ opacity }}
      >
        {/*  */}
        <div
          className="
    mb-4 ml-4 md:mb-12 md:ml-12 
    text-8xl md:text-9xl 
    font-jersey10 text-yellow1"
        >
          <h2>BigRed//</h2>

          <div className="flex flex-wrap items-end gap-x-18">
            <p className="align-text-bottom">Hacks 2025</p>
            <p className="text-6xl md:text-7xl text-yellow2 pb-3">
              9/19 - 9/21
            </p>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default Landing;
