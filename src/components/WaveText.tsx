import React from "react";

type LoadingProps = {
  text: string;
  className?: string;
};

const Loading: React.FC<LoadingProps> = ({ text, className }) => {
  return (
    <div className={`flex space-x-1 ${className ?? ""}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="animate-bounce inline-block"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: "1s",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default Loading;
