"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

interface CreateLinkModalProps {
  userId: string;
}

export function CreateLinkModal({ userId }: CreateLinkModalProps) {
  const [open, setOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [useCustomSlug, setUseCustomSlug] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetUrl: targetUrl.trim(),
          userId,
          customSlug: useCustomSlug && customSlug.trim() ? customSlug.trim() : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOpen(false);
        setTargetUrl("");
        setCustomSlug("");
        setUseCustomSlug(false);
        router.refresh();
      } else {
        setError(data.error || "Failed to create link");
      }
    } catch (error) {
      console.error("Error creating link:", error);
      setError("Failed to create link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
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
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
          <DialogDescription>
            Enter the URL you want to shorten. You can optionally specify a custom slug.
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
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !targetUrl.trim()}>
              {isLoading ? "Creating..." : "Create Link"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}