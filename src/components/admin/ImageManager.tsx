"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Upload, Trash2, Image as ImageIcon, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageManagerProps {
  value?: string;
  onChange: (url: string) => void;
  trigger?: React.ReactNode;
}

interface ImageGalleryProps {
  onSelect?: (url: string) => void;
  selectedUrl?: string | null;
  onCancel?: () => void;
}

interface BlobItem {
  url: string;
  downloadUrl: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

export function ImageGallery({ onSelect, selectedUrl: initialSelectedUrl, onCancel }: ImageGalleryProps) {
  const [blobs, setBlobs] = useState<BlobItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(initialSelectedUrl || null);
  const [activeTab, setActiveTab] = useState("gallery");

  const fetchBlobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const data = await res.json();
        setBlobs(data);
      } else {
        toast.error("Failed to load images");
      }
    } catch (error) {
      console.error("Error fetching blobs:", error);
      toast.error("Error loading images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "gallery") {
      fetchBlobs();
    }
  }, [activeTab]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const blob = await res.json();
        toast.success("Image uploaded successfully");
        setBlobs([blob, ...blobs]);
        setSelectedUrl(blob.url);
        setActiveTab("gallery");
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/media?url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Image deleted");
        setBlobs(blobs.filter((b) => b.url !== url));
        if (selectedUrl === url) {
          setSelectedUrl(null);
        }
      } else {
        toast.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Error deleting image");
    }
  };

  const handleSelect = () => {
    if (selectedUrl && onSelect) {
      onSelect(selectedUrl);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 border-b">
          <TabsList>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="gallery" className="flex-1 overflow-hidden p-0 m-0">
          <ScrollArea className="h-full p-6">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : blobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
                <p>No images found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {blobs.map((blob) => (
                  <div
                    key={blob.url}
                    className={cn(
                      "group relative aspect-square border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:border-primary/50",
                      selectedUrl === blob.url ? "border-primary ring-2 ring-primary/20" : "border-muted"
                    )}
                    onClick={() => setSelectedUrl(blob.url)}
                  >
                    <Image
                      src={blob.url}
                      alt={blob.pathname}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />
                    {selectedUrl === blob.url && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-sm z-10">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute bottom-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDelete(blob.url, e)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="upload" className="flex-1 p-0 m-0">
          <div className="h-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-muted m-6 rounded-lg bg-muted/10">
            {uploading ? (
              <div className="text-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Uploading...</p>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-center space-y-2">
                    <p className="font-medium text-lg">Click to upload</p>
                    <p className="text-sm text-muted-foreground">SVG, PNG, JPG or GIF</p>
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                  />
                </Label>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {onSelect && (
        <div className="p-4 border-t bg-muted/10">
          <div className="flex w-full justify-between items-center">
            <p className="text-sm text-muted-foreground truncate max-w-[50%]">
              {selectedUrl ? selectedUrl.split('/').pop() : 'No image selected'}
            </p>
            <div className="flex gap-2">
              {onCancel && <Button variant="ghost" onClick={onCancel}>Cancel</Button>}
              <Button onClick={handleSelect} disabled={!selectedUrl}>Select Image</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ImageManager({ value, onChange, trigger }: ImageManagerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (url: string) => {
    onChange(url);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full justify-start">
            <ImageIcon className="mr-2 h-4 w-4" />
            {value ? "Change Image" : "Select Image"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Image Manager</DialogTitle>
        </DialogHeader>
        
        <ImageGallery 
          onSelect={handleSelect} 
          selectedUrl={value} 
          onCancel={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
