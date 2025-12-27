"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

export default function About() {
  const items = [
    {
      title: "Mission",
      desc: "Build ideologically grounded student cadres across Ghana's tertiary institutions committed to advancing NDC principles through organized political education and mass action.",
      icon: Target,
    },
    {
      title: "Vision",
      desc: "The dominant student political force in Ghana, training the next generation of NDC leadership through discipline, organization, and revolutionary commitment.",
      icon: Eye,
    },
    {
      title: "Values",
      desc: "Socialist democracy, working-class solidarity, anti-imperialism, accountability to the masses, and unwavering commitment to NDC ideology.",
      icon: Heart,
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-white dark:bg-[var(--ndc-black)] overflow-hidden">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-20"
        style={{
          backgroundImage: 'url("/about-section-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Additional dark overlay for better readability */}
      <div className="absolute inset-0 bg-white/80 dark:bg-[var(--ndc-black)]/80" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 uppercase tracking-tight text-[var(--ndc-black)] dark:text-white">
            The NDC <span className="text-[var(--ndc-red-primary)]">Student Movement</span>
          </h2>
          <div className="w-24 h-1 bg-[var(--ndc-red-primary)] mx-auto mb-6"></div>
          <p className="mt-6 text-lg text-[var(--ndc-gray-medium)] dark:text-white/90 max-w-4xl mx-auto font-medium leading-relaxed">
            TEIN is not a club. We are the official student wing of the National Democratic Congress — a disciplined political organization mobilizing tertiary students to fight for social justice, democratic governance, and pan-African liberation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-[var(--ndc-gray-dark)] border-2 border-[var(--ndc-gray-light)] dark:border-[var(--ndc-gray-medium)] rounded-sm p-8 accent-border-top-red hover:border-[var(--ndc-red-primary)] transition-all"
              >
                <div className="mb-6">
                  <Icon className="h-12 w-12 text-[var(--ndc-red-primary)]" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--ndc-black)] dark:text-white uppercase tracking-tight">{item.title}</h3>
                <p className="text-[var(--ndc-gray-medium)] dark:text-[var(--ndc-gray-light)] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


