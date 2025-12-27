"use client";

import Link from "next/link";
import Button from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, Megaphone } from "lucide-react";

export default function JoinSection() {
  return (
    <section id="join" className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/join-section-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Strong Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-ndc-black/95 via-ndc-red/85 to-ndc-black/95" />

      {/* Additional vignette for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-ndc-black/70 via-transparent to-ndc-black/50" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-ndc-red/20 rounded-full blur-3xl" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M30 0L0 30l30 30 30-30z\" fill=\"%23fff\"/%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon group */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
              <Megaphone className="w-8 h-8" />
            </div>
          </div>

          <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight" style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)' }}>
            Ready to Make a Difference?
          </h2>

          <blockquote className="text-2xl sm:text-3xl font-light mb-4 italic max-w-4xl mx-auto leading-relaxed" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
            "Together, we build a strong, informed, and progressive student movement."
          </blockquote>

          <p className="text-xl text-white/95 mb-10 max-w-2xl mx-auto" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
            Join thousands of students across Ghana who are shaping the future of our nation through the NDC student wing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/register">
              <Button className="btn-primary text-lg px-10 py-7 rounded-xl font-bold shadow-2xl hover:shadow-red-600/50 flex items-center gap-3 text-white">
                Join TEIN Today
                <ArrowRight className="h-6 w-6" />
              </Button>
            </Link>
            <Link href="#about">
              <Button
                variant="outline"
                className="text-lg px-10 py-7 rounded-xl font-semibold bg-white text-ndc-green border-2 border-white hover:bg-ndc-green hover:text-white transition-all"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
