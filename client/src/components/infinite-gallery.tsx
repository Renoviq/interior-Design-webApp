import { RenovationCard } from "./renovation-card";
import type { Renovation } from "@shared/schema";

interface InfiniteGalleryProps {
  renovations: Renovation[];
}

export function InfiniteGallery({ renovations }: InfiniteGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {renovations.map((renovation) => (
        <RenovationCard key={renovation.id} renovation={renovation} />
      ))}
    </div>
  );
}
