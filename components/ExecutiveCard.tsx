import type { Executive } from "@/data/executives";
import { User } from "lucide-react";

export default function ExecutiveCard({ exec }: { exec: Executive }) {
  return (
    <div className="card-ndc overflow-hidden h-full flex flex-col group">
      {/* Large Image Section - fills top 2/3 of card */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-ndc-green/10 to-ndc-red/10">
        {exec.image ? (
          <img
            src={exec.image}
            alt={exec.name}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ndc-green to-ndc-green-light">
            <User className="w-24 h-24 text-white" strokeWidth={1.5} />
          </div>
        )}

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Red accent stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-ndc-red" />
      </div>

      {/* Content Section - fills bottom 1/3 */}
      <div className="flex-1 p-6 flex flex-col justify-center bg-white dark:bg-neutral-900">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 uppercase tracking-tight">
          {exec.name}
        </h3>
        <p className="text-sm font-bold text-ndc-red uppercase tracking-wide">
          {exec.role}
        </p>
      </div>
    </div>
  );
}


