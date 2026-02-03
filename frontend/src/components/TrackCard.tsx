interface TrackCardProps {
  title: string;
  description: string;
}

const TrackCard: React.FC<TrackCardProps> = ({ title, description }) => {
  return (
    <div
      className="rounded-4xl bg-purple8/90
      md:px-6 md:py-4 md:m-0
      px-4 py-4 m-0
      flex flex-col justify-start items-center text-center
      hover:scale-105 transition-transform duration-300 h-full z-10"
    >
      <h3
        className="md:text-[3vw] text-2xl 
        font-bold text-purple6 mb-2 min-h-[2.5rem] md:min-h-[4.5rem]"
      >
        {title}
      </h3>
      <p
        className="md:text-2xl text-sm
        text-white1"
      >
        {description}
      </p>
    </div>
  );
};

export default TrackCard;
