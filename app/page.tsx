"use client";

import Link from "next/link";
import Button from "@/components/ui/button";
import { Umbrella, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import ExecutivesSection from "@/components/home/ExecutivesSection";
import JoinSection from "@/components/home/JoinSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ActivitiesSection />
      <ExecutivesSection />
      <JoinSection />
    </main>
  );
}
