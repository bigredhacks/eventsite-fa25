import { SectionProps } from "./SectionProps";
import cloudySun from "@/assets/cloudy_sun.png";
import grass from "@/assets/grass.png";
import arcade_device from "@/assets/arcade_device.png";
import imc_logo from "@/assets/imc_logo.png";
import ey_logo from "@/assets/ey_logo.png";
import mtbank_logo from "@/assets/mtbank_logo.png";
import deshaw_logo from "@/assets/deshaw_logo.png";
import warp_logo from "@/assets/warp_logo.png";
import mastra_logo from "@/assets/mastra_logo.png";
import scm_logo from "@/assets/scm_logo.png";
import awake_chocolate_logo from "@/assets/awake_chocolate_logo.png";
import mlh_logo from "@/assets/mlh_logo.png";
import kung_fu_tea_logo from "@/assets/kung_fu_tea_logo.png";
import dos_amigos_logo from "@/assets/dos_amigos_logo.png";
import visa_logo from "@/assets/visa_logo.png";
import asml_logo from "@/assets/asml_logo.png";

import React from "react";
import { motion } from "framer-motion";

const MarqueeStrip: React.FC<{ images: string[]; duration?: number }> = ({
  images,
  duration = 30,
}) => {
  return (
    <div
      className="
        relative mx-auto
        w-full
        max-w-[95vw]
        sm:max-w-[92vw]
        md:max-w-[90vw]
        lg:max-w-[82vw]
        overflow-hidden scroller-mask
      "
    >
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-10 will-change-transform"
      >
        {images.map((src, i) => (
          <img
            key={`a-${i}`}
            src={src}
            className="shrink-0 w-30 sm:w-40 h-auto object-contain"
            alt=""
          />
        ))}
        {images.map((src, i) => (
          <img
            key={`b-${i}`}
            src={src}
            className="shrink-0 w-30 sm:w-40 h-auto object-contain"
            alt=""
          />
        ))}
      </motion.div>
    </div>
  );
};

const Marquee = () => {
  const upperMarquee = [
    imc_logo,
    ey_logo,
    mtbank_logo,
    deshaw_logo,
    mastra_logo,
    scm_logo,
    warp_logo,
  ];

  return (
    <div className="container mx-auto">
      <MarqueeStrip images={upperMarquee} duration={32} />
    </div>
  );
};

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
        <h2 className="text-6xl text-yellow2 mb-20">SPONSORS</h2>
        <ul className="flex items-center justify-center mb-6 gap-6">
          <li>
            <img
              src={asml_logo}
              alt="ASML"
              className="h-full w-36 sm:w-48 object-contain"
            />
          </li>
          <li>
            <img
              src={visa_logo}
              alt="VISA"
              className="h-full w-36 sm:w-48 object-contain"
            />
          </li>
        </ul>
        <div className="container mx-auto my-10 w-full text-white flex justify-center items-center overflow-x-hidden scroller-mask">
          <Marquee />
        </div>
        <ul className="flex items-center justify-center md:justify-start [&_img]:max-w-none gap-6">
          <li>
            <img
              src={mlh_logo}
              alt="Major League Hacking"
              className="h-full w-[var(--logo-w)] object-contain"
            />
          </li>
          <li>
            <img
              src={kung_fu_tea_logo}
              alt="Kung Fu Tea"
              className="h-full w-[var(--logo-w)] object-contain"
            />
          </li>
          <li>
            <img
              src={awake_chocolate_logo}
              alt="Awake Caffeinated Chocolate"
              className="h-full w-[var(--logo-w)] object-contain"
            />
          </li>
          <li>
            <img
              src={dos_amigos_logo}
              alt="Dos Amigos"
              className="h-full w-[var(--logo-w)] object-contain"
            />
          </li>
        </ul>
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
