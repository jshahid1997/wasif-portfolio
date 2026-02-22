"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { skills } from "@/lib/data";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-12">
            About
          </h2>

          {/* Two-column layout: photo + bio */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start mb-16">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="w-full md:w-72 lg:w-80 flex-shrink-0"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/wasif-profile.jpeg"
                  alt="Wasif Shahid"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </motion.div>

            {/* Bio */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                I specialize in crafting dynamic and engaging content with a focus on aesthetic appeal.
                With a strong eye for detail and a creative approach, I bring ideas to life through
                compelling storytelling and seamless transitions.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                My work ranges from long-form documentary-style videos to short-form viral content,
                always aiming to maximize efficiency while creating content that starts vibing within
                a second.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-black mb-8">
              Tools &amp; Skills
            </h3>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center hover:bg-gray-100 hover:border-gray-300 transition-all duration-300"
                >
                  <span className="text-base md:text-lg font-medium text-gray-900">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
