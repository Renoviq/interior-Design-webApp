import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ImageUpload() {
  const [roomType, setRoomType] = useState<string>("");
  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/renovations", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Upload failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/renovations"] });
      toast({
        title: "Success",
        description: "Your room has been processed successfully",
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

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!roomType) {
      toast({
        title: "Error",
        description: "Please select a room type",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);
    formData.append("roomType", roomType);
    uploadMutation.mutate(formData);
  }, [roomType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Select value={roomType} onValueChange={setRoomType}>
          <SelectTrigger>
            <SelectValue placeholder="Select room type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bedroom">Bedroom</SelectItem>
            <SelectItem value="living">Living Room</SelectItem>
            <SelectItem value="kitchen">Kitchen</SelectItem>
          </SelectContent>
        </Select>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}`}
        >
          <input {...getInputProps()} />
          {uploadMutation.isPending ? (
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          ) : (
            <>
              <Upload className="h-8 w-8 mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                Drag & drop an image here, or click to select
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
