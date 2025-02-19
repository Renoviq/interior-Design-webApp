import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import type { Renovation } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface RenovationCardProps {
  renovation: Renovation;
}

export function RenovationCard({ renovation }: RenovationCardProps) {
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/renovations/${renovation.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete renovation");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/renovations"] });
      toast({
        title: "Success",
        description: "Renovation deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = renovation.generatedImage;
    link.download = `renovation-${renovation.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="group relative overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <img
            src={renovation.generatedImage}
            alt="Room renovation"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardContent>
      <CardFooter className="absolute bottom-0 left-0 right-0 justify-between p-4 bg-black/75 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" onClick={handleDownload}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate()}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
