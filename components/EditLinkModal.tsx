"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface EditLinkModalProps {
  link: {
    id: number;
    slug: string;
    targetUrl: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditLinkModal({ link, open, onOpenChange }: EditLinkModalProps) {
  const [targetUrl, setTargetUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [useCustomSlug, setUseCustomSlug] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (open && link) {
      setTargetUrl(link.targetUrl);
      setCustomSlug(link.slug);
      setUseCustomSlug(true); // Assume it's using custom slug since it's existing
      setError("");
    }
  }, [open, link]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/links", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: link.id,
          targetUrl: targetUrl.trim(),
          customSlug: useCustomSlug && customSlug.trim() ? customSlug.trim() : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onOpenChange(false);
        router.refresh();
      } else {
        setError(data.error || "Failed to update link");
      }
    } catch (error) {
      console.error("Error updating link:", error);
      setError("Failed to update link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      // Reset form when closing
      setTargetUrl("");
      setCustomSlug("");
      setUseCustomSlug(false);
      setError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Update the URL and slug for your shortened link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="targetUrl" className="text-sm font-medium">
              Target URL
            </label>
            <Input
              id="targetUrl"
              type="url"
              placeholder="https://example.com"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="useCustomSlug"
              checked={useCustomSlug}
              onCheckedChange={(checked) => setUseCustomSlug(checked as boolean)}
            />
            <label
              htmlFor="useCustomSlug"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use custom slug
            </label>
          </div>

          {useCustomSlug && (
            <div className="space-y-2">
              <label htmlFor="customSlug" className="text-sm font-medium">
                Custom Slug
              </label>
              <Input
                id="customSlug"
                type="text"
                placeholder="my-custom-link"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                pattern="^[a-zA-Z0-9_-]{3,50}$"
                title="Use only letters, numbers, hyphens, and underscores (3-50 characters)"
              />
              <p className="text-xs text-muted-foreground">
                Use only letters, numbers, hyphens, and underscores (3-50 characters)
              </p>
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !targetUrl.trim()}>
              {isLoading ? "Updating..." : "Update Link"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}