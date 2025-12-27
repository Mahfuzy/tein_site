import ActivityCard from "@/components/ActivityCard";
import { activities } from "@/data/activities";

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Activities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((a) => (
          <ActivityCard key={a.id} activity={a} />
        ))}
      </div>
    </div>
  );
}


