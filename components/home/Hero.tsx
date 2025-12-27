"use client";

import Link from "next/link";
import Button from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Flag } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden">
      {/* Real Event Photo Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      {/* Strong Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--ndc-black)]/85 via-[var(--ndc-red-primary)]/70 to-[var(--ndc-black)]/90" />

      {/* Additional Dark Vignette for Better Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ndc-black)]/60 via-transparent to-[var(--ndc-black)]/40" />

      {/* Minimal accent shapes - controlled, not playful */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-[var(--ndc-red-primary)]/20 blur-3xl"
        animate={{
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl"
        >
          {/* Political Badge - Serious NDC Affiliation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-sm bg-[var(--ndc-black)]/90 border-2 border-[var(--ndc-red-primary)] mb-8 shadow-2xl"
          >
            <Flag className="h-5 w-5 text-[var(--ndc-red-primary)]" />
            <span className="text-sm font-bold uppercase tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Official NDC Student Wing</span>
          </motion.div>

          {/* Logo and Headline Side-by-Side */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center mb-8">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight"
              style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)' }}
            >
              <span className="block uppercase tracking-tight">Student Power.</span>
              <span className="block mt-2 uppercase tracking-tight">Political Organization.</span>
              <span className="block mt-2 uppercase tracking-tight">NDC Values.</span>
            </motion.h1>

            {/* TEIN Logo - Side by Side with Headline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex-shrink-0"
            >
              <img
                src="/tein-logo.jpg"
                alt="TEIN Logo"
                className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-sm object-cover ring-4 ring-[var(--ndc-red-primary)] shadow-2xl"
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl sm:text-2xl max-w-3xl font-medium leading-relaxed text-white/95"
            style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}
          >
            TEIN mobilizes students across Ghana's tertiary institutions to advance National Democratic Congress principles through organized political action, civic education, and mass movement building.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/register">
              <Button className="text-base px-10 py-7 shadow-xl flex items-center gap-2">
                Join The Movement
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#about">
              <Button
                variant="outline"
                className="text-base px-10 py-7 bg-transparent backdrop-blur border-2 border-white text-white hover:bg-white hover:text-[var(--ndc-black)]"
              >
                Our Mission
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent - sharp red line, not wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--ndc-red-primary)]" />
    </section>
  );
}
