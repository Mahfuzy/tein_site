"use client";

import { motion } from "framer-motion";
import { activities } from "@/data/activities";
import Link from "next/link";
import { ChevronRight, Calendar, MapPin } from "lucide-react";

export default function ActivitiesSection() {
  const featured = activities.slice(0, 4);
  return (
    <section className="py-24 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between gap-4 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            What's <span className="text-ndc-red">Happening</span> on Campus
          </motion.h2>
          <Link
            href="/dashboard/activities"
            className="text-sm inline-flex items-center gap-1 text-ndc-green hover:text-ndc-red transition-colors font-semibold"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((activity, i) => (
            <motion.article
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Image background with gradient overlay */}
              <div
                className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url('${activity.image || "/activities/placeholder.jpg"}')`,
                }}
                aria-hidden="true"
              />

              {/* NDC Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ndc-black via-ndc-black/75 to-transparent" />

              {/* Red accent border on hover */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-ndc-red transition-all rounded-2xl" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="space-y-2">
                  {/* Status badge */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${activity.status === "Upcoming"
                      ? "bg-ndc-red text-white"
                      : activity.status === "Completed"
                        ? "bg-ndc-green text-white"
                        : "bg-gray-500 text-white"
                      }`}
                  >
                    {activity.status}
                  </span>

                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(activity.date).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-ndc-red transition-colors">
                    {activity.title}
                  </h3>

                  <p className="text-sm text-white/90 line-clamp-2">
                    {activity.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


