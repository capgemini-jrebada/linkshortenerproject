import { eq, desc } from "drizzle-orm";
import { randomBytes } from "crypto";
import db from "@/db";
import { links } from "@/db/schema";
import type { Link, NewLink } from "@/db/schema";

export async function getLinksByUserId(userId: string): Promise<Link[]> {
  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

export async function createLink(data: { targetUrl: string; userId?: string; customSlug?: string }): Promise<Link> {
  let slug: string;

  if (data.customSlug) {
    // Validate custom slug (alphanumeric, hyphens, underscores only, 3-50 chars)
    if (!/^[a-zA-Z0-9_-]{3,50}$/.test(data.customSlug)) {
      throw new Error("Invalid slug format. Use only letters, numbers, hyphens, and underscores (3-50 characters).");
    }

    // Check if slug already exists
    const existing = await db
      .select()
      .from(links)
      .where(eq(links.slug, data.customSlug))
      .limit(1);

    if (existing.length > 0) {
      throw new Error("Slug already exists. Please choose a different one.");
    }

    slug = data.customSlug;
  } else {
    // Generate random slug and ensure uniqueness
    let attempts = 0;
    do {
      slug = generateSlug();
      const existing = await db
        .select()
        .from(links)
        .where(eq(links.slug, slug))
        .limit(1);
      if (existing.length === 0) break;
      attempts++;
    } while (attempts < 10);

    if (attempts >= 10) {
      throw new Error("Failed to generate unique slug. Please try with a custom slug.");
    }
  }

  const newLink: NewLink = {
    slug,
    targetUrl: data.targetUrl,
    userId: data.userId,
  };

  const result = await db.insert(links).values(newLink).returning();
  return result[0];
}

function generateSlug(): string {
  return randomBytes(4).toString('hex');
}

export async function updateLink(id: number, data: { targetUrl?: string; customSlug?: string }): Promise<Link> {
  const updateData: Partial<NewLink> = {};

  if (data.targetUrl) {
    updateData.targetUrl = data.targetUrl;
  }

  if (data.customSlug !== undefined) {
    if (data.customSlug) {
      // Validate custom slug
      if (!/^[a-zA-Z0-9_-]{3,50}$/.test(data.customSlug)) {
        throw new Error("Invalid slug format. Use only letters, numbers, hyphens, and underscores (3-50 characters).");
      }

      // Check if slug already exists (excluding current link)
      const existing = await db
        .select()
        .from(links)
        .where(eq(links.slug, data.customSlug))
        .limit(1);

      if (existing.length > 0 && existing[0].id !== id) {
        throw new Error("Slug already exists. Please choose a different one.");
      }
    }
    updateData.slug = data.customSlug;
  }

  const result = await db
    .update(links)
    .set(updateData)
    .where(eq(links.id, id))
    .returning();

  if (result.length === 0) {
    throw new Error("Link not found");
  }

  return result[0];
}

export async function deleteLink(id: number): Promise<void> {
  const result = await db
    .delete(links)
    .where(eq(links.id, id))
    .returning();

  if (result.length === 0) {
    throw new Error("Link not found");
  }
}
