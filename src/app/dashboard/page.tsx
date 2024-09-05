import { ProfileCard } from "@/components/ui/profile/profile-card";
import { isErr } from "@/lib/common/error-handling";
import { getFollows } from "@/lib/xrpc/graph/get-follows";

export default async function DashboardPage() {
  const response = await getFollows("eduardo.guru");
  if (isErr(response)) {
    return <div>{response.error.message}</div>;
  }

  return (
    <main>
      <ProfileCard />
    </main>
  );
}
