import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/data/links";
import { CreateLinkModal } from "@/components/CreateLinkModal";
import { LinksList } from "@/components/LinksList";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const userLinks = await getLinksByUserId(userId);

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Links</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track your shortened links
          </p>
        </div>
        <CreateLinkModal userId={userId} />
      </div>

      <LinksList links={userLinks} />
    </main>
  );
}
