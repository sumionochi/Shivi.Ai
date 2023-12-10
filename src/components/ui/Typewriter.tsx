"use client";
import { Bot, Rocket } from "lucide-react";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter 
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString(`Health`)
          .pauseFor(1000)
          .deleteAll()
          .typeString(`Panic Attacks`)
          .pauseFor(1000)
          .deleteAll()
          .typeString(`Migraines`)
          .pauseFor(1000)
          .deleteAll()
          .typeString(`Seizures`)
          .pauseFor(1000)
          .deleteAll()
          .typeString(`Blackouts`)
          .start();
      }}
    />
  );
};

export default TypewriterTitle;