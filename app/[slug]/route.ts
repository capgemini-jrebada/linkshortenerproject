import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db";
import { links } from "@/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    // Find the link by slug
    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.slug, slug))
      .limit(1);

    if (!link) {
      return NextResponse.json(
        { error: "Link not found" },
        { status: 404 }
      );
    }

    // Increment click count
    await db
      .update(links)
      .set({
        clickCount: link.clickCount + 1,
        updatedAt: new Date(),
      })
      .where(eq(links.id, link.id));

    // Redirect to target URL
    return NextResponse.redirect(link.targetUrl);
  } catch (error) {
    console.error("Error handling slug redirect:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}