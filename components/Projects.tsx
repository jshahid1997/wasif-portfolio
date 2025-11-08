"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { motionDesignProjects, documentaryStyleProjects, shortFormProjects } from "@/lib/data";

interface ProjectCardProps {
  title: string;
  videoId: string;
  index: number;
  isShort?: boolean;
}

function ProjectCard({ title, videoId, index, isShort = false }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
        <div className={`relative ${isShort ? 'aspect-[9/16]' : 'aspect-video'} w-full`}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
      <h3 className="mt-4 text-lg md:text-xl font-medium text-gray-900">
        {title}
      </h3>
    </motion.div>
  );
}

export default function Projects() {
  const longFormRef = useRef(null);
  const shortFormRef = useRef(null);
  const longFormInView = useInView(longFormRef, { once: true, margin: "-100px" });
  const shortFormInView = useInView(shortFormRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Long Form Section */}
        <div ref={longFormRef} className="mb-20 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={longFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
          >
            Long Form Content
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={longFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 mb-12"
          >
            Narrative-driven videos with compelling storytelling
          </motion.p>
          
          {/* Motion Design Subsection */}
          <div className="mb-16 md:mb-20">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={longFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl font-semibold text-black mb-8"
            >
              Motion Design
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
              {motionDesignProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  videoId={project.videoId}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Documentary Style Subsection */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={longFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl md:text-3xl font-semibold text-black mb-8"
            >
              Documentary Style
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
              {documentaryStyleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  videoId={project.videoId}
                  index={index + motionDesignProjects.length}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Short Form Section */}
        <div ref={shortFormRef}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={shortFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
          >
            Short Form Content
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={shortFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 mb-12"
          >
            Quick, engaging content optimized for social media
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {shortFormProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                videoId={project.videoId}
                index={index}
                isShort={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

