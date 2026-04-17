"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditLinkModal } from "@/components/EditLinkModal";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { Edit, Trash2 } from "lucide-react";
import type { Link } from "@/db/schema";

interface LinksListProps {
  links: Link[];
}

export function LinksList({ links }: LinksListProps) {
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [deletingLink, setDeletingLink] = useState<Link | null>(null);

  if (links.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          You haven&apos;t created any links yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-4">
        {links.map((link) => (
          <li
            key={link.id}
            className="overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Short link
                </p>
                <a
                  href={link.targetUrl}
                  className="mt-1 block truncate text-lg font-semibold text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.slug}
                </a>
              </div>

              <div className="flex flex-col gap-1 text-right text-sm text-muted-foreground md:mr-4">
                <span>Clicks: {link.clickCount}</span>
                <span>Created: {new Date(link.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingLink(link)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeletingLink(link)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-muted/50 p-4 text-sm text-foreground">
              <p className="mb-1 font-medium">Target URL</p>
              <p className="break-all">{link.targetUrl}</p>
            </div>
          </li>
        ))}
      </ul>

      {editingLink && (
        <EditLinkModal
          link={editingLink}
          open={!!editingLink}
          onOpenChange={(open) => {
            if (!open) setEditingLink(null);
          }}
        />
      )}

      {deletingLink && (
        <DeleteConfirmationDialog
          link={deletingLink}
          open={!!deletingLink}
          onOpenChange={(open) => {
            if (!open) setDeletingLink(null);
          }}
        />
      )}
    </>
  );
}