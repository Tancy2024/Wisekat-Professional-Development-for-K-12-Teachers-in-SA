"use client";
import React from "react";
import Image from "next/image";

export default function WelcomeSection() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-teal-100">
      {/* 背景图 */}
      <Image
        src="/welcome.jpg" 
        alt="Welcome Banner"
        fill
        className="object-cover brightness-[0.6]"
        priority
      />

      <div className="absolute inset-0 z-10 flex items-center justify-start px-8 md:px-20">
        <div className="text-white max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
            Teach Smarter with AI
          </h1>
          <p className="text-lg md:text-xl drop-shadow-md whitespace-nowrap">
            Your one-stop Platform for AI tools, training, and teaching inspiration
          </p>
        </div>
      </div>
    </section>
  );
}
