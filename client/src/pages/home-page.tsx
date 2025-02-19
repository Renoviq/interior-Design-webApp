import { useAuth } from "@/hooks/use-auth";
import { UserNav } from "@/components/user-nav";
import { ImageUpload } from "@/components/image-upload";
import { InfiniteGallery } from "@/components/infinite-gallery";
import { useQuery } from "@tanstack/react-query";
import type { Renovation } from "@shared/schema";

export default function HomePage() {
  const { user } = useAuth();
  const { data: renovations } = useQuery<Renovation[]>({ 
    queryKey: ["/api/renovations"]
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Room Renovator AI</h1>
          <UserNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Welcome, {user?.username}!</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your living space with AI-powered room renovation. 
            Upload a photo of your room and get instant design ideas.
          </p>
        </section>

        <section className="max-w-xl mx-auto">
          <ImageUpload />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Renovations</h2>
          {renovations && renovations.length > 0 ? (
            <InfiniteGallery renovations={renovations} />
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No renovations yet. Upload a room photo to get started!
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
