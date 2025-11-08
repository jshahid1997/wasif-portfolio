"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { socialLinks } from "@/lib/data";
import { FaYoutube, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialIcons = [
    { name: "YouTube", icon: FaYoutube, url: socialLinks.youtube, color: "hover:text-red-600" },
    { name: "Instagram", icon: FaInstagram, url: socialLinks.instagram, color: "hover:text-pink-600" },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12">
            Interested in working together? Reach out and let&apos;s create something amazing.
          </p>

          {/* Email */}
          <motion.a
            href={`mailto:${socialLinks.email}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors duration-300 mb-16"
          >
            <FaEnvelope />
            {socialLinks.email}
          </motion.a>

          {/* Social Links */}
          <div className="flex justify-center gap-8 mb-16">
            {socialIcons.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`text-gray-700 ${social.color} transition-colors duration-300`}
                aria-label={social.name}
              >
                <social.icon className="text-3xl md:text-4xl" />
              </motion.a>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="border-t border-gray-200 pt-8"
          >
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Wasif Shahid. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

