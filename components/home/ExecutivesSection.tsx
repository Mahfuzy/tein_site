"use client";

import { motion } from "framer-motion";
import ExecutiveCard from "@/components/ExecutiveCard";
import { executives } from "@/data/executives";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ExecutivesSection() {
  const spotlight = executives.slice(0, 6);
  return (
    <section className="py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between gap-4 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            Meet Our <span className="text-ndc-red">Executives</span>
          </motion.h2>
          <Link
            href="/dashboard/executives"
            className="text-sm inline-flex items-center gap-1 text-ndc-green hover:text-ndc-red transition-colors font-semibold"
          >
            Full Team <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spotlight.map((exec, i) => (
            <motion.div
              key={exec.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ExecutiveCard exec={exec} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


