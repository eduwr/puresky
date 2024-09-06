import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/ui/profile/profile-card";
import { isErr } from "@/lib/common/error-handling";
import { getFollowers } from "@/lib/xrpc/graph/get-followers";
import { getFollows } from "@/lib/xrpc/graph/get-follows";
import { followAllBack } from "../actions/followers/followBack";

export default async function DashboardPage() {
  const response = await getFollows("eduardo.guru");

  if (isErr(response)) {
    return <div>{response.error.message}</div>;
  }

  const response2 = await getFollowers("eduardo.guru");
  if (isErr(response2)) {
    return <div>{response2.error.message}</div>;
  }
  console.log(response2.value.data);

  return (
    <main>
      <ProfileCard />
    </main>
  );
}
