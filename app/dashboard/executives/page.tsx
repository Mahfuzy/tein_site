import ExecutiveCard from "@/components/ExecutiveCard";
import { executives } from "@/data/executives";

export default function ExecutivesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Executives</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {executives.map((e) => (
          <ExecutiveCard key={e.role} exec={e} />
        ))}
      </div>
    </div>
  );
}


