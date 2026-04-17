import { NextRequest, NextResponse } from "next/server";
import { createLink, updateLink, deleteLink } from "@/data/links";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { targetUrl, userId, customSlug } = await request.json();

    if (!targetUrl || !userId) {
      return NextResponse.json(
        { error: "Target URL and user ID are required" },
        { status: 400 }
      );
    }

    // Basic URL validation
    try {
      new URL(targetUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    const link = await createLink({ targetUrl, userId, customSlug });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("Error creating link:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create link";
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, targetUrl, customSlug } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Link ID is required" },
        { status: 400 }
      );
    }

    const linkId = parseInt(id, 10);
    if (isNaN(linkId)) {
      return NextResponse.json(
        { error: "Invalid link ID" },
        { status: 400 }
      );
    }

    if (targetUrl) {
      try {
        new URL(targetUrl);
      } catch {
        return NextResponse.json(
          { error: "Invalid URL format" },
          { status: 400 }
        );
      }
    }

    const link = await updateLink(linkId, { targetUrl, customSlug });

    return NextResponse.json(link);
  } catch (error) {
    console.error("Error updating link:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update link";
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Link ID is required" },
        { status: 400 }
      );
    }

    const linkId = parseInt(id, 10);
    if (isNaN(linkId)) {
      return NextResponse.json(
        { error: "Invalid link ID" },
        { status: 400 }
      );
    }

    await deleteLink(linkId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting link:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete link";
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}